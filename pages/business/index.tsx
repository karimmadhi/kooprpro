import Container from "components/Container";
import NavBar from "components/NavBar";
import {
  useBusinessQuery,
  useCreateBusinessMutation,
  useUpdateBusinessEtActivityMutation,
  useUpdateBusinessMutation,
  useUpdateUserMutation,
} from "generated/graphql";
import { signOut } from "lib/auth";
import router from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import BusinessLeftNavigation from "../../components/BusinessLeftNavigation";
import Section from "../../components/Section";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import Link from "next/link";
import TextInput from "components/TextInput";
import { gql } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import toast from "react-hot-toast";

export const BUSINESS_QUERY = gql`
  query business($id: Int!) {
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
      hasFidelity
      fidelityPercentage
      fidelityCount
      services
      backgroundImageUrl
      etActivity
      iban
      openingHours
      transfers {
        id
        amount
        offersInfo
        createdAt
      }
      owner {
        id
        email
        firstName
        lastName
        phone
      }
      addresses {
        id
        createdAt
        fullAddress
      }
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $updateUserId: Int!
    $updateUserFirstName: String
    $updateUserLastName: String
    $updateUserPhone: String
  ) {
    updateUser(
      id: $updateUserId
      firstName: $updateUserFirstName
      lastName: $updateUserLastName
      phone: $updateUserPhone
    ) {
      id
      firstName
      lastName
      phone
    }
  }
`;

const UPDATE_BUSINESS_ET_ACTIVITY = gql`
  mutation updateBusinessEtActivity(
    $id: Int!
    $expectedVolumes: String
    $activityDescription: String
  ) {
    updateBusinessEtActivity(
      id: $id
      expectedVolumes: $expectedVolumes
      activityDescription: $activityDescription
    ) {
      id
    }
  }
`;

// export const businessPages = [
//   {
//     name: "Mon établissement",
//     path: "/business",
//   },
// ];

