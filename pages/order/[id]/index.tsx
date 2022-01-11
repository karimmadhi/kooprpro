import { gql } from "@apollo/client";
import Container from "components/Container";
import { ErrorNotification } from "components/ErrorNotification";
import Loader from "components/Loader";
import Section from "components/Section";
import { Table } from "components/Table";
import {
  useBusinessDashboardQuery,
  useBusinessOrderQuery,
} from "generated/graphql";
import { displayDateTime } from "lib/displayDate";
import { displayPrice } from "lib/displayPrice";
import moment from "moment";
import { useRouter } from "next/router";
import { displayCouponStatus } from "pages/coupon/[id]";
import React, { useEffect } from "react";

const ORDER_BUSINESS_QUERY = gql`
  query businessOrder($id: Int!, $orderId: Int!) {
    business(id: $id) {
      id
      orderDetail(orderId: $orderId) {
        id
        etFees
        amount
        kooprFees
        virAmount
        order {
          id
          uid
          status
          createdAt
          coupons(businessId: $id) {
            id
            uid
            status
            expiredAt
            offer {
              name
            }
          }
        }
        offersInfo
        offers {
          id
          name
          price
        }
      }
    }
  }
`;

export default function order({ me }) {
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    if (!me?.id) {
      router.replace("/signin");
    } else if (!me?.business?.isValidated) {
      router.replace("/business");
    }
  });
  if (!me?.id || !me?.business?.isValidated) return <Loader />;
  const { data, loading, error } = useBusinessOrderQuery({
    variables: {
      id: me?.business?.id,
      orderId: parseInt(id as string),
    },
  });
  if (loading) return <Loader />;
  if (
    !data ||
    error ||
    !data.business.orderDetail ||
    !data.business.orderDetail.offersInfo
  )
    return (
      <div className="my-10">
        <Container>
          <Section>
            <ErrorNotification error="Cette commande n'existe pas" />
          </Section>
        </Container>
      </div>
    );
  const offersData = data?.business?.orderDetail.offersInfo.map(
    (offerInfo) => ({
      name: offerInfo.name,
      price: displayPrice(offerInfo.price),
      quantity: offerInfo.quantity,
      total: displayPrice(offerInfo.price * offerInfo.quantity),
    })
  );
  offersData.push({
    quantity: "Sous-total",
    total: displayPrice(data?.business?.orderDetail?.amount),
  });
  offersData.push({
    quantity: "Frais de transaction",
    total: " - " + displayPrice(data?.business?.orderDetail?.etFees),
  });
  offersData.push({
    quantity: "Frais Koopr",
    total: " - " + displayPrice(data?.business?.orderDetail?.kooprFees),
  });
  offersData.push({
    quantity: "Total",
    total: displayPrice(data?.business?.orderDetail?.virAmount),
  });
  return (
    <main>
      <div className="py-10">
        <Container>
          <Section>
            <div className="px-4 py-5 bg-white border-b border-gray-200 sm:px-6">
              <div className="flex flex-row justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Commande n° {data?.business?.orderDetail?.order?.uid}
                </h3>
                <span>
                  {displayPrice(data?.business?.orderDetail?.virAmount)}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Passée le{" "}
                {displayDateTime(data?.business?.orderDetail?.order?.createdAt)}
              </p>
            </div>
            <Table
              data={offersData}
              loading="Chargement"
              columns={[
                { value: "Nom", key: "name" },
                { value: "Prix initial", key: "price" },
                { value: "Quantité", key: "quantity" },
                { value: "total", key: "total" },
              ]}
            />
          </Section>
        </Container>
        <Container>
          <Section>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Coupons associés à cette commande
            </h3>{" "}
            <Table
              data={data?.business?.orderDetail?.order?.coupons}
              loading="Chargement"
              renderProperty={{
                name: (coupon) => <>{coupon?.offer?.name}</>,
                status: (coupon) => <>{displayCouponStatus(coupon)}</>,
                expiredAt: (coupon) => <>{displayDateTime(coupon.expireAt)}</>,
              }}
              onRowClick={(coupon) => {
                router.push("/coupon/" + coupon?.id);
              }}
              columns={[
                { value: "N°", key: "uid" },
                { value: "Nom", key: "name" },
                { value: "Statut", key: "status" },
                { value: "Expire le", key: "expiredAt" },
              ]}
            />
          </Section>
        </Container>
      </div>
    </main>
  );
}
