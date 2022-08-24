import { useBusinessQuery } from "generated/graphql";
import Link from "next/link";
import router from "next/router";
import Loader from "./Loader";

const LeftNavigationItem = ({ page }) => {
  const selected = router.pathname === page.path;
  return (
    <Link href={page.path}>
      <a
        href="#"
        className={`flex items-center px-3 py-2 text-sm font-medium  rounded-md  group ${
          selected
            ? "text-darkblue bg-OFLO_pastel"
            : "text-gray-500 hover:text-white hover:bg-OFLO_purple "
        }`}
        aria-current="page"
      >
        <svg
          className={`flex-shrink-0 w-6 h-6 mr-3 -ml-1 ${
            selected
              ? "text-OFLO_darkblue"
              : "text-gray-500 group-hover:text-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {page.svgPath}
        </svg>

        <span className="truncate">{page.name}</span>
        {page.alert === true ? (
          <span className="inline-block px-1 py-1 ml-auto text-xs text-white bg-red-500 rounded-full"></span>
        ) : page.alert === false ? (
          <span className="inline-block px-1 py-1 ml-auto text-xs text-white bg-green-500 rounded-full"></span>
        ) : null}
      </a>
    </Link>
  );
};

export default function BusinessLeftNavigation({ business }) {
  const { data, loading: businessLoading } = useBusinessQuery({
    variables: { id: business?.id },
    fetchPolicy: "cache-and-network",
  });
  if (!business) return null;
  // if (businessLoading) return <Loader />;
  const leftNavigationPage = [
    {
      name: "Obligatoire",
      path: "/business",
      svgPath: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      alert:
        !business?.address || !business?.siret || !business?.name
          ? true
          : false ||
            business?.etActivity?.ActivityDescription?.Status != "valid",
    },
    {
      name: "Informations générales",
      path: "/business/informations",
      svgPath: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
        />
      ),
      alert:
        !business.logoUrl ||
        !business.backgroundImageUrl ||
        !business.description,
    },
    {
      name: "Documents bancaires",
      path: "/business/bank",
      svgPath: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      ),
      alert: business?.documents?.length < 4,
    },
    {
      name: "Mes services",
      path: "/business/service",
      svgPath: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      ),
    },
    {
      name: "Mes horaires",
      path: "/business/openingHours",
      svgPath: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      ),
    },
    {
      name: "Mes adresses",
      path: "/business/address",
      svgPath: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      ),
    },
    // {
    //   name: "Mes virements",
    //   path: "/business/transfer",
    //   svgPath: (
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="2"
    //       d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    //     />
    //   ),
    // },
    // {
    //   name: "Reglages",
    //   path: "/business/settings",
    //   svgPath: (
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="2"
    //       d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
    //     />
    //   ),
    // },
  ];
  return (
    <aside className="px-2 py-6 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
      <nav className="space-y-1">
        {leftNavigationPage.map((page, index) => (
          <LeftNavigationItem page={page} key={index} />
        ))}
      </nav>
    </aside>
  );
}
