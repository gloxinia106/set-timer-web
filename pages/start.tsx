import { NextPage } from "next";
import Header from "../components/header";

const Start: NextPage = () => {
  return (
    <div className="w-full h-screen max-w-xl mx-auto">
      <Header isGoBack title="1 세트" />
      <div className="pt-16 w-full h-full flex flex-col items-center">
        <div className="text-2xl font-bold">운동시간</div>
        <div className="w-full h-full flex justify-center items-center">
          <div className="bg-blue-500 aspect-square rounded-full w-11/12 flex justify-center items-center">
            <span className="text-white font-bold text-8xl">12:12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
