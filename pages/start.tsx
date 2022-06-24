import { get } from "idb-keyval";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/header";
import { ExerciseObj, HomeExercisObj } from "../interface";

const Start: NextPage = () => {
  const router = useRouter();
  const [detailArray, setDetailArray] = useState<ExerciseObj[] | []>();
  const [min, setMin] = useState<string>("0");
  const [sec, setSec] = useState<string>("0");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isExercise, setIsExercise] = useState<boolean>(false);

  useEffect(() => {
    const id = router.query["id"];
    if (id) {
      get(+id).then((value: HomeExercisObj) => {
        try {
          setDetailArray(value.values);
          setMin(value.values[0].breakMin);
          setSec(value.values[0].breakSec);
        } catch (error) {
          router.push("/");
        }
      });
    }
  }, [router]);

  const startTimer = (minutes: number, seconds: number) => {
    const countdown = setInterval(() => {
      if (seconds >= 0) {
        setSec(seconds - 1 + "");
      }
      if (seconds < 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          if (detailArray) {
            const breakMin = detailArray[currentIndex + 1]["breakMin"];
            const breakSec = detailArray[currentIndex + 1]["breakSec"];
            setMin(breakMin);
            setSec(breakSec);
          }
        } else {
          setMin(minutes - 1 + "");
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
          {detailArray ? detailArray[currentIndex].subTitle : ""}
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
                startTimer(+min, +sec);
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
