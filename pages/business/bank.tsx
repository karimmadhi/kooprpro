import Container from "components/Container";
import NavBar from "components/NavBar";
import {
  useBusinessQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useUploadbackgroundImageOnBusinessMutation,
  useUploadLogoOnBusinessMutation,
  useAddDocumentOnBusinessMutation,
  useBusinessDocumentsQuery,
} from "generated/graphql";
import { signOut } from "lib/auth";
import router from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import Link from "next/link";
import { BusinessHeader, BUSINESS_QUERY } from ".";
import BusinessLeftNavigation from "../../components/BusinessLeftNavigation";
import { gql } from "@apollo/client";
import Button from "components/Button";
import { ErrorNotification } from "components/ErrorNotification";
import { SuccessNotification } from "components/SuccessNotification";
import TextArea from "components/TextArea";
import Image from "next/image";
import toast from "react-hot-toast";

export const BUSINESS_DOCUMENTS_QUERY = gql`
  query businessDocuments($id: Int!, $documentType: String) {
    business(id: $id) {
      id
      name
      isValidated
      companyType
      documents(documentType: $documentType)
    }
  }
`;

const ADD_DOCUMENT_ON_BUSINESS_MUTATION = gql`
  mutation addDocumentOnBusiness(
    $addDocumentOnBusinessBusinessId: Int!
    $addDocumentOnBusinessFile: Upload!
    $addDocumentOnBusinessDocumentType: String
  ) {
    addDocumentOnBusiness(
      businessId: $addDocumentOnBusinessBusinessId
      file: $addDocumentOnBusinessFile
      documentType: $addDocumentOnBusinessDocumentType
    ) {
      id
      documents
    }
  }
`;

const DocumentHeader = ({ children, title }) => {
  return (
    <div className="col-span-3">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <div className="flex justify-center max-w-md px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
        {children}
      </div>
    </div>
  );
};

const DocumentInput = ({ documentType, title, state, setState, business }) => {
  const [
    addDocumentOnBusiness,
    {
      loading: addDocumentOnBusinessLoading,
      error: addDocumentOnBusinessError,
    },
  ] = useAddDocumentOnBusinessMutation({
    refetchQueries: [
      {
        query: BUSINESS_DOCUMENTS_QUERY,
        variables: {
          id: business.id,
        },
      },
    ],
  });
  const {
    data,
    loading: businessLoading,
    error,
  } = useBusinessDocumentsQuery({
    variables: { id: business?.id, documentType },
  });
  const [fileUrl, setFileUrl] = useState(null);
  if (addDocumentOnBusinessLoading || businessLoading)
    return (
      <DocumentHeader title={title}>
        <Loader />
      </DocumentHeader>
    );
  const doc = data?.business?.documents;
  if (doc.length === 0) {
    return (
      <DocumentHeader title={title}>
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
              htmlFor={"file-upload-" + documentType}
              className="relative font-medium text-orange-600 bg-white rounded-md cursor-pointer hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
            >
              <span>Télécharger un fichier</span>
              <input
                id={"file-upload-" + documentType}
                name={"file-upload-" + documentType}
                type="file"
                className="sr-only"
                onChange={async (event) => {
                  const file = event.target.files[0];
                  if (file) {
                    await addDocumentOnBusiness({
                      variables: {
                        addDocumentOnBusinessBusinessId: business.id,
                        addDocumentOnBusinessDocumentType: documentType,
                        addDocumentOnBusinessFile: event.target.files[0],
                      },
                    });
                    window.location.reload();
                  }
                }}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">Format PNG, JPG ou PDF.</p>
        </div>
      </DocumentHeader>
    );
  } else if (doc[0].status === "pending") {
    return (
      <DocumentHeader title={title}>
        <div className="space-y-1 text-center">
          <div className={`p-4 bg-blue-100 rounded-md`}>
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-blue-800"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  {doc[0].comment ||
                    "Votre document est en attente de validation"}
                </h3>
                {/* <div className="mt-2 text-sm text-green-700">
            <ul className="pl-5 space-y-1 list-disc">
              <li>Your password must be at least 8 characters</li>
              <li>
                Your password must include at least one pro wrestling finishing
                move
              </li>
            </ul>
          </div> */}
              </div>
            </div>
          </div>
          {/* <div className="flex justify-center text-sm text-gray-600">
            <label
              htmlFor={"file-upload-" + documentType}
              className="relative font-medium text-orange-600 bg-white rounded-md cursor-pointer hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
            >
              <span>Télécharger un nouveau fichier</span>
              <input
                id={"file-upload-" + documentType}
                name={"file-upload-" + documentType}
                type="file"
                className="sr-only"
                onChange={async (event) => {
                  const file = event.target.files[0];
                  if (file) {
                    await addDocumentOnBusiness({
                      variables: {
                        addDocumentOnBusinessBusinessId: business.id,
                        addDocumentOnBusinessDocumentType: documentType,
                        addDocumentOnBusinessFile: event.target.files[0],
                      },
                    });
                  }
                }}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">Format PNG, JPG ou PDF.</p> */}
        </div>
      </DocumentHeader>
    );
  } else if (doc[0].status === "invalid") {
    return (
      <DocumentHeader title={title}>
        <div className="space-y-1 text-center">
          <ErrorNotification error={doc[0].comment} />
          <div className="flex justify-center text-sm text-gray-600">
            <label
              htmlFor={"file-upload-" + documentType}
              className="relative font-medium text-orange-600 bg-white rounded-md cursor-pointer hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
            >
              <span>Télécharger un nouveau fichier</span>
              <input
                id={"file-upload-" + documentType}
                name={"file-upload-" + documentType}
                type="file"
                className="sr-only"
                onChange={async (event) => {
                  const file = event.target.files[0];
                  if (file) {
                    await addDocumentOnBusiness({
                      variables: {
                        addDocumentOnBusinessBusinessId: business.id,
                        addDocumentOnBusinessDocumentType: documentType,
                        addDocumentOnBusinessFile: event.target.files[0],
                      },
                    });
                    toast.success("Le document a été ajouté.");
                    window.location.reload();
                  }
                }}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">Format PNG, JPG ou PDF.</p>
        </div>
      </DocumentHeader>
    );
  }
  return (
    <DocumentHeader title={title}>
      <div className="space-y-1 text-center">
        <SuccessNotification message={"La pièce a été validée"} />
      </div>
    </DocumentHeader>
  );
};

