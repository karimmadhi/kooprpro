import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import BusinessLeftNavigation from "components/BusinessLeftNavigation";
import { EditableHours } from "components/EditableHours";
import Loader from "components/Loader";
import Container from "components/Container";
import Section from "components/Section";
import { useBusinessQuery } from "generated/graphql";
import router from "next/router";
import { useEffect, useState } from "react";
import { BusinessHeader, BUSINESS_QUERY } from ".";

export default function OpeningHours({ me }) {
  // useEffect run one time on componentDidMount
  useEffect(() => {
    if (!me) {
      // if user is not authenticated, redirect to /signin
      router.replace("/signin");
    } else if (!me?.business) {
      // if user does not have a business yet, redirect to /createBusiness
      router.replace("/createBusiness");
    }
  }, []);
  // display a loader while redirect
  if (!me || !me?.business) return <Loader />;
  // Use the business query already defined to fetch the business data
  const { data, loading } = useBusinessQuery({
    variables: { id: me?.business?.id },
  });
  if (loading) return <Loader />;

  return (
    <>
      <main>
        <BusinessHeader business={data?.business} />
        <Container>
          <Section>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
              <BusinessLeftNavigation business={data?.business} />
              <div className="px-8 space-y-6 lg:col-span-9">
                <h1 className="text-3xl uppercase font-medium leading-6 text-OFLO_orange"
                >Horaires de votre établissement</h1>
                <p>
                  Ces informations seront visibles sur l'application. Veillez
                  à les mettres à jour régulièrement.
                </p>

                <EditableHours business={data?.business} />
              </div>
            </div>
          </Section>
        </Container>
      </main>
    </>
  );
}
