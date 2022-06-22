import { useRouter } from "next/router";

interface HeaderProps {
  isGoBack?: boolean;
  title?: string;
}

export default function Header({ title, isGoBack }: HeaderProps) {
  const router = useRouter();
  return (
    <div className="bg-sky-400 w-full h-12 max-w-xl text-lg px-3 font-medium fixed text-white border-b top-0 flex justify-between items-center">
      {isGoBack ? (
        <button onClick={() => router.back()}>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        ""
      )}
      <div className="font-semibold">{title}</div>
      <div></div>
    </div>
  );
}
