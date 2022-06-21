import { NextPage } from "next";
import { useState } from "react";
import Header from "../components/header";
import { SelectSet, SelectTimer } from "../components/timer";

const WriteHome: NextPage = () => {
  const [isExercise, setIsExercise] = useState<boolean>(false);
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
            required
            className="w-1/2 focus:outline-none border rounded p-2"
          />
        </div>
        <div className="py-6 border-b border-gray-600">
          <span className="font-semibold mb-3">세트 수</span>
          <SelectSet />
        </div>
        <div className="py-6 border-b border-gray-600">
          <span className="font-semibold mb-3">휴식시간</span>
          <SelectTimer />
        </div>
        <div className="flex justify-between items-center py-6">
          <span className="font-semibold">운동시간</span>
          <label
            htmlFor="default-toggle"
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              onChange={() => {
                setIsExercise(!isExercise);
              }}
              type="checkbox"
              id="default-toggle"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        {isExercise ? <SelectTimer /> : ""}
      </div>
      <button className="bg-blue-500 rounded mt-10 w-1/3 text-lg py-3 px-2 font-semibold text-white">
        저장하기
      </button>
    </div>
  );
};

export default WriteHome;