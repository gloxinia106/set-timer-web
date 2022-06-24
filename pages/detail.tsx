import { get, update } from "idb-keyval";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Header from "../components/header";
import { SelectTimer } from "../components/timer";
import { DeleteBtn } from "../components/btn";
import { ExerciseObj, HomeExercisObj } from "../interface";

const Detail: NextPage = () => {
  const router = useRouter();
  const [parentIndex, setParentIndex] = useState<string>("");
  const [detailArray, setDetailArray] = useState<ExerciseObj[]>();
  useEffect(() => {
    const id = router.query["id"];
    if (id) {
      get(+id).then((value: HomeExercisObj) => {
        setDetailArray(value.values);
        if (typeof id === "string") {
          setParentIndex(id);
        }
      });
    }
  }, [parentIndex, router]);

  const handleAddBtn = () => {
    if (detailArray) {
      const initExercise = {
        id: detailArray.length,
        title: detailArray[0].title,
        subTitle: "",
        breakMin: "0",
        breakSec: "0",
      };
      update(+parentIndex, (value) => {
        value.values.push(initExercise);
        return value;
      });
      setDetailArray([...detailArray, initExercise]);
    }
  };

  const handelDeleteBtn = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    update(+parentIndex, (value) => {
      value.values.splice(id, 1);
      return value;
    });
    const newArray = detailArray?.filter((_, index) => index !== id);
    setDetailArray(newArray);
  };

  const handleSubTitle = (
    e: ChangeEvent<HTMLInputElement>,
    paramIndex: number
  ) => {
    update(+parentIndex, (value) => {
      value.values[paramIndex].subTitle = e.target.value;
      return value;
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Header isGoBack title={detailArray ? detailArray[0].title : ""} />
      <div className="mt-16 mb-32 w-full flex flex-col items-center">
        <button
          onClick={handleAddBtn}
          className="w-full max-w-xl mx-auto fixed bg-blue-600 flex justify-center text-white font-medium text-lg shadow-md items-center p-3"
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
        <div className="mt-12 w-full flex flex-col items-center">
          {detailArray
            ? detailArray.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="mt-10 w-full px-4 py-6 shadow rounded-md"
                  >
                    <div className="flex pb-5 justify-between items-center border-b border-gray-600">
                      <span className="font-semibold">{value.id + 1} 세트</span>
                      <DeleteBtn handelBtn={handelDeleteBtn} id={value.id} />
                    </div>
                    <div className="py-6 border-b border-gray-600">
                      <input
                        id="title"
                        defaultValue={value.subTitle}
                        onChange={(e) => {
                          handleSubTitle(e, value.id);
                        }}
                        placeholder="운동 상세정보를 입력해주세요"
                        className="w-full focus:outline-none border rounded p-2"
                      />
                    </div>
                    <div className="py-6">
                      <span className="font-semibold mb-3">휴식시간</span>
                      <SelectTimer
                        min={value.breakMin}
                        sec={value.breakSec}
                        id={value.id}
                        parentIndex={+parentIndex}
                      />
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <button
        onClick={() => router.push(`/start?id=${parentIndex}`)}
        className="w-full max-w-xl bottom-10 mx-auto fixed bg-blue-600 flex justify-center text-white font-medium text-lg shadow-md items-center p-3"
      >
        <div>시작하기</div>
      </button>
    </div>
  );
};

export default Detail;
