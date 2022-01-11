import Container from "components/Container";
import NavBar from "components/NavBar";
import {
  useAddAddressToBusinessMutation,
  useBusinessQuery,
  useCreateBusinessMutation,
  useUpdateUserMutation,
} from "generated/graphql";
import { signOut } from "lib/auth";
import router from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import Button from "../../components/Button";
import Link from "next/link";
import TextInput from "components/TextInput";
import { gql, useQuery } from "@apollo/client";
import { BusinessHeader, BUSINESS_QUERY } from ".";
import BusinessLeftNavigation from "../../components/BusinessLeftNavigation";
import ActionBox from "components/ActionBox";
import { Table } from "components/Table";
import moment from "moment";
import { displayPrice } from "lib/displayPrice";
import { PlacesAutocompleteInput } from "components/PlacesAutocompleteInput";
import { extractAddressFromAddressComponents } from "lib/extractAddressFromAddressComponents";
import { GeocodeResult } from "use-places-autocomplete";
import toast from "react-hot-toast";

const ADD_ADDRESS_TO_BUSINESS = gql`
  mutation addAddressToBusiness(
    $addAddressToBusinessBusinessId: Int!
    $addAddressToBusinessFullAddress: String!
    $addAddressToBusinessAddress: String!
    $addAddressToBusinessCity: String!
    $addAddressToBusinessCountry: String!
    $addAddressToBusinessZipCode: String!
    $addAddressToBusinessLat: Float!
    $addAddressToBusinessLng: Float!
  ) {
    addAddressToBusiness(
      businessId: $addAddressToBusinessBusinessId
      fullAddress: $addAddressToBusinessFullAddress
      address: $addAddressToBusinessAddress
      city: $addAddressToBusinessCity
      country: $addAddressToBusinessCountry
      zipCode: $addAddressToBusinessZipCode
      lat: $addAddressToBusinessLat
      lng: $addAddressToBusinessLng
    ) {
      id
    }
  }
`;

const BusinessTransferPage = ({ business }) => {
  if (!business) return null;
  const [addAddressToBusiness, { loading: addAddressToBusinessLoading }] =
    useAddAddressToBusinessMutation({
      refetchQueries: [
        {
          query: BUSINESS_QUERY,
          variables: {
            id: business.id,
          },
        },
      ],
    });
  const [place, setPlace] = useState<GeocodeResult | null>(null);

  return (
    <main>
      <BusinessHeader business={business} />
      <Container>
        <Section>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <BusinessLeftNavigation business={business} />
            <div className="px-8 space-y-6 lg:col-span-9">
              <h1>Ajouter une nouvelle adresses</h1>
              <p>
                Ces addresses seront disponibles lors de la création d'une
                nouvelle offre.
              </p>
              <div className="flex flex-row items-end space-x-6">
                <PlacesAutocompleteInput setPlace={setPlace} />
                <Button
                  onClick={async () => {
                    const address = extractAddressFromAddressComponents(
                      place.address_components
                    );
                    await addAddressToBusiness({
                      variables: {
                        addAddressToBusinessBusinessId: business.id,
                        addAddressToBusinessAddress: address.address,
                        addAddressToBusinessCity: address.city,
                        addAddressToBusinessCountry: address.country,
                        addAddressToBusinessFullAddress:
                          place.formatted_address,
                        addAddressToBusinessLat:
                          place?.geometry?.location.lat(),
                        addAddressToBusinessLng:
                          place?.geometry?.location.lng(),
                        addAddressToBusinessZipCode: address.zipCode,
                      },
                    });
                    toast.success("L'adresse a été créee.");
                    window.location.reload();
                  }}
                >
                  Ajouter
                </Button>
              </div>
              <Table
                data={business?.addresses}
                columns={[
                  { value: "Adresse", key: "fullAddress" },
                  { value: "Crée le", key: "createdAt" },
                ]}
                renderProperty={{
                  createdAt: (transfer) => (
                    <>{moment(new Date(transfer.createdAt)).format("lll")}</>
                  ),
                }}
              />
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
};

export default function BusinessTransfer({ me }) {
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
  if (error) console.error(error);
  if (!data?.business) console.log("no business");
  return <BusinessTransferPage business={data?.business} />;
}
