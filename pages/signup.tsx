import { gql } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import Section from "../components/Section";
import { useSignUpMutation } from "../generated/graphql";
import { saveToken } from "../lib/auth";
import TextInput from "../components/TextInput";
import { ErrorNotification } from "../components/ErrorNotification";

const SIGN_UP_MUTATION = gql`
  mutation signUp(
    $signUpEmail: String!
    $signUpPassword: String!
    $signUpFirstName: String
    $signUpLastName: String
    $signUpPhone: String
  ) {
    signUp(
      email: $signUpEmail
      password: $signUpPassword
      firstName: $signUpFirstName
      lastName: $signUpLastName
      phone: $signUpPhone
      type: "owner"
    ) {
      token
      user {
        id
      }
    }
  }
`;

export default function signUp({ me }) {
  const router = useRouter();
  const [signUp, { loading, error }] = useSignUpMutation();
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState<any>();
  useEffect(() => {
    if (me?.id) {
      router.push("/");
    }
  });
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="w-auto h-12 mx-auto"
            src="/logo.png"
            alt="logo koopr"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-center">
            S'inscrire en tant que professionnel
          </h2>
        </div>
        <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm ">
            <div>
              <TextInput
                label="Adresse email"
                onChange={(e) => setState({ ...state, email: e.target.value })}
                value={state.email}
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                disabled={false}
                required={true}
                error={errors?.email}
              />
            </div>
            <div className="mt-2">
              <TextInput
                label="Mot de passe"
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                value={state.password}
                type="password"
                disabled={false}
                autoComplete="new-password"
                name="password"
                required={true}
                error={errors?.password}
              />
            </div>
            <div className="mt-2">
              <TextInput
                label="Confirmation de mot de passe"
                onChange={(e) =>
                  setState({ ...state, confirmPassword: e.target.value })
                }
                value={state.confirmPassword}
                type="password"
                disabled={false}
                autoComplete="new-password"
                name="password"
                required={true}
                error={errors?.confirmPassword}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 mt-2 mb-2 gap-x-6 gap-y-2">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                label="Prénom"
                onChange={(e) =>
                  setState({ ...state, firstName: e.target.value })
                }
                value={state.firstName}
                type="text"
                disabled={false}
                autoComplete="given-name"
                required={true}
                error={errors?.firstName}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                label="Nom"
                onChange={(e) =>
                  setState({ ...state, lastName: e.target.value })
                }
                value={state.lastName}
                type="text"
                disabled={false}
                autoComplete="family-name"
                required={true}
                error={errors?.lastName}
              />
            </div>
          </div>
          <ErrorNotification
            className="mt-4"
            error={error && "Impossible de créer le compte"}
          />
          <div className="flex items-center justify-center mt-4">
            <Button
              loading={loading}
              onClick={async () => {
                setErrors({});
                let errorsState: any = {};
                if (!state.email) {
                  errorsState.email = true;
                }
                if (!state.password) {
                  errorsState.password = true;
                }
                if (!state.confirmPassword) {
                  errorsState.confirmPassword = true;
                }
                if (state.password != state.confirmPassword) {
                  errorsState.passsword = true;
                  errorsState.confirmPassword = true;
                }
                if (!state.firstName) {
                  errorsState.firstName = true;
                }
                if (!state.lastName) {
                  errorsState.lastName = true;
                }

                if (Object.keys(errorsState).length > 0) {
                  setErrors(errorsState);
                  return;
                }

                try {
                  const { data, errors } = await signUp({
                    variables: {
                      signUpEmail: state.email,
                      signUpPassword: state.password,
                      signUpFirstName: state.firstName,
                      signUpLastName: state.lastName,
                      // signUpPhone: state.phone,
                    },
                  });
                  if (data.signUp.token) {
                    saveToken(data?.signUp?.token);
                    localStorage.setItem("token", data?.signUp?.token);
                    window.location.reload();
                  }
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Créer son compte professionnel
            </Button>
          </div>
        </form>
        <div className="w-full my-4 border-b border-gray-300"></div>
        <div className="text-center ">
          <p className="font-extrabold">Retour à la page de connexion</p>
        </div>
        <Link href="/signin">
          <div className="flex items-center justify-center w-1/2 h-12 mx-auto border-2 border-gray-600 rounded-full cursor-pointer ">
            <a className="text-xs font-bold uppercase ">Connexion</a>
          </div>
        </Link>
      </div>
    </div>
  );
}
