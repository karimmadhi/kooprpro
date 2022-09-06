import { gql } from "@apollo/client";
import Container from "components/Container";
import Section from "components/Section";
import { displayDateTime } from "lib/displayDate";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "components/Loader";
import { displayCouponStatus } from "./[id]";
import { Table } from "components/Table";
import { useBusinessCouponsQuery } from "../../generated/graphql";
import SearchInput from "components/SearchInput";
import Button from "components/Button";

const BUSINESS_COUPONS_QUERY = gql`
  query businessCoupons($id: Int!, $search: String) {
    business(id: $id) {
      id
      coupons(search: $search) {
        id
        uid
        status
        createdAt
        expiredAt
        offer {
          id
          name
        }
      }
    }
  }
`;

export default function coupons({ me }) {
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
  const [search, setSearch] = useState("");
  const { data, loading, error } = useBusinessCouponsQuery({
    variables: {
      id: me?.business?.id,
      search,
    },
  });
  return (
    <main>
      <div className="py-10">
        <Container>
          <Section>
            <h1 className="title is-2 text-OFLO_orange uppercase font-bold">Coupons</h1>
            <p className="text-accents6">Liste de vos coupons vendus</p>
          </Section>
          <Section>
            <div className="flex items-center justify-between">
              <SearchInput
                placeholder="Chercher un coupon"
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </div>
            <Table
              data={data?.business?.coupons}
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
