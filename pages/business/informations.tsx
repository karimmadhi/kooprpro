import { gql } from "@apollo/client";
import Button from "components/Button";
import Container from "components/Container";
import { ErrorNotification } from "components/ErrorNotification";
import TextArea from "components/TextArea";
import TextInput from "components/TextInput";
import {
  useBusinessQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useUploadbackgroundImageOnBusinessMutation,
  useUploadLogoOnBusinessMutation,
} from "generated/graphql";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";
import { BusinessHeader } from ".";
import BusinessLeftNavigation from "../../components/BusinessLeftNavigation";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import { Switch } from "@headlessui/react";
import FileInput from "components/FileInput";
import toast from "react-hot-toast";

export const UPDATE_BUSINESS_MUTATION = gql`
  mutation updateBusiness(
    $updateBusinessId: Int!
    $updateBusinessIsValidated: Boolean
    $updateBusinessPhone: String
    $updateBusinessSiteUrl: String
    $updateBusinessDescription: String
    $updateBusinessCompanyType: String
    $updateBusinessServices: json
    $updateBusinessHasFidelity: Boolean
    $iban: String
    $updateFacebookUrl: String
    $updateInstagramUrl: String
  ) {
    updateBusiness(
      id: $updateBusinessId
      isValidated: $updateBusinessIsValidated
      phone: $updateBusinessPhone
      siteUrl: $updateBusinessSiteUrl
      description: $updateBusinessDescription
      companyType: $updateBusinessCompanyType
      services: $updateBusinessServices
      hasFidelity: $updateBusinessHasFidelity
      iban: $iban
      facebookUrl: $updateFacebookUrl
      instagramUrl: $updateInstagramUrl
    ) {
      isValidated
      phone
      siteUrl
      companyType
      description
      services
      hasFidelity
      fidelityCount
      fidelityPercentage
      iban
      facebookUrl
      instagramUrl
    }
  }
`;

const UPLOAD_LOGO_ON_BUSINESS_MUTATION = gql`
  mutation uploadLogoOnBusiness($file: Upload!, $id: Int!) {
    uploadLogoOnBusiness(file: $file, id: $id) {
      id
      logoUrl
    }
  }
`;

const UPLOAD_BACKGROUD_IMAGE_ON_BUSINESS_MUTATION = gql`
  mutation uploadbackgroundImageOnBusiness($file: Upload!, $id: Int!) {
    uploadBackgroundImageOnBusiness(file: $file, id: $id) {
      id
      backgroundImageUrl
    }
  }
`;

