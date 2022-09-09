import { TextInput, Space } from "@theboringcode/react-components";
import { useState } from "react";
import { validateEmail } from "../lib/validateEmail";
import { useForgotPasswordMutation } from "../generated/graphql";
import Link from "next/link";
import gql from "graphql-tag";
import Button from "../components/Button";

export default function forgotPassword() {
  const [useForgotPassword, { loading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  if (success) {
    return (
      <div className="w-full mt-12 font-sans antialiased bg-twhite text-tblack">
        <div className="container flex justify-center px-4 pt-4 mx-auto lg:max-w-xl md:px-6 md:pt-6">
          <Space size={4} />
          <div>
            <h1 className="text-2xl font-bold">Vérifiez vos emails</h1>
            <p className="mt-4 mb-4">
              Si vous avez un compte avec {email}, vous allez recevoir un email
              avec un lien de réinitialisation de mot de passe
            </p>
            <a
              className="font-bold text-OFLO_darkblue hover:text-OFLO_purple cursor-pointer"
              onClick={() => {
                setSuccess(false);
                setEmail("");
              }}
            >
              Vous n'avez pas reçu l'email ? Réessayer
            </a>
            <div className="w-full mt-8 border-b border-gray-300"></div>
            <div className="pt-8 text-center">
              <p className="font-extrabold">Retour à la page de connexion</p>
            </div>
            <Link href="/signin">
              <div className="flex items-center justify-center w-1/2 h-12 mx-auto my-5 bg-OFLO_pastel text-OFLO_darkblue hover:bg-OFLO_purple hover:text-white rounded-full cursor-pointer">
                <a className="text-xs font-bold uppercase ">Connexion</a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full mt-12 font-sans antialiased bg-twhite text-tblack">
      <div className="container flex justify-center px-4 pt-4 mx-auto lg:max-w-xl md:px-6 md:pt-6">
        <Space size={4} />
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-3xl font-bold text-center">
              Réinitialiser votre mot de passe
            </h2>
            <h3>
              Nous vous enverrons un lien de réinitalisation à votre adresse
              email.
            </h3>
            <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Si vous vous êtes connectés via une connexion sociale, il
                    n'est pas possible de réinitialiser votre mot de passe.
                  </p>
                </div>
              </div>
            </div>

            <Space />
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Adresse email"
              type="email"
              inputMode="email"
              error={error}
              disabled={false}
            />
            <Space />
            <div className="flex justify-center">
              <Button
                loading={loading}
                onClick={async () => {
                  setError(false);
                  if (!email || !validateEmail(email)) {
                    setError(true);
                    return;
                  }
                  setSuccess(true);
                  try {
                    await useForgotPassword({ variables: { email } });
                  } catch (e) {}
                }}
              >
                Envoyer le lien
              </Button>
            </div>
          </form>
          <div className="w-full mt-8 border-b border-gray-300"></div>
          <div className="pt-8 text-center">
            <p className="font-extrabold">Retour à la page de connexion</p>
          </div>
          <Link href="/signin">
            <div className="flex items-center justify-center w-1/2 h-12 mx-auto my-5 bg-OFLO_pastel text-OFLO_darkblue hover:bg-OFLO_purple hover:text-white rounded-full cursor-pointer">
              <a className="text-xs font-bold uppercase ">Connexion</a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
