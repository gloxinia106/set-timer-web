import { get, set } from "idb-keyval";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Header from "../components/header";
import { SelectSet, SelectTimer } from "../components/timer";
import { DeleteBtn } from "../components/btn";
import { ExerciseObj } from "../interface";

const Detail: NextPage = () => {
  const router = useRouter();
  const [parentIndex, setParentIndex] = useState<string>("");
  const [detailArray, setDetailArray] = useState<ExerciseObj[] | []>();
  useEffect(() => {
    get("exercise").then((value) => {
      const index = router.query["id"];
      try {
        if (index && typeof index === "string") {
          setDetailArray(value[+index]);
          setParentIndex(index);
        }
      } catch (error) {
        router.push("/");
      }
    });
  }, [parentIndex, router]);

  const saveidb = (tempArray: ExerciseObj[]) => {
    get("exercise").then((values) => {
      const newValue = values.map((value: any, index: number) => {
        if (index === +parentIndex) {
          return tempArray;
        } else {
          return value;
        }
      });
      set("exercise", newValue);
    });
  };

  const handleAddBtn = () => {
    const initExercise = {
      title: detailArray ? detailArray[0]["title"] : "",
      subTitle: "",
      exrNumber: "1",
      exrMin: "0",
      exrSec: "0",
      breakMin: "0",
      breakSec: "0",
      isExercise: false,
    };
    const addedDetailArray = detailArray
      ? [...detailArray, initExercise]
      : [initExercise];
    setDetailArray(addedDetailArray);
    saveidb(addedDetailArray);
  };

  const handelDeleteBtn = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    paramIndex: number
  ) => {
    e.stopPropagation();
    if (detailArray && detailArray.length > 1) {
      let deletedDetailArray;
      deletedDetailArray = detailArray.filter(
        (_, index) => paramIndex !== index
      );
      setDetailArray(deletedDetailArray);
      deletedDetailArray ? saveidb(deletedDetailArray) : "";
    } else {
      alert("첫번째 항목은 삭제할 수 없습니다.");
    }
  };

  const handleSubTitle = (
    e: ChangeEvent<HTMLInputElement>,
    paramIndex: number
  ) => {
    get("exercise").then((value: ExerciseObj[][]) => {
      value[+parentIndex][paramIndex]["subTitle"] = e.target.value;
      set("exercise", value);
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Header isGoBack title={detailArray ? detailArray[0]["title"] : ""} />
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
            ? detailArray.map((_, index) => {
                return (
                  <div
                    key={index}
                    className="mt-10 w-full px-4 py-6 shadow rounded-md"
                  >
                    <div className="flex pb-5 justify-between items-center border-b border-gray-600">
                      <span className="font-semibold">{index + 1} 세트</span>
                      <DeleteBtn handelBtn={handelDeleteBtn} index={index} />
                    </div>
                    <div className="py-6 border-b border-gray-600">
                      <input
                        id="title"
                        defaultValue={detailArray[index]["subTitle"]}
                        onChange={(e) => {
                          handleSubTitle(e, index);
                        }}
                        placeholder="운동 상세정보를 입력해주세요"
                        className="w-full focus:outline-none border rounded p-2"
                      />
                    </div>
                    <div className="py-6 border-b border-gray-600">
                      <span className="font-semibold mb-3">휴식시간</span>
                      <SelectTimer
                        min={detailArray[index]["breakMin"]}
                        sec={detailArray[index]["breakSec"]}
                        parIndex={+parentIndex}
                        childIndex={index}
                      />
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <button
        onClick={() => {
          router.push(`/start?id=${router.query["id"]}`);
        }}
        className="w-full max-w-xl bottom-10 mx-auto fixed bg-blue-600 flex justify-center text-white font-medium text-lg shadow-md items-center p-3"
      >
        <div>시작하기</div>
      </button>
    </div>
  );
};

export default Detail;