export const BusinessHeader = ({ business }) => {
  if (!business) return null;
  return (
    <div className="mb-8 bg-OFLO_darkblue">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-OFLO_purple sm:text-4xl">
          <span className="block uppercase">{business?.name}</span>
          <span className="block text-white">
            {business.isValidated === false
              ? "Validation de votre établissement"
              : "Gestion de votre établissement"}
          </span>
        </h2>
        <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0 ">
          <div className="flex flex-col p-4 rounded-md shadow bg-OFLO_pastel">
            <h2 className="mb-2 text-OFLO_darkblue">Besoin d'aide ?</h2>
            <a href="mailto:contact@offreslocales.fr" className="text-OFLO_darkblue">
              Email: contact@offreslocales.fr
            </a>
            <a href="tel:+33651364383" className="text-OFLO_darkblue">
              Telephone: 06 51 36 43 83
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessPage = ({ business }) => {
  if (!business) return null;
  const [errors, setErrors] = useState<any>({});
  const [state, setState] = useState<any>({ ...business });
  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation();
  const [updateBusiness] = useUpdateBusinessMutation();
  const [
    updateBusinessEtActivity,
    { loading: updateBusinessEtActivityLoading },
  ] = useUpdateBusinessEtActivityMutation();
  const { addToast } = useToasts();
  return (
    <main>
      <BusinessHeader business={business} />
      <Container>
        <Section>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <BusinessLeftNavigation business={business} />
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <form>
                <div className="shadow border-OFLO_darkblue border border-solid sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
                    <div>
                      <h3 className="text-2xl uppercase font-medium leading-6 text-OFLO_orange">
                        Informations de base
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <TextInput
                          label="Nom de l'établissement"
                          onChange={() => {}}
                          value={business?.name}
                          disabled={true}
                        />
                        <p className="mt-1 text-sm text-gray-400">Cette information sera visible par vos clients</p>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <TextInput
                          label="Numéro SIRET"
                          onChange={(e) => {
                            setState({ ...state, siret: e.target.value });
                          }}
                          value={state.siret}
                          alert={errors?.siret}
                        />
                        <p className="mt-1 text-sm text-gray-400">Nous permet de vous garantir des transactions 100% sécurisées !</p>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <TextInput
                          label="Adresse postale"
                          onChange={() => {}}
                          value={`${business.address}, ${business.zipCode} ${business.city}, ${business.country}`}
                          disabled={true}
                        />
                        <p className="mt-1 text-sm text-gray-400">Cette information sera visible par vos clients. Vous pouvez ajoutez plusieurs points de vente à votre établissement dans le chapitré "Mes Adresses"</p>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <TextInput
                          label="IBAN (27 caractères)"
                          onChange={(e) => {
                            setState({ ...state, iban: e.target.value });
                          }}
                          value={state.iban}
                          alert={!state.iban || state.iban.length != 27}
                          error={!state.iban || state.iban.length != 27}
                          disabled={true}
                        />
                        <p className="mt-1 text-sm text-gray-400">Nous permet de vous garantir des transactions 100% conformes !</p>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <TextInput
                          label="Volumes expectés"
                          onChange={() => {}}
                          value="0-1000"
                          disabled={true}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <TextArea
                          error={
                            state?.etActivity?.ActivityDescription?.Comment
                          }
                          alert={
                            state?.etActivity?.ActivityDescription?.Status !=
                            "valid"
                          }
                          onChange={(e) => {
                            setState({
                              ...state,
                              activityDescription: e.target.value,
                            });
                          }}
                          value={
                            state.activityDescription ||
                            state?.etActivity?.ActivityDescription?.Response
                          }
                          label="Description de vote activité"
                        />
                        <p className="px-4 pt-2 text-red-400">
                          {state?.etActivity?.ActivityDescription?.Comment}
                        </p>
                        <p className="mt-1 text-sm text-gray-400">Cette information est indiqué sur votre justificatif d'activité. (ex. titre de votre code APE, NAF)</p>
                        <p className="mt-1 text-sm text-gray-400">Attention ne modifiez pas cette description si votre compte a déjà été validé (voyany vert).</p>
                        <p className="mt-1 text-sm text-gray-400">Cette information est soumise à validation par notre intermédiaire de paiement et peut engendrer la suspension temporaire de votre activité e-commerce.</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-right bg-OFLO_darkblue sm:px-6">
                    <Button
                      onClick={async (e) => {
                        e.preventDefault();
                        setErrors({});
                        let errorsState: any = {};
                        if (!state.siret || state.siret.length < 14) {
                          errorsState.siret =
                            "Le SIRET doit contenir 14 caractères";
                        }
                        if (Object.keys(errorsState).length > 0) {
                          setErrors(errorsState);
                          return;
                        }
                        await updateBusiness({
                          variables: {
                            updateBusinessId: business.id,
                            iban: state.iban.replaceAll(" ", ""),
                            updateBusinessSiret : state.siret,
                          },
                        });
                        await updateBusinessEtActivity({
                          variables: {
                            id: business.id,
                            expectedVolumes: "0-1000",
                            activityDescription:
                              state.activityDescription ||
                              state?.etActivity?.ActivityDescription?.Response,
                          },
                        });
                        toast.success("Modification enregistrée.");
                      }}
                    >
                      {updateBusinessEtActivityLoading ? "..." : "Valider"}
                    </Button>

                  </div>
                </div>
              </form>
              <form>
                <div className="shadow border border-OFLO_darkblue border-solid sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
                    <div>
                      <h3 className="text-2xl uppercase font-medium leading-6 text-OFLO_orange">
                        Vos informations personnelles
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <TextInput
                          label="Adresse email"
                          onChange={() => {}}
                          value={state?.owner?.email}
                          disabled={true}
                        />
                        <p className="mt-1 text-sm text-gray-400">Renseignez l'e-mail du gérant de l'établissement.</p>
                      </div>
                      <div className="sm:col-span-2">
                        <TextInput
                          label="Téléphone personnel"
                          onChange={(e) => {
                            setState({
                              ...state,
                              owner: {
                                ...state.owner,
                                phone: e.target.value,
                              },
                            });
                          }}
                          value={state?.owner?.phone}
                          alert={!state?.owner?.phone}
                        />
                        <p className="mt-1 text-sm text-gray-400">Renseignez le numéro de portable du gérant de l'étabissement</p>
                      </div>
                      <div className="sm:col-span-3">
                        <TextInput
                          label="Prénom"
                          onChange={(e) => {
                            setState({
                              ...state,
                              owner: {
                                ...state.owner,
                                firstName: e.target.value,
                              },
                            });
                          }}
                          value={state?.owner?.firstName}
                          autoComplete="given-name"
                          alert={!state?.owner?.firstName}
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <TextInput
                          label="Nom"
                          onChange={(e) => {
                            setState({
                              ...state,
                              owner: {
                                ...state.owner,
                                lastName: e.target.value,
                              },
                            });
                          }}
                          value={state?.owner?.lastName}
                          autoComplete="family-name"
                          alert={!state?.owner?.lastName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-right bg-OFLO_darkblue sm:px-6">
                    <Button
                      loading={updateUserLoading}
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          await updateUser({
                            variables: {
                              updateUserId: state?.owner?.id,
                              updateUserFirstName: state?.owner?.firstName,
                              updateUserLastName: state?.owner?.lastName,
                              updateUserPhone: state?.owner?.phone,
                            },
                          });
                          addToast("Modifications sauvegardés", {
                            appearance: "success",
                          });
                        } catch (e) {
                          addToast(
                            "Une erreur s'est produite, impossible de modifier les informations",
                            {
                              appearance: "error",
                            }
                          );
                        }
                      }}
                    >
                      Valider
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
};

export default function Business({ me }) {
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
    fetchPolicy: "cache-and-network",
  });
  // if (businessLoading) return <Loader />;
  if (error) console.error(error);
  if (!data?.business) console.log("no business");
  return <BusinessPage business={data?.business} />;
}
