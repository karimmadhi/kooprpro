import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import SearchInput from "../components/SearchInput";
import Loader from "../components/Loader";
import Section from "../components/Section";
import { Table } from "../components/Table";
import {
  CursorClickIcon,
  ShoppingCartIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/outline";
import { gql } from "@apollo/client";
import { useBusinessDashboardQuery } from "generated/graphql";
import ChangePeriod from "../components/ChangePeriod";
import moment from "moment";
import { displayPrice } from "lib/displayPrice";
import DownloadCSVButton from "components/DownloadCSVButton";
import { displayDateTime } from "lib/displayDate";
import { ErrorNotification } from "components/ErrorNotification";
import { DuplicateIcon } from "@heroicons/react/solid";

const BUSINESS_DASHBOARD_QUERY = gql`
  query businessDashboard($id: Int!, $from: date, $to: date) {
    business(id: $id) {
      id
      name
      viewCount
      addToCartCount(from: $from, to: $to)
      offersViewCount(from: $from, to: $to)
      ordersCount(from: $from, to: $to)
      ordersAmount(from: $from, to: $to)
      averageOrderAmount(from: $from, to: $to)
      offers {
        id
      }
      orderDetails(from: $from, to: $to) {
        id
        createdAt
        updatedAt
        virAmount
        amount
        FTUAmount
        kooprFees
        etFees
        order {
          id
          uid
          status
          etTotalFees
          kooprTotalFees
        }
      }
    }
  }
`;

export default function Home({ me }) {
  useEffect(() => {
    if (!me) {
      router.replace("/signin");
    } else if (!me?.business?.isValidated) {
      router.replace("/business");
    }
  });
  if (!me || !me?.business) return <Loader />;
  const [start, setStart] = useState(moment().startOf("month").toDate());
  const [end, setEnd] = useState(moment().endOf("month").toDate());
  const { data, loading, error } = useBusinessDashboardQuery({
    variables: {
      id: me?.business?.id,
      from: start,
      to: end,
    },
  });
  function dataToExport(orders) {
    let res = [];
    for (const order of orders) {
      res.push({
        "n°": order.order.uid,
        "crée lé": displayDateTime(order.order.createdAt),
        "payé le": displayDateTime(order.order.updatedAt),
        statut: order.order.status === "paid" ? "payé" : order.order.status,
        montant: displayPrice(order.virAmount),
      });
    }
    return res;
  }
  return (
    <main>
      <div className="py-10">
        <Container>
          <Section>
            <h2 className="h-1 text-OFLO_orange font-bold uppercase text-center title is-2">{me?.business?.name}</h2>
            <div className="mt-4">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                {/* <Link href="/offer">
                  <div className="flex items-center justify-end space-x-2 cursor-pointer">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-500">
                      {data?.business?.offers.length} offres
                    </span>
                  </div>
                </Link> */}
              </div>
            </div>
          </Section>
        </Container>
        <Container>
          <Section>
            <div className="flex flex-row items-center justify-between w-full">
              <ChangePeriod
                loading={loading}
                start={start}
                end={end}
                setStart={setStart}
                setEnd={setEnd}
              />
              <div>
                <DownloadCSVButton
                  data={
                    data?.business?.orderDetails &&
                    dataToExport(data?.business?.orderDetails)
                  }
                  filename={"export_commandes_" + start + "-" + end + ".csv"}
                />
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative px-4 pt-5 overflow-hidden bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl sm:pt-6 sm:px-6">
                <dt>
                  <div className="absolute p-3 bg-OFLO_purple rounded-md">
                    <CursorClickIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    Nombre de click sur les offres
                  </p>
                </dt>
                <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {data?.business?.offersViewCount || 0}
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

              <div className="relative px-4 pt-5 overflow-hidden bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl sm:pt-6 sm:px-6">
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
                    {data?.business?.addToCartCount || 0}
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

              <div className="relative px-4 pt-5 overflow-hidden bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl sm:pt-6 sm:px-6">
                <dt>
                  <div className="absolute p-3 bg-OFLO_purple rounded-md">
                    <CurrencyEuroIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    Nombre de vente
                  </p>
                </dt>
                <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {data?.business?.ordersCount || 0}
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
              <div className="relative px-4 pt-5 overflow-hidden bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl sm:pt-6 sm:px-6">
                <dt>
                  <div className="absolute p-3 bg-OFLO_purple rounded-md">
                    <CurrencyEuroIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    Montant des ventes
                  </p>
                </dt>
                <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {displayPrice(data?.business?.ordersAmount) || 0}
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
              <div className="relative px-4 pt-5 overflow-hidden bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl sm:pt-6 sm:px-6">
                <dt>
                  <div className="absolute p-3 bg-OFLO_purple rounded-md">
                    <DuplicateIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    Panier moyen
                  </p>
                </dt>
                <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {displayPrice(data?.business?.averageOrderAmount || 0)}
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
            </dl>
            <div className="mt-4">
              {!loading && !data && error && (
                <ErrorNotification
                  error={
                    "Une erreur s'est produite. Impossible de charger les données"
                  }
                />
              )}
            </div>
            <div className="pt-10">
              <h2>Mes ventes du mois</h2>
            </div>
            <Table
              data={data?.business?.orderDetails}
              loading="Chargement"
              onRowClick={(orderDetail) => {
                router.push("/order/" + orderDetail?.id);
              }}
              columns={[
                { value: "N°", key: "id" },
                { value: "Crée le", key: "createdAt" },
                { value: "Montant", key: "virAmount" },
                { value: "status", key: "status" },
              ]}
              renderProperty={{
                id: (orderDetail) => <>{orderDetail.order.uid}</>,
                virAmount: (order) => <>{displayPrice(order.virAmount)}</>,
                createdAt: (order) => (
                  <>{moment(new Date(order?.createdAt)).format("lll")}</>
                ),
                updatedAt: (order) => (
                  <>{moment(new Date(order?.updatedAt)).format("lll")}</>
                ),
                status: (order) => (
                  <div className="flex flex-row items-center justify-start">
                    <p>
                      {order?.order.status === "paid"
                        ? "Payé"
                        : order?.order.status}
                    </p>
                    <div
                      className={`rounded-full bg-gray-600 w-3 h-3 ml-6 ${
                        order?.order.status === "paid"
                          ? "bg-success"
                          : "bg-error"
                      } `}
                    />
                  </div>
                ),
              }}
            />
          </Section>
        </Container>
      </div>
    </main>
  );
}
