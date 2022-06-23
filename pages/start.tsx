import { get } from "idb-keyval";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/header";
import { ExerciseObj } from "../interface";

const Start: NextPage = () => {
  const router = useRouter();
  const [parentIndex, setParentIndex] = useState<string>("");
  const [detailArray, setDetailArray] = useState<ExerciseObj[] | []>();
  const [min, setMin] = useState<string>("0");
  const [sec, setSec] = useState<string>("0");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    get("exercise").then((value) => {
      const index = router.query["id"];
      try {
        if (index && typeof index === "string") {
          setDetailArray(value[+index]);
          setParentIndex(index);
          if (value[+index][0]["isExercise"]) {
            startTimer(
              value[+index][0]["exrMin"],
              value[+index][0]["exrSec"],
              true
            );
          }
        }
      } catch (error) {
        router.push("/");
      }
    });
  }, [router]);

  const startTimer = (
    minutes: string,
    seconds: string,
  ) => {
    const countdown = setInterval(() => {
      if (+seconds > 0) {
        setSec(+seconds - 1 + "");
      }
      if (+seconds === 0) {
        if (+minutes === 0) {
          clearInterval(countdown);
            if (detailArray) {
              const breakMin = detailArray[currentIndex + 1]["breakMin"];
              const breakSec = detailArray[currentIndex + 1]["breakSec"];
              setMin(breakMin);
              setSec(breakSec);
        } else {
          setMin(+minutes - 1 + "");
          setSec("59");
        }
      }
    }, 1000);
  };

  return (
    <div className="w-full h-screen max-w-xl mx-auto">
      <Header isGoBack title={`${currentIndex + 1} 세트`} />
      <div className="pt-16 w-full h-full flex flex-col items-center">
        <div className="text-2xl font-bold">
          {detailArray ? detailArray[+parentIndex]["subTitle"] : ""}
        </div>
        <div className="w-full h-full flex justify-center items-center">
          {isExercise ? (
            <div className="bg-blue-500 aspect-square rounded-full w-11/12 flex justify-center items-center">
              <span className="text-white font-bold text-8xl">
                {min}:{sec}
              </span>
            </div>
          ) : (
            <div
              onClick={() => {
                startTimer(min, sec, true);
              }}
              className="bg-blue-500 cursor-pointer aspect-square rounded-full w-11/12 flex justify-center items-center"
            >
              <span className="text-white font-bold text-8xl">OK</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Start;
