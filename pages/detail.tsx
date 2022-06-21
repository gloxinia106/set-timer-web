import { NextPage } from "next";
import Header from "../components/header";
import { SelectSet, SelectTimer } from "../components/timer";

const Detail: NextPage = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Header isGoBack title="팔굽혀펴기" />
      <div className="mt-16 mb-32 w-full flex flex-col items-center">
        <button className="w-full max-w-xl mx-auto fixed bg-blue-600 flex justify-center text-white font-medium text-lg shadow-md items-center p-3">
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
        <div className="mt-12 w-full flex flex-col items-center">
          {[1, 2, 3].map((value, index) => {
            return (
              <div
                key={index}
                className="mt-10 w-full px-4 py-6 shadow rounded-md"
              >
                <div className="flex pb-5 justify-between items-center border-b border-gray-600">
                  <span className="font-semibold">{index + 1} 세트</span>
                  <input
                    id="title"
                    placeholder="운동 상세정보를 입력해주세요"
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
                      type="checkbox"
                      id="default-toggle"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {true ? <SelectTimer /> : ""}
              </div>
            );
          })}
        </div>
      </div>
      <button className="w-full max-w-xl bottom-10 mx-auto fixed bg-blue-600 flex justify-center text-white font-medium text-lg shadow-md items-center p-3">
        <div>시작하기</div>
      </button>
    </div>
  );
};

export default Detail;
