import Container from "components/Container";
import NavBar from "components/NavBar";
import {
  useBusinessQuery,
  useCreateBusinessMutation,
  useUpdateUserMutation,
} from "generated/graphql";
import { signOut } from "lib/auth";
import router from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import Section from "../../../components/Section";
import Button from "../../../components/Button";
import Link from "next/link";
import TextInput from "components/TextInput";
import { gql, useQuery } from "@apollo/client";
import { BusinessHeader } from "..";
import BusinessLeftNavigation from "../../../components/BusinessLeftNavigation";
import ActionBox from "components/ActionBox";
import { Table } from "components/Table";
import moment from "moment";
import { displayPrice } from "lib/displayPrice";

const BusinessTransferPage = ({ business }) => {
  if (!business) return null;
  const [errors, setErrors] = useState<any>({});
  const [state, setState] = useState<any>({ ...business });
  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation();
  return (
    <main>
      <BusinessHeader business={business} />
      <Container>
        <Section>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <BusinessLeftNavigation business={business} />
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <ActionBox title="Mes virements">
                <Table
                  data={business.transfers}
                  columns={[
                    { value: "N°", key: "id" },
                    { value: "Montant", key: "amount" },
                    { value: "Envoyé le", key: "createdAt" },
                  ]}
                  onRowClick={(row) =>
                    router.push("/business/transfer/" + row?.id)
                  }
                  renderProperty={{
                    amount: (transfer) => <>{displayPrice(transfer.amount)}</>,
                    createdAt: (transfer) => (
                      <>{moment(new Date(transfer.createdAt)).format("lll")}</>
                    ),
                  }}
                />
              </ActionBox>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
};

export default function BusinessTransfer({ me }) {
  console.log("me", me);
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
  } = useBusinessQuery({
    variables: { id: me?.business?.id },
  });
  // if (businessLoading) return <Loader />;
  console.log("data", data);
  if (error) console.error(error);
  if (!data?.business) console.log("no business");
  return <BusinessTransferPage business={data?.business} />;
}
