import { gql } from "@apollo/client";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import SearchInput from "../../components/SearchInput";
import Loader from "../../components/Loader";

import Section from "../../components/Section";
import { useBusinessOffersQuery } from "../../generated/graphql";
import Button from "../../components/Button";
import { Table } from "../../components/Table";
import moment from "moment";
import { displayPrice } from "lib/displayPrice";

export const BUSINESS_OFFERS_QUERY = gql`
  query businessOffers($id: Int!, $name: String) {
    business(id: $id) {
      id
      name
      offers(name: $name, admin: true) {
        id
        name
        createdAt
        isActive
        price
        quantity
        quantityLeft
      }
    }
  }
`;

export default function offers({ me }) {
  useEffect(() => {
    if (!me?.id) {
      router.replace("/signin");
    } else if (!me?.business?.isValidated) {
      router.replace("/business");
    }
  });
  if (!me?.id || !me?.business?.isValidated) return <Loader />;
  const [search, setSearch] = useState("");
  const { data, loading, error } = useBusinessOffersQuery({
    variables: {
      id: me?.business?.id,
      name: search,
    },
    fetchPolicy: "cache-first",
  });
  // if (loading) return <Loader />;
  return (
    <main>
      <div className="py-10">
        <Container>
          <Section>
            <h2 className="title is-2">Offres</h2>
            <p className="text-accents6">Liste de vos offres</p>
          </Section>
          <div className="flex items-center justify-between">
            <SearchInput
              placeholder="Chercher une offre"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            {data?.business?.offers.length > 1 && (
              <span>{data?.business?.offers.length} offres crées</span>
            )}
            <Button
              onClick={() => {
                router.push("/offer/create");
              }}
            >
              Créer une offre
            </Button>
          </div>
          <Table
            loading=""
            emptyText="Aucune offre"
            data={data?.business?.offers}
            onRowClick={(offer) => {
              router.push("/offer/" + offer?.id);
            }}
            renderProperty={{
              isActive: (offer) => (
                <>
                  {offer.isActive === true ? (
                    <div>
                      <span className="inline-block px-1 py-1 ml-auto mr-2 text-xs text-white bg-green-500 rounded-full"></span>
                      Actif
                    </div>
                  ) : (
                    <div>
                      <span className="inline-block px-1 py-1 ml-auto mr-2 text-xs text-white bg-red-500 rounded-full"></span>
                      Inactif
                    </div>
                  )}
                </>
              ),
              createdAt: (offer) => (
                <>{moment(new Date(offer.createdAt)).format("lll")}</>
              ),
              price: (offer) => <>{displayPrice(offer.price)}</>,
              quantity: (offer) => (
                <>
                  {offer.quantityLeft} / {offer.quantity}
                </>
              ),
            }}
            columns={[
              { value: "Offre active", key: "isActive" },
              { value: "Crée le", key: "createdAt" },
              { value: "Nom", key: "name" },
              { value: "Prix de vente", key: "price" },
              { value: "Quantité restante", key: "quantity" },
            ]}
          />
        </Container>
      </div>
    </main>
  );
}
