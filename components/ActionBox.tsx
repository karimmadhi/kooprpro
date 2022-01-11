import { useRouter } from "next/router";
import Button from "./Button";

type ActionBoxProps = {
  title: string;
  description?: string;
  infoText?: string;
  buttonText?: string;
  onClick?: () => void;
  loading?: boolean;
  hideFooter?: boolean;
  children?: React.ReactNode;
};

export default function ActionBox({
  title,
  description,
  infoText,
  buttonText = "Enregistrer",
  onClick,
  loading,
  hideFooter = false,
  children,
}: ActionBoxProps) {
  return (
    <div className="flex flex-col justify-between box">
      <div className="h-full px-6 py-5">
        <h3>{title}</h3>
        <p className="py-3 ">{description}</p>
        {children}
      </div>
      {!hideFooter && (
        <div className="border-t  flex flex-col md:flex-row justify-between items-center px-6 py-2.5 md:py-1">
          {infoText && <p className="py-2">{infoText}</p>}
          {onClick && (
            <div className="py-2">
              <Button loading={loading} onClick={() => onClick()}>
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
