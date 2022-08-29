import Link from "next/link";
import router, { useRouter } from "next/router";
import { useState } from "react";
import { signOut } from "../lib/auth";

type Page = {
  name: string;
  path: string;
};

type NavProps = {
  pages: Page[];
  me: any;
};

const NavItem = ({ page, index }) => {
  let isActualPage = function () {
    if (router.pathname === "/" || page?.path === "/") {
      return router?.pathname === page?.path;
    }
    return router?.pathname.startsWith(page?.path);
  };
  return (
    <Link href={page?.path} key={index}>
      <a
        className={`text-base font-medium   ${
          isActualPage()
            ? "text-OFLO_darkblue border-OFLO_pastel border-b-2"
            : "text-gray-500 hover:text-OFLO_darkblue hover:border-b-2 hover:border-OFLO_purple"
        }`}
        // className={`px-4 h-full flex items-center justify-center text-xs border-b-2 text-center cursor-pointer ${
        //   router?.pathname === page?.path
        //     ? "border-white text-white"
        //     : "border-transparent text-accents6"
        // } hover:text-white ease-in-out duration-300`}
      >
        {page?.name}
      </a>
    </Link>
  );
};

export default function NavBar({ pages, me }: NavProps) {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  return (
    <div className="relative bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex items-center justify-between py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <img
                className="w-auto h-8 sm:h-10"
                src="/logo.png"
                alt="logo Koopr"
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <button
              type="button"
              onClick={() => {
                setMenu(!menu);
              }}
              className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden space-x-10 md:flex">
            {pages.map((page, index) => (
              <NavItem page={page} index={index} key={index} />
            ))}
            {me && (
              <button
                className= "relative inline-flex justify-center px-4 py-2 text-sm font-medium text-OFLO_darkblue bg-OFLO_pastel border border-transparent rounded-md shadow-sm hover:bg-OFLO_purple hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-OFLO_purple"
                onClick={(e) => {
                  signOut();
                }}
              >
                Se déconnecter
              </button>
            )}
          </nav>
          {/* <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
            <a
              href="#"
              className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900"
            >
              Sign in
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700"
            >
              Sign up
            </a>
          </div> */}
        </div>
      </div>

      {menu && (
        <div
          onClick={() => {
            setMenu(!menu);
          }}
          className={`absolute inset-x-0 top-0 p-2 transition origin-top-right transform ${
            menu && "md:hidden"
          }`}
        >
          <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <img className="w-auto h-8 " src="/logo.png" alt="logo Koopr" />
                <div className="-mr-2">
                  <button
                    onClick={() => setMenu(!menu)}
                    type="button"
                    className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="px-5 py-6 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {pages.map((page, index) => (
                  <NavItem page={page} index={index} key={index} />
                ))}
                {me && (
                  <button
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    onClick={(e) => {
                      signOut();
                    }}
                  >
                    Se déconnecter
                  </button>
                )}
              </div>
              {/* <div>
                <a
                  href="#"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-base font-medium text-center text-gray-500">
                  Existing customer?
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
