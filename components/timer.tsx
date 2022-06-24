import { get, set } from "idb-keyval";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ExerciseObj } from "../interface";

interface SelectSetProps {
  setExrNumber: Dispatch<SetStateAction<string>>;
}

interface SelectTimerProps {
  min?: string;
  setMin?: Dispatch<SetStateAction<string>>;
  sec?: string;
  setSec?: Dispatch<SetStateAction<string>>;
}

export const SelectTimer = ({ min, sec, setMin, setSec }: SelectTimerProps) => {
  return (
    <div className="mt-2 bg-white rounded-lg border border-gray-400">
      <div className="flex items-center justify-center">
        <select
          defaultValue={min ? min : 0}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            if (setMin) {
              setMin(e.target.value);
            }
          }}
          name="min"
          className="w-full h-12 bg-transparent text-center text-xl appearance-none outline-none"
        >
          {[...Array(99).keys()].map((key, index) => (
            <option key={index} value={+key}>
              {+key}
            </option>
          ))}
        </select>
        <span className="text-xl mr-3">:</span>
        <select
          defaultValue={sec ? sec : 0}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            if (setSec) {
              setSec(e.target.value);
            }
          }}
          name="sec"
          className="w-full bg-transparent text-center text-xl appearance-none outline-none mr-4"
        >
          {[...Array(59).keys()].map((key, index) => (
            <option key={index} value={+key}>
              {+key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const SelectSet = ({ setExrNumber }: SelectSetProps) => {
  return (
    <div className="mt-2 bg-white rounded-lg border border-gray-400">
      <div className="flex">
        <select
          defaultValue="1"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setExrNumber(e.target.value);
          }}
          name="min"
          className="bg-transparent h-12 w-full text-center text-xl appearance-none outline-none"
        >
          {[...Array(99).keys()].map((key, index) => (
            <option key={index} value={+key + 1}>
              {+key + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
