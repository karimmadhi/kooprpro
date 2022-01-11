import Link from "next/link";
import { useRouter } from "next/router";
import Container from "./Container";

type Page = {
  name: string;
  path: string;
};

type NavProps = {
  pages: Page[];
};

export default function HorizontalNav({ pages }: NavProps) {
  const router = useRouter();
  return (
    <div className="flex-row w-80">
      {pages?.map((page, index) => {
        return (
          <Link href={page?.path} key={index}>
            <div
              className={`w-full py-3 text-sm cursor-pointer select-none ${
                router.asPath === page?.path
                  ? "font-medium text-white"
                  : " font-light text-accents6"
              } hover:text-white ease-in-out duration-200`}
            >
              {page?.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
