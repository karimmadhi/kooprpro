import { gql } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import Section from "../components/Section";
import { useSignInMutation } from "../generated/graphql";
import { saveToken } from "../lib/auth";
import TextInput from "../components/TextInput";
import { ErrorNotification } from "../components/ErrorNotification";
import { AuthContext } from "../lib/AuthProvider";
import { ME_QUERY } from "lib/checkLoggedIn";
import toast, { Toaster } from "react-hot-toast";

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        isOwner
      }
    }
  }
`;

export default function signIn({ me }) {
  const router = useRouter();
  useEffect(() => {
    if (me?.business === null) {
      router.replace("/createBusiness");
    } else if (me?.business?.isValidated === false) {
      router.replace("/business");
    } else if (me?.business?.isValidated) {
      router.replace("/business");
    }
  });
  const [signIn, { loading, error, client }] = useSignInMutation({
    refetchQueries: [{ query: ME_QUERY }],
    fetchPolicy: "no-cache",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="w-auto h-12 mx-auto" src="/logo.png" alt="logo Koopr" />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Espace professionnel
        </h2>
      </div>
      <div className="mx-2 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse email
              </label>
              <div className="mt-1">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a
                  href="/forgotpassword"
                  className="font-medium text-OFLO_darkblue hover:text-OFLO_purple"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
            <ErrorNotification
              error={error && "L'authentification a échouée."}
            />
            <div>
              <Button
                loading={loading}
                onClick={async (e) => {
                  e.preventDefault();
                  const { data, errors } = await signIn({
                    variables: {
                      email,
                      password,
                    },
                  });
                  if (data?.signIn?.user?.isOwner === false) {
                    toast.error(
                      "Vous n'avez pas accès à l'interface professionnelle Koopr"
                    );
                    return;
                  }
                  if (data.signIn.token) {
                    localStorage.setItem("token", data?.signIn?.token);
                    saveToken(data?.signIn?.token);
                    client.reFetchObservableQueries();
                    router.push("/business");
                    window.location.reload();
                  } else {
                    toast.error("L'authentification a échouée.");
                  }
                }}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-OFLO_darkblue border bg-OFLO_pastel border-transparent rounded-md shadow-sm hover:text-white hover:bg-OFLO_purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Se connecter
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">Ou</span>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="/signup"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-OFLO_darkblue bg-OFLO_pastel border border-transparent rounded-md shadow-sm hover:bg-OFLO_purple hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Créer un compte professionnel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
