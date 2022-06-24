import { keys, set } from "idb-keyval";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import Header from "../components/header";
import { SelectSet, SelectTimer } from "../components/timer";
import { ExerciseObj } from "../interface";

const WriteHome: NextPage = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>("");
  const [exrNumber, setExrNumber] = useState<string>("1");
  const [breakMin, setBreakMin] = useState<string>("0");
  const [breakSec, setBreakSec] = useState<string>("0");

  const handleBtn = () => {
    if (!title) {
      inputRef.current?.focus();
      return;
    }
    keys()
      .then((values: IDBValidKey[]) => {
        let newValue = [...Array(+exrNumber).keys()].map((_, index) => ({
          id: index,
          title,
          subTitle: "",
          breakMin,
          breakSec,
        }));
        set(values.length, { id: values.length, values: newValue });
      })
      .finally(() => {
        router.push("/");
      });
  };
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <Header title="새 운동 프리셋 만들기" isGoBack />
      <div className="mt-20 w-full px-4 py-6 shadow rounded-md">
        <div className="flex pb-5 justify-between items-center border-b border-gray-600">
          <label htmlFor="title" className="font-semibold">
            운동 프리셋 제목
          </label>
          <input
            id="title"
            ref={inputRef}
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
            className="w-1/2 focus:outline-none border rounded p-2"
          />
        </div>
        <div className="py-6 border-b border-gray-600">
          <span className="font-semibold mb-3">세트 수</span>
          <SelectSet setExrNumber={setExrNumber} />
        </div>
        <div className="py-6">
          <span className="font-semibold mb-3">휴식시간</span>
          <SelectTimer setMin={setBreakMin} setSec={setBreakSec} />
        </div>
      </div>
      <button
        onClick={handleBtn}
        className="bg-blue-500 rounded mt-10 w-1/3 text-lg py-3 px-2 font-semibold text-white"
      >
        저장하기
      </button>
    </div>
  );
};

export default WriteHome;
