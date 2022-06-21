export const SelectTimer = () => {
  return (
    <div className="mt-2 bg-white rounded-lg border border-gray-400">
      <div className="flex items-center justify-center">
        <select
          name="min"
          className="w-full h-12 bg-transparent text-center text-xl appearance-none outline-none"
        >
          {[...Array(99).keys()].map((key, index) => (
            <option key={index} value={+key + 1}>
              {+key + 1}
            </option>
          ))}
        </select>
        <span className="text-xl mr-3">:</span>
        <select
          name="sec"
          className="w-full bg-transparent text-center text-xl appearance-none outline-none mr-4"
        >
          {[...Array(59).keys()].map((key, index) => (
            <option key={index} value={+key + 1}>
              {+key + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const SelectSet = () => {
  return (
    <div className="mt-2 bg-white rounded-lg border border-gray-400">
      <div className="flex">
        <select
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
