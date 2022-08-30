import Container from "components/Container";
import { PlacesAutocompleteInput } from "components/PlacesAutocompleteInput";
import TextInput from "components/TextInput";
import { useCreateBusinessMutation } from "generated/graphql";
import { signOut } from "lib/auth";
import router from "next/router";
import { useEffect, useState } from "react";
import Loader from "components/Loader";
import Section from "components/Section";
import { GeocodeResult } from "use-places-autocomplete";
import { extractAddressFromAddressComponents } from "lib/extractAddressFromAddressComponents";
import { ErrorNotification } from "components/ErrorNotification";
import TextArea from "components/TextArea";
import Button from "components/Button";
import { gql } from "@apollo/client";
import { ME_QUERY } from "lib/checkLoggedIn";

const CREATE_BUSINESS_MUTATION = gql`
  mutation createBusiness(
    $createBusinessName: String!
    $createBusinessAddress: String!
    $createBusinessCity: String!
    $createBusinessCountry: String!
    $createBusinessLat: Float!
    $createBusinessLng: Float!
    $createBusinessZipCode: String!
    $createBusinessPhone: String!
    $createBusinessSiret: String
    $createBusinessFullAddress: String
  ) {
    createBusiness(
      name: $createBusinessName
      address: $createBusinessAddress
      city: $createBusinessCity
      country: $createBusinessCountry
      lat: $createBusinessLat
      lng: $createBusinessLng
      zipCode: $createBusinessZipCode
      phone: $createBusinessPhone
      siret: $createBusinessSiret
      fullAddress: $createBusinessFullAddress
    ) {
      id
    }
  }
`;

export default function createBusiness({ me }) {
  useEffect(() => {
    if (!me) {
      router.push("/signin");
    } else if (me?.business?.isValidated === false) {
      router.push("/business");
    }
  });
  if (!me) return <Loader />;
  const [errors, setErrors] = useState<any>({});
  const [state, setState] = useState<any>({});
  const [place, setPlace] = useState<GeocodeResult | null>(null);
  const [
    createBusiness,
    { loading: createBusinessLoading, error: createBusinessError },
  ] = useCreateBusinessMutation({
    refetchQueries: [{ query: ME_QUERY }],
  });
  return (
    <main className="">
      <div className="mb-8 bg-gray-50">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Bienvenue chez Koopr !</span>
            <span className="block text-orange-600">
              Création de votre établissement
            </span>
          </h2>
          <div className="flex mt-8 bg-white lg:mt-0 lg:flex-shrink-0">
            <div className="flex flex-col p-4 rounded-md shadow">
              <h2 className="mb-2">Besoin d'aide ?</h2>
              <a href="mailto:contact@koopr.app" className="text-blue-300">
                Email: contact@koopr.app
              </a>
              <a href="tel:+33651364383" className="text-indigo-300">
                Telephone: 06 51 36 43 83
              </a>
            </div>
          </div>
          <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex ml-3 rounded-md shadow">
              <a
                onClick={() => signOut()}
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-orange-600 bg-white border border-transparent rounded-md hover:bg-orange-50"
              >
                Se déconnecter
              </a>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <Section>
          <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <div className="flex flex-col justify-between align-center sm:flex-row">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Informations obligatoires
                    </h3>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500 ">
                      Dans un premier temps, nous avons besoin d'informations
                      obligatoires pour valider votre accès à l'espace
                      professionnel.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    Connecté en tant que <br />
                    <span className="font-bold">{me?.email}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Nom de votre établissement
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex max-w-lg rounded-md shadow-sm">
                        <TextInput
                          onChange={(e) => {
                            setState({ ...state, name: e.target.value });
                          }}
                          value={state.name}
                          error={errors?.name}
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
{/*
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Numéro SIRET
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <TextInput
                        onChange={(e) =>
                          setState({ ...state, siret: e.target.value })
                        }
                        required={true}
                        error={errors?.siret}
                        value={state.siret}
                      />
                    </div>
                  </div>
                      */}
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Adresse
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <PlacesAutocompleteInput
                        setPlace={setPlace}
                        label=" "
                        error={errors?.address}
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Numéro de téléphone
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <TextInput
                        inputMode="tel"
                        onChange={(e) =>
                          setState({ ...state, phone: e.target.value })
                        }
                        value={state.phone}
                        type="tel"
                        required={true}
                        error={errors?.phone}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Description de votre établissement
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <TextArea
                    onChange={(e) =>
                      setState({ ...state, description: e.target.value })
                    }
                    value={state.description}
                    error={errors?.description}
                  />
                  <p className="mt-2 text-sm text-gray-700 ">
                    Elle apparaitra sur l'application
                  </p>
                </div>
              </div> */}

              {/* <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 ">
                    Informations et contact
                  </h3>
                  <p className="max-w-2xl mt-1 text-sm text-gray-700 ">
                    Ces informations seront également affichés sur l'application
                    Koopr.
                  </p>
                </div>
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Logo de votre établissement
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex items-center">
                        <span className="w-12 h-12 overflow-hidden bg-gray-100 rounded-full"></span>
                        <button
                          type="button"
                          className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-black bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          Ajouter un logo
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="cover_photo"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Image de fond de votre établissement
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="w-12 h-12 mx-auto text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative px-1 font-medium text-orange-600 bg-white rounded-md cursor-pointer hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                            >
                              <span>Ajouter une photo</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Adresse
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <PlacesAutocompleteInput setPlace={() => {}} label=" " />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Numéro de téléphone
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <TextInput onChange={(e) => {}} value="" />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Email address
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <TextInput onChange={(e) => {}} value="" />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Country / Region
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country"
                        className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:max-w-xs sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="pt-5">
              <ErrorNotification
                error={
                  Object.keys(errors).length > 0 &&
                  "Veuillez remplir les champs obligatoires"
                }
              />
              <ErrorNotification
                error={createBusinessError && "Une erreur s'est produite"}
              />
              <div className="flex justify-end mt-4">
                <Button
                  loading={createBusinessLoading}
                  onClick={async (e) => {
                    e.preventDefault();
                    setErrors({});
                    let errorsState: any = {};
                    if (!state.name || state.length < 2) {
                      errorsState.name = true;
                    }
/*
                    if (!state.siret || state.siret.length < 14) {
                      errorsState.siret =
                        "Le SIRET doit contenir 14 caractères";
                    }
*/
                    if (!state.phone || state.phone.length < 6) {
                      errorsState.phone = true;
                    }
                    if (!place?.geometry?.location?.lat()) {
                      errorsState.address = true;
                    }
                    if (Object.keys(errorsState).length > 0) {
                      setErrors(errorsState);
                      return;
                    }
                    const address = extractAddressFromAddressComponents(
                      place.address_components
                    );
                    const { data } = await createBusiness({
                      variables: {
                        createBusinessName: state.name,
                        createBusinessAddress: address.address,
                        createBusinessCity: address.city,
                        createBusinessCountry: address.country,
                        createBusinessLat: place?.geometry?.location.lat(),
                        createBusinessLng: place?.geometry?.location.lng(),
                        createBusinessZipCode: address.zipCode,
                        createBusinessPhone: state.phone,
                        createBusinessSiret: "00000000000000",
                        createBusinessFullAddress: place?.formatted_address,
                      },
                    });
                    if (data?.createBusiness?.id) {
                      router.replace("/business");
                    }
                  }}
                >
                  Créer mon établissement
                </Button>
              </div>
            </div>
          </form>
        </Section>
      </Container>
    </main>
  );
}
