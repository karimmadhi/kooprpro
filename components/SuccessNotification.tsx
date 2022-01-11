export const SuccessNotification = ({
  message,
  className,
}: {
  message: string | null;
  className?: string;
}) => {
  if (!message) return null;
  return (
    <div className={`p-4 bg-green-100 rounded-md ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-green-800"
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
          <h3 className="text-sm font-medium text-green-800">{message}</h3>
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
  );
};
