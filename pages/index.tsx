import { get, set } from "idb-keyval";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/header";
import { ExerciseObj } from "../interface";

const Home: NextPage = () => {
  const [exrArray, setExrArray] = useState<ExerciseObj[][] | []>();
  useEffect(() => {
    get("exercise").then((value) => setExrArray(value));
  }, [exrArray]);

  const router = useRouter();

  const handelBtn = (paramIndex: number) => {
    console.log(paramIndex);
    const tempArray = exrArray?.filter((_, index) => index !== paramIndex);
    setExrArray(tempArray);
    set("exercise", tempArray);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Header />
      <div className="my-20 w-full flex flex-col items-center">
        <button
          onClick={() => router.push("/write")}
          className="w-11/12 bg-blue-600 flex justify-center text-white font-medium text-lg rounded shadow-md items-center p-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <div>운동 프리셋 추가</div>
        </button>
        {exrArray
          ? exrArray.map((value, index) => {
              return (
                <div
                  onClick={() => {
                    router.push(`/detail?id=${index}`);
                  }}
                  key={index}
                  className="mt-5 cursor-pointer shadow-lg rounded w-10/12 flex justify-between px-3 py-5"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">{value[0]["title"]}</span>
                    <span className="text-sm">{value[0]["exrNumber"]}세트</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>
                      휴식시간 {value[0]["breakMin"]}분 {value[0]["breakSec"]}초
                    </span>
                    <span>
                      운동시간 {value[0]["exrMin"]}분 {value[0]["exrSec"]}초
                    </span>
                  </div>
                  <button
                    onClick={() => handelBtn(index)}
                    className="bg-red-500 text-white rounded-full flex justify-center items-center w-12"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Home;
