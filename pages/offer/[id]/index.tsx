import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../../components/Container";
import Section from "../../../components/Section";
import Loader from "../../../components/Loader";
import { gql } from "@apollo/client";
import { Fragment } from "react";
import Link from "next/link";
import {
  useBusinessQuery,
  useOfferQuery,
  useUpdateOfferMutation,
} from "../../../generated/graphql";
import HorizontalNav from "../../../components/HorizontalNav";
import ActionBox from "../../../components/ActionBox";
import TextInput from "../../../components/TextInput";
import ImageInput from "../../../components/ImageInput";
import { displayDate, displayDateTime } from "../../../lib/displayDate";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PencilIcon,
  XIcon,
} from "@heroicons/react/solid";
import {
  displayPrice,
  displayPriceWithoutSign,
} from "../../../lib/displayPrice";
import {
  CursorClickIcon,
  ShoppingCartIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Button from "components/Button";
import { useToasts } from "react-toast-notifications";
import { Menu, Transition } from "@headlessui/react";
import { CgArrowRightR } from "react-icons/cg";
import moment from "moment";
import TextArea from "components/TextArea";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const OFFER_QUERY = gql`
  query offer($id: Int!) {
    offer(id: $id) {
      id
      name
      expireAt
      description
      quantity
      quantityLeft
      couponValidUntil
      couponCount
      isActive
      isDeleted
      price
      originalPrice
      discount
      imageUrl
      viewCount
      addToCartCount
      isFlagship
      isEvent
    }
  }
`;

const UPDATE_OFFER_QUERY = gql`
  mutation updateOffer($updateOfferId: Int!, $updateOfferIsActive: Boolean) {
    updateOffer(id: $updateOfferId, isActive: $updateOfferIsActive) {
      id
      isActive
    }
  }
`;

const OfferPage = ({ offer }) => {
  const [updateOffer, { loading: updateOfferLoading }] =
    useUpdateOfferMutation();
  const [state, setState] = useState({
    ...offer,
  });
  const { addToast } = useToasts();
  return (
    <main>
      <div className="py-5 ">
        <Container>
          <Link href="/offer">
            <span className="flex flex-row mb-2 -mt-2 font-medium text-OFLO_orange cursor-pointer hover:text-OFLO_darkblue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retourner à la liste des offres
            </span>
          </Link>
          <Section>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0 justify-center">
                <div className="flex flex-row items-center ">
                  <div
                    className={`rounded-full bg-gray-600 w-3 h-3 mr-2 ${
                      offer.isActive ? "bg-OFLO_pastel" : "bg-OFLO_orange"
                    } `}
                  />
                  {offer.isEvent && (
                    <h2 className="text-2xl font-bold uppercase leading-7 sm:text-3xl sm:truncate">
                      Bon plan / Événement : {offer.name}
                    </h2>
                  )}
                  {!offer.isEvent && !offer.isFlagship && (
                    <h2 className="text-2xl font-bold uppercase leading-7 sm:text-3xl sm:truncate">
                      Offre flash : {offer.name}
                    </h2>
                  )}
                  {offer.isFlagship && (
                    <h2 className="text-2xl font-bold uppercase leading-7 sm:text-3xl sm:truncate">
                      Offre Phare : {offer.name}
                    </h2>
                  )}
                </div>
                <div className="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                  <div className="flex items-center mt-2 text-sm text-black">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-black"
                      aria-hidden="true"
                    />
                    Crée le {displayDateTime(offer?.createdAt)}
                  </div>
                  <div className="flex items-center mt-2 text-sm text-black">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-black"
                      aria-hidden="true"
                    />
                    Expire le {displayDateTime(offer?.expireAt)}
                  </div>
                </div>
              </div>
              {!offer.isFlagship && (
                <div className="flex mt-5 lg:mt-0 lg:ml-4">
                  <span className="sm:ml-3">
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        let error = false;
                        if (moment(offer.expireAt).isBefore(new Date()))
                          error = true;
                        if (error) {
                          addToast(
                            "Cette offre a expirée, impossible de l'activer",
                            {
                              appearance: "error",
                            }
                          );
                          return;
                        }
                        await updateOffer({
                          variables: {
                            updateOfferId: offer.id,
                            updateOfferIsActive: !offer.isActive,
                          },
                        });
                        addToast("Modification effectuée", {
                          appearance: "success",
                        });
                      }}
                      className={`${
                        offer.isActive
                          ? "bg-OFLO_orange hover:bg-red-500"
                          : "bg-OFLO_pastel text-OFLO_darkblue hover:bg-green-500"
                      } inline-flex items-center px-4 py-2 text-sm font-medium text-white  border border-transparent rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500`}
                    >
                      {offer.isActive ? (
                        <XIcon
                          className="w-5 h-5 mr-2 -ml-1"
                          aria-hidden="true"
                        />
                      ) : (
                        <CheckIcon
                          className="w-5 h-5 mr-2 -ml-1"
                          aria-hidden="true"
                        />
                      )}
                      {offer.isActive ? "Désactiver l'offre" : "Activer l'offre"}
                    </button>
                  </span>
                </div>
              )}
            </div>
          </Section>
        </Container>
        <Container>
          <Section>
            <div className="flex flex-col justify-between w-full pb-4 border-accents3 sm:flex-row">
                <div>
                  <p className="text-xl">Quantité vendue {offer.isFlagship && "aujourd'hui"}</p>
                  <p className="text-xl text-center">
                    {offer.quantity - offer?.quantityLeft} / {offer?.quantity}
                  </p>
                </div>
              </div>
            <div className="flex border-b border-black mr-4 justify-center pb-4">
              <img
                src={offer?.imageUrl}
                alt="Photo de l'offre"
                width={256}
                height={256}
                className="object-contain rounded max-h-64"
              />
            </div>
            <div className="mt-4">
              <dl className="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative px-4 pt-5 overflow-hidden bg-white rounded-lg shadow hover:shadow-lg sm:pt-6 sm:px-6">
                  <dt>
                    <div className="absolute p-3 bg-OFLO_purple rounded-md">
                      <CursorClickIcon className="w-6 h-6 text-white" />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      Nombre de click sur l'offre
                    </p>
                  </dt>
                  <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {offer.viewCount}
                    </p>
                    {/* <p className="flex items-baseline ml-2 text-sm font-semibold text-green-600">
                      <svg
                        className="self-center flex-shrink-0 w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Increased by</span>
                      122
                    </p> */}
                    {/* <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6">
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all
                          <span className="sr-only">
                            {" "}
                            Total Subscribers stats
                          </span>
                        </a>
                      </div>
                    </div> */}
                  </dd>
                </div>

                <div className="relative px-4 pt-5 overflow-hidden bg-white rounded-lg hover:shadow-lg shadow sm:pt-6 sm:px-6">
                  <dt>
                    <div className="absolute p-3 bg-OFLO_purple rounded-md">
                      <ShoppingCartIcon className="w-6 h-6 text-white" />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      Nombre d'ajout au panier
                    </p>
                  </dt>
                  <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {offer?.addToCartCount}
                    </p>
                    {/* <p className="flex items-baseline ml-2 text-sm font-semibold text-green-600">
                      <svg
                        className="self-center flex-shrink-0 w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Increased by</span>
                      5.4%
                    </p> */}
                    {/* <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6">
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all
                          <span className="sr-only"> Avg. Open Rate stats</span>
                        </a>
                      </div>
                    </div> */}
                  </dd>
                </div>

                <div className="relative px-4 pt-5 overflow-hidden bg-white rounded-lg hover:shadow-lg shadow sm:pt-6 sm:px-6">
                  <dt>
                    <div className="absolute p-3 bg-OFLO_purple rounded-md">
                      <CurrencyEuroIcon className="w-6 h-6 text-white" />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      Nombre d'achat
                    </p>
                  </dt>
                  <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {offer.isFlagship
                        ? offer.couponCount
                        : offer.quantity - offer.quantityLeft}
                    </p>
                    {/* <p className="flex items-baseline ml-2 text-sm font-semibold text-red-600">
                      <svg
                        className="self-center flex-shrink-0 w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Decreased by</span>
                      3.2%
                    </p> */}
                    {/* <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6">
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all
                          <span className="sr-only">
                            {" "}
                            Avg. Click Rate stats
                          </span>
                        </a>
                      </div>
                    </div> */}
                  </dd>
                </div>
              </dl>
            </div>
          </Section>
          <div className="flex w-full">
            {/* <HorizontalNav
              pages={[
                {
                  name: "Général",
                  path: "/offer/" + offer.id,
                },
              ]}
            /> */}
            <div className="w-full">
              <Section>
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-3">
                    <TextInput
                      onChange={() => {}}
                      label="Nom"
                      value={offer.name}
                      disabled={true}
                    />
                  </div>
                  <div className="col-span-3">
                    <TextArea
                      onChange={() => {}}
                      label="Description"
                      value={offer.description}
                      disabled={true}
                    />
                  </div>
                  <div className="col-span-2">
                    <TextInput
                      onChange={() => {}}
                      label="Expire le"
                      disabled={true}
                      value={displayDateTime(state?.expireAt)}
                    />
                  </div>
                  {offer.isEvent === false && (
                    <>
                      <div className="col-span-2">
                        <TextInput
                          onChange={() => {}}
                          label="Quantité"
                          disabled={true}
                          value={offer.quantity}
                        />
                      </div>
                      <div className="col-span-2">
                        <TextInput
                          onChange={() => {}}
                          label="Prix de base (€)"
                          value={displayPriceWithoutSign(offer.originalPrice)}
                          disabled={true}
                        />
                      </div>
                      <div className="col-span-2">
                        <TextInput
                          onChange={() => {}}
                          label="Réduction (%)"
                          value={offer.discount}
                          disabled={true}
                        />
                      </div>
                      <div className="col-span-2">
                        <TextInput
                          onChange={() => {}}
                          label="Prix du coupon (€)"
                          disabled={true}
                          value={displayPriceWithoutSign(offer.price)}
                        />
                      </div>
                      <div className="col-span-2">
                        <TextInput
                          onChange={() => {}}
                          label="Coupon valide pendant (jours) après achat"
                          disabled={true}
                          value={state?.couponValidUntil}
                        />
                      </div>
                    </>
                  )}
                </div>
              </Section>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default function offer({ me }) {
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
  const { data, loading, error } = useOfferQuery({
    variables: { id: parseInt(id as string) },
  });
  if (loading) return <Loader />;
  return <OfferPage offer={data?.offer} />;
}
