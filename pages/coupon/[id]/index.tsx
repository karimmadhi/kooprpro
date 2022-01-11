import { gql } from "@apollo/client";
import Container from "components/Container";
import { ErrorNotification } from "components/ErrorNotification";
import Loader from "components/Loader";
import Section from "components/Section";
import { Table } from "components/Table";
import {
  useBusinessCouponQuery,
  useBusinessDashboardQuery,
  useBusinessOrderQuery,
} from "generated/graphql";
import { displayDateTime } from "lib/displayDate";
import { displayPrice } from "lib/displayPrice";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const BUSINESS_COUPON_QUERY = gql`
  query businessCoupon($businessId: Int!, $couponId: Int!) {
    business(id: $businessId) {
      id
      coupon(couponId: $couponId) {
        id
        uid
        status
        createdAt
        expiredAt
        offer {
          id
          name
          orderDetail {
            id
          }
        }
        order {
          id
          uid
          createdAt
        }
      }
    }
  }
`;

export const displayCouponStatus = (coupon) => {
  if (coupon.status === "used") return "Utilisé";
  if (moment(coupon.expireAt).isBefore(moment())) return "Expiré";
  return "Non utilisé";
};

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
  const { data, loading, error } = useBusinessCouponQuery({
    variables: {
      businessId: me?.business?.id,
      couponId: parseInt(id as string),
    },
  });
  if (loading) return <Loader />;

  return (
    <main>
      <div className="py-10">
        <Container>
          <Section>
            <div className="px-4 py-5 bg-white border-b border-gray-200 sm:px-6">
              <div className="flex flex-row justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Coupons n° {data?.business?.coupon?.uid} -{" "}
                  {data?.business?.coupon?.offer?.name}
                </h3>
                <span>{displayCouponStatus(data?.business?.coupon)}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                <Link
                  href={
                    "/order/" + data?.business?.coupon?.offer?.orderDetail.id
                  }
                >
                  <a className="text-blue-400">
                    Commande n° {data?.business?.coupon?.order?.uid}
                  </a>
                </Link>{" "}
                du {displayDateTime(data?.business?.coupon?.order?.createdAt)}
              </p>
            </div>
            <h3 className="text-lg font-medium leading-6 text-gray-900"></h3>
          </Section>
        </Container>
      </div>
    </main>
  );
}
