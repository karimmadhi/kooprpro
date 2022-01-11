export default function Container({ children }) {
  return (
    <div className="w-full mx-auto md:max-w-screen-lg h-full px-5">
      {children}
    </div>
  );
}