const BusinessInformationsPage = ({ business }) => {
  if (!business) return null;
  const [state, setState] = useState({ ...business });
  const [
    uploadBackgroundImageOnBusiness,
    {
      loading: uploadBackgroundImageLoading,
      error: errorUploadBackgroundImage,
    },
  ] = useUploadbackgroundImageOnBusinessMutation();
  const [
    uploadLogoOnBusiness,
    { loading: uploadLogoLoading, error: errorUploadLogo },
  ] = useUploadLogoOnBusinessMutation();
  const [
    updateBusiness,
    { loading: updateBusinessLoading, error: updateBusinessError },
  ] = useUpdateBusinessMutation();
  const [enabled, setEnabled] = useState(business.hasFidelity);
  return (
    <Container>
      <Section>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <BusinessLeftNavigation business={business} />
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <form action="#" method="POST">
              <div className="shadow border border-solid border-OFLO_darkblue sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
                  <div>
                    <h3 className="text-2xl font-medium leading-6 text-OFLO_orange">
                      {/* {(!business.logoUrl || !business.backgroundImageUrl) && (
                        <span className=" h-6 px-0.5 py-1 mr-2 text-xs text-white bg-red-500 "></span>
                      )} */}
                      Affichage
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Ces informations sont visibles sur votre page dans
                      l'application Koopr
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        {!business.logoUrl && (
                          <span className="inline-block px-1 py-1 ml-auto mr-2 text-xs text-white bg-red-500 rounded-full"></span>
                        )}
                        Logo de votre établissement
                      </label>
                      <div className="flex items-center mt-1">
                        <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                          {business?.logoUrl ? (
                            <Image
                              src={business.logoUrl}
                              alt="Photo de l'offre"
                              width={64}
                              height={64}
                              className="object-contain"
                            />
                          ) : (
                            <img
                              src={state.logoUrl}
                              className="object-contain"
                            />
                          )}
                        </span>
                        <label
                          htmlFor="logo-upload"
                          className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          <span>Télécharger un nouveau logo</span>
                          <input
                            id="logo-upload"
                            name="logo-upload"
                            type="file"
                            className="sr-only"
                            onChange={async (event) => {
                              const file = event.target.files[0];
                              setState({
                                ...state,
                                logo: file,
                                logoUrl: URL.createObjectURL(file),
                              });
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <FileInput
                        fileUrl={state.backgroundImageUrl}
                        tmpFileUrl={state.backgroundImageUrl}
                        label="Photo de couverture"
                        onChange={(file, fileUrl) => {
                          setState({
                            ...state,
                            backgroundImage: file,
                            backgroundImageUrl: URL.createObjectURL(file),
                          });
                        }}
                      />
                    </div>

                    {/* <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        {!business.backgroundImageUrl && (
                          <span className="inline-block px-1 py-1 ml-auto mr-2 text-xs text-white bg-red-500 rounded-full"></span>
                        )}
                        Photo de couverture
                      </label>
                      {!state.backgroundImageUrl ? (
                        <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
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
                            <div className="flex justify-center text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative font-medium text-orange-600 bg-white rounded-md cursor-pointer hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                              >
                                <span>Télécharger une image</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={async (event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                      setState({
                                        ...state,
                                        backgroundImage: file,
                                        backgroundImageUrl:
                                          URL.createObjectURL(file),
                                      });
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500">
                              Une taille minimum de 1000pixel est conseillé
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <div>
                              {business?.backgroundImageUrl ? (
                                <Image
                                  src={business.backgroundImageUrl}
                                  alt="Photo de fond de l'établissement"
                                  width={300}
                                  height={100}
                                  className="object-contain"
                                />
                              ) : (
                                <img
                                  src={state.backgroundImageUrl}
                                  className="object-contain w-full rounded-sm max-h-64"
                                />
                              )}
                            </div>
                            <div className="flex justify-center text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative px-2 py-1 mt-2 font-medium text-orange-600 bg-gray-100 rounded-md cursor-pointer hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                              >
                                <span>Télécharger une nouvelle image</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={async (event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                      setState({
                                        ...state,
                                        backgroundImage: file,
                                        backgroundImageUrl:
                                          URL.createObjectURL(file),
                                      });
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500">
                              Une taille minimum de 1000pixel est conseillé
                            </p>
                          </div>
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
                <ErrorNotification
                  error={updateBusinessError && "Une erreur s'est produite"}
                />
                <div className="px-4 py-3 text-right bg-OFLO_darkblue sm:px-6">
                  <Button
                    loading={uploadBackgroundImageLoading || uploadLogoLoading}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (state.logo) {
                        await uploadLogoOnBusiness({
                          variables: {
                            id: business.id,
                            file: state.logo,
                          },
                        });
                      }
                      if (state.backgroundImage) {
                        await uploadBackgroundImageOnBusiness({
                          variables: {
                            id: business.id,
                            file: state.backgroundImage,
                          },
                        });
                      }
                      toast.success("Modification enregistrée.");
                    }}
                  >
                    Modifier
                  </Button>
                </div>
              </div>
            </form>

            <form>
              <div className="shadow border boder-solid border-OFLO_darkblue sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
                  <div>
                    <h3 className="text-2xl font-medium leading-6 text-OFLO_orange">
                      {/* {(!business.description || !business.phone) && (
                        <span className=" h-6 px-0.5 py-1 mr-2 text-xs text-white bg-red-500 "></span>
                      )} */}
                      Informations complémentaires
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-6">
                      <TextArea
                        onChange={(e) => {
                          setState({ ...state, description: e.target.value });
                        }}
                        label="Description de votre établissement"
                        value={state.description}
                        alert={!state.description}
                      />
                      <p className="mt-1 text-sm text-gray-400">Décrivez et faites découvrir votre activité à vos clients.</p>
                    </div>
                    <div className="sm:col-span-3">
                      <TextInput
                        onChange={(e) => {
                          setState({ ...state, phone: e.target.value });
                        }}
                        label="Numéro de téléphone"
                        value={state.phone}
                        alert={!state.phone}
                      />
                      <p className="mt-1 text-sm text-gray-400">Sur quel numéro souhaitez-vous qu'un client vous appelle ?</p>
                    </div>
                    <div className="sm:col-span-3">
                      <TextInput
                        onChange={(e) => {
                          setState({ ...state, siteUrl: e.target.value });
                        }}
                        label="Site internet"
                        value={state.siteUrl}
                      />
                      <p className="mt-1 text-sm text-gray-400">Faite découvrir votre site web et vos autres liens utiles</p>
                    </div>
                    <div className="sm:col-span-3">
                      <TextInput
                        onChange={(e) => {
                          setState({ ...state, facebookUrl: e.target.value });
                        }}
                        label="Page Facebook"
                        value={state.facebookUrl}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <TextInput
                        onChange={(e) => {
                          setState({...state, instagramUrl: e.target.value});
                        }}
                        label="Page Instagram"
                        value={state.instagramUrl}
                      />
                    </div>

                    {/* <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div> */}
                  </div>
                </div>
                <ErrorNotification
                  error={
                    (errorUploadLogo || errorUploadBackgroundImage) &&
                    "Une erreur s'est produite"
                  }
                />
                <div className="px-4 py-3 text-right bg-OFLO_darkblue sm:px-6">
                  <Button
                    loading={updateBusinessLoading}
                    onClick={async (e) => {
                      e.preventDefault();
                      await updateBusiness({
                        variables: {
                          updateBusinessId: state?.id,
                          updateBusinessSiteUrl: state?.siteUrl,
                          updateBusinessPhone: state?.phone,
                          updateBusinessDescription: state?.description,
                          updateBusinessFacebookUrl: state?.facebookUrl,
                          updateBusinessInstagramUrl: state?.instagramUrl,
                        },
                      });
                      toast.success("Modification enregistrée.");
                    }}
                  >
                    Valider
                  </Button>
                </div>
              </div>
            </form>

            <form>
              <div className="shadow border border-solid border-OFLO_darkblue sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
                  <div>
                    <h3 className="text-2xl font-medium leading-6 text-OFLO_orange">
                      {/* {(!business.description || !business.phone) && (
                        <span className=" h-6 px-0.5 py-1 mr-2 text-xs text-white bg-red-500 "></span>
                      )} */}
                      Koopr Addict
                    </h3>
                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-12">
                      <Switch.Group>
                        <div className="flex items-center">
                          <Switch.Label className="mr-4">
                            {enabled
                              ? "Offre de fidélité active"
                              : "Offre de fidélité inactive"}
                          </Switch.Label>
                          <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={`${
                              enabled ? "bg-green-600" : "bg-gray-200"
                            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            <span
                              className={`${
                                enabled ? "translate-x-6" : "translate-x-1"
                              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                          </Switch>
                        </div>
                      </Switch.Group>
                    </div>
                    {enabled && (
                      <>
                        <div className="col-span-5 md:col-span-3">
                          <TextInput
                            disabled={true}
                            onChange={(e) => {
                              setState({ ...state, phone: e.target.value });
                            }}
                            label="Taux de réduction (%)"
                            value={state.fidelityPercentage}
                          />
                        </div>
                        <div className="col-span-8">
                          <TextInput
                            disabled={true}
                            onChange={(e) => {
                              setState({ ...state, siteUrl: e.target.value });
                            }}
                            label="Nombre d'achat necessaire"
                            value={state.fidelityCount}
                          />
                        </div>
                      </>
                    )}

                    {/* <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div> */}
                  </div>
                </div>
                <ErrorNotification
                  error={
                    (errorUploadLogo || errorUploadBackgroundImage) &&
                    "Une erreur s'est produite"
                  }
                />
                <div className="px-4 py-3 text-right bg-OFLO_darkblue sm:px-6">
                  <Button
                    onClick={async (e) => {
                      e.preventDefault();
                      await updateBusiness({
                        variables: {
                          updateBusinessId: state?.id,
                          updateBusinessHasFidelity: enabled,
                        },
                      });
                      toast.success("Modification enregistrée.");
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
  );
};

export default function businessInformations({ me }) {
  useEffect(() => {
    if (!me) {
      router.replace("/signin");
    } else if (!me?.business) {
      router.replace("/createBusiness");
    }
  });
  if (!me || !me?.business) return <Loader />;
  const [errors, setErrors] = useState<any>({});
  const [state, setState] = useState<any>({});
  const { data, loading: businessLoading } = useBusinessQuery({
    variables: { id: me?.business?.id },
  });
  const [createBusiness, { loading, error }] = useCreateBusinessMutation();
  // if (businessLoading) return <Loader></Loader>;
  return (
    <>
      <main>
        <BusinessHeader business={data?.business} />
        <BusinessInformationsPage business={data?.business} />
      </main>
    </>
  );
}
