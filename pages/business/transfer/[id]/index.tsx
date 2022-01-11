import Container from "components/Container";
import NavBar from "components/NavBar";
import {
  useBusinessQuery,
  useBusinessTransfersQuery,
  useCreateBusinessMutation,
  useUpdateUserMutation,
} from "generated/graphql";
import { signOut } from "lib/auth";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../../../components/Loader";
import Section from "../../../../components/Section";
import Button from "../../../../components/Button";
import Link from "next/link";
import TextInput from "components/TextInput";
import { gql, useQuery } from "@apollo/client";
import { BusinessHeader } from "../..";
import BusinessLeftNavigation from "../../../../components/BusinessLeftNavigation";
import ActionBox from "components/ActionBox";
import { Table } from "components/Table";
import moment from "moment";
import { displayPrice } from "lib/displayPrice";
import { displayDate, displayDateTime } from "lib/displayDate";

const BusinessTransferPage = ({ business, transferId }) => {
  if (!business) return null;
  console.log("business", business);
  const [errors, setErrors] = useState<any>({});
  const [state, setState] = useState<any>({ ...business });
  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation();
  const transfer = business?.transfers[0];
  let details = [];
  for (const order of transfer?.transferDetails?.details) {
    let orderDetail = {
      id: order.id,
      uid: order.uid,
      amount: displayPrice(order.amount) || "",
      createdAt: displayDateTime(order.createdAt),
      etFees: displayPrice(order.etFees),
      kooprFees: displayPrice(order.kooprFees),
      virAmount: displayPrice(order.virAmount),
    };
    details.push(orderDetail);
    for (const offer of order.offersInfo) {
      details.push({
        id: order.id,
        uid: order.uid,
        name: offer.name,
        amount: displayPrice(offer.price),
        quantity: offer.quantity,
      });
    }
  }
  return (
    <main>
      <BusinessHeader business={business} />
      <Container>
        <Section>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <BusinessLeftNavigation business={business} />
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              {/* <Button onClick={() => {}}>Liste des virements</Button> */}
              <div className="p-6">
                <div className="flex flex-row mb-6">
                  <button
                    onClick={() => {
                      router.push("/business/transfer");
                    }}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <h2 className="ml-2">{"Virement n° " + transfer.id}</h2>
                </div>
                <div>Exécuté le {displayDateTime(transfer.createdAt)}</div>
                <div>
                  Période : {displayDate(transfer.start)} au{" "}
                  {displayDate(transfer.end)}
                </div>
                <div>Montant: {displayPrice(transfer.amount)}</div>
              </div>
              <Table
                onRowClick={(order) => {
                  console.log("order", order);
                  router.push("/order/" + order?.id);
                }}
                data={details}
                columns={[
                  { value: "Commande n°", key: "uid" },
                  { value: "Passée le", key: "createdAt" },
                  { value: "Nom de l'offre", key: "name" },
                  { value: "Qte", key: "quantity" },
                  { value: "Total", key: "amount" },
                  { value: "Frais ET", key: "etFees" },
                  { value: "Frais Koopr", key: "kooprFees" },
                  { value: "Total", key: "virAmount" },
                ]}
              />
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
};

const BUSINESS_TRANSFER_QUERY = gql`
  query businessTransfers($id: Int!, $transferId: Int) {
    business(id: $id) {
      id
      name
      address
      siret
      city
      zipCode
      description
      phone
      documents
      siteUrl
      country
      createdAt
      isValidated
      companyType
      logoUrl
      backgroundImageUrl
      transfers(transferId: $transferId) {
        id
        start
        end
        createdAt
        amount
        offersInfo
        transferDetails
        orders {
          id
          uid
        }
      }
    }
  }
`;

export default function BusinessTransfer({ me }) {
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    if (!me) {
      router.replace("/signin");
    } else if (!me?.business) {
      router.replace("/createBusiness");
    }
  });
  if (!me || !me?.business) return <Loader />;
  const {
    data,
    loading: businessLoading,
    error,
  } = useBusinessTransfersQuery({
    variables: { id: me?.business?.id, transferId: parseInt(id as string) },
  });
  // if (businessLoading) return <Loader />;
  if (error) console.error(error);
  if (!data?.business) console.log("no business");
  return <BusinessTransferPage business={data?.business} transferId={id} />;
}
