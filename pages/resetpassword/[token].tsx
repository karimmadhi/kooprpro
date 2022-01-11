import { Space } from "@theboringcode/react-components";
import { useState } from "react";
import { validateEmail } from "../../lib/validateEmail";
import { useResetPasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import Button from "../../components/Button";
import { ErrorNotification } from "components/ErrorNotification";
import TextInput from "components/TextInput";
import Link from "next/link";

export default function resetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [
    resetPassword,
    { loading, error: errorResetPassword },
  ] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  return (
    <div className="w-full mt-12 font-sans antialiased bg-twhite text-tblack">
      <div className="container flex justify-center px-4 pt-4 mx-auto lg:max-w-xl md:px-6 md:pt-6">
        <Space size={4} />
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-3xl font-bold text-center">
            Créer un nouveau mot de passe
          </h1>
          <Space />
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Mot de passe"
            type="password"
            inputMode="text"
            error={error}
          />
          <TextInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirmer votre mot de passe"
            type="password"
            inputMode="text"
            error={error}
          />
          <ErrorNotification
            className="mt-4"
            error={
              errorResetPassword &&
              "Impossible de réinitialiser le mot de passe"
            }
          />
          <div className="flex justify-center mt-4">
            <Button
              loading={loading}
              onClick={async () => {
                setError(false);
                if (
                  !password ||
                  !confirmPassword ||
                  password != confirmPassword
                ) {
                  setError(true);
                  return;
                }
                try {
                  await resetPassword({
                    variables: {
                      password,
                      resetPasswordToken: token as string,
                    },
                  });
                  setPassword("");
                  setConfirmPassword("");
                  router.push("/");
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Changer mon mot de passe
            </Button>
          </div>
        </form>
      </div>

      <div className="container flex justify-center px-4 pt-4 mx-auto lg:max-w-xl md:px-6 md:pt-6">
        <div>
          <div className="w-full mt-8 border-b border-gray-300"></div>
          <div className="pt-8 text-center">
            <p className="font-extrabold">Retour à la page de connexion</p>
          </div>
          <Link href="/signin">
            <div className="flex items-center justify-center w-1/2 h-12 mx-auto my-5 border-2 border-gray-600 rounded-full cursor-pointer">
              <a className="text-xs font-bold uppercase ">Connexion</a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