const UnipersonnelleBusiness = ({ state, setState, business }) => {
  return (
    <>
      <DocumentInput
        business={business}
        state={state}
        setState={setState}
        title="Pièce d'identité"
        documentType="IDENTITY_PROOF"
      />
      <DocumentInput
        business={business}
        state={state}
        setState={setState}
        title="2e pièce d’identité (Passeport, carte ID, permis, carte vitale recto verso…)"
        documentType="DRIVER_LICENSE"
      />
      <DocumentInput
        business={business}
        state={state}
        setState={setState}
        title="RIB"
        documentType="BANK_DETAILS"
      />
      <DocumentInput
        business={business}
        state={state}
        setState={setState}
        title="Justificatif d’activité (document INSEE indiquant le numéro SIREN)"
        documentType="ACTIVITY_PROOF"
      />
    </>
  );
};
const NonUnipersonnelleBusiness = ({ state, setState, business }) => {
  return (
    <>
      <DocumentInput
        business={business}
        state={state}
        setState={setState}
        title="Pièce d'identité"
        documentType="IDENTITY_PROOF"
      />

      <DocumentInput
        business={business}
        state={state}
        setState={setState}
        title="RIB"
        documentType="BANK_DETAILS"
      />

      <DocumentInput
        business={business}
        state={state}
        setState={setState}
        title="Extrait KBIS"
        documentType="REGISTRATION_PROOF"
      />

      <DocumentInput
        business={business}
        state={state}
        setState={setState}
        title="Statuts"
        documentType="SHAREHOLDER_DECLARATION"
      />
    </>
  );
};

const BusinessBankPage = ({ business }) => {
  if (!business) return null;
  const [state, setState] = useState({
    ...business,
  });

  const [
    updateBusiness,
    { loading: updateBusinessLoading, error: updateBusinessError },
  ] = useUpdateBusinessMutation({
    refetchQueries: [
      {
        query: BUSINESS_QUERY,
        variables: {
          id: business.id,
        },
      },
    ],
  });
  return (
    <Container>
      <Section>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <BusinessLeftNavigation business={business} />
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Documents bancaire
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Ces documents sont obligatoire pour valider votre
                      établissement
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3">
                      <div>
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {!business.companyType && (
                            <span className="inline-block px-1 py-1 ml-auto mr-2 text-xs text-white bg-red-500 rounded-full"></span>
                          )}
                          Êtes-vous une :
                        </label>
                        <select
                          id="location"
                          name="location"
                          onChange={async (e) => {
                            if (
                              e.target.value === "unipersonnelle" ||
                              e.target.value === "non-unipersonnelle"
                            ) {
                              setState({
                                ...state,
                                companyType: e.target.value,
                              });
                              await updateBusiness({
                                variables: {
                                  updateBusinessId: business.id,
                                  updateBusinessCompanyType: e.target.value,
                                },
                              });
                              toast.success("Modification enregistrée.");
                            }
                          }}
                          value={state.companyType || ""}
                          className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value=""></option>
                          <option value="unipersonnelle">
                            Société unipersonnelle
                          </option>
                          <option value="non-unipersonnelle">
                            Société non-unipersonnelle
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {business.companyType &&
                    (state.companyType === "unipersonnelle" ? (
                      <UnipersonnelleBusiness
                        state={state}
                        business={business}
                        setState={setState}
                      />
                    ) : (
                      <NonUnipersonnelleBusiness
                        state={state}
                        setState={setState}
                        business={business}
                      />
                    ))}
                </div>
                <ErrorNotification
                  error={updateBusinessError && "Une erreur s'est produite"}
                />

                {/* <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <Button
                    loading={updateBusinessLoading}
                    onClick={async (e) => {
                      e.preventDefault();
                      await updateBusiness({
                        variables: {
                          updateBusinessId: business.id,
                          updateBusinessCompanyType: state.companyType,
                        },
                      });
                    }}
                  >
                    Enregistrer
                  </Button>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default function businessBank({ me }) {
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
  if (error) return <div>Une erreur s'est produite</div>;
  return (
    <>
      <main>
        <BusinessHeader business={data?.business} />
        <BusinessBankPage business={data?.business} />
      </main>
    </>
  );
}
