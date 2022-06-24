import { del, get, set, values } from "idb-keyval";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { DeleteBtn } from "../components/btn";
import Header from "../components/header";
import { HomeExercisObj } from "../interface";

const Home: NextPage = () => {
  const [exrArray, setExrArray] = useState<HomeExercisObj[]>();
  useEffect(() => {
    values().then((value) => setExrArray(value));
  }, [exrArray]);

  const router = useRouter();

  const handelBtn = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    const tempArray = exrArray?.filter((_, index) => index !== +id);
    // console.log(tempArray);
    // setExrArray(tempArray);
    console.log(id);
    del(id);
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
                    <span className="font-semibold">
                      {value.values[0].title}
                    </span>
                    <span className="text-sm">{value.values.length}세트</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span>
                      휴식시간 {value.values[0].breakMin}분{" "}
                      {value.values[0].breakSec}초
                    </span>
                  </div>
                  <DeleteBtn handelBtn={handelBtn} id={value.id} />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Home;
