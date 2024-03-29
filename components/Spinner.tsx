import { useState, useEffect } from "react";


export type SpinnerProps = {
    displayed: boolean;
  };

const Spinner: React.FC<{props: SpinnerProps}> = ({props}) => {
  const {displayed} = props;
  const [show, setShow] = useState(props.displayed);
  useEffect(() => {
    setShow(props.displayed);
  }, [props.displayed]);
  return (
    <button
      type="button"
      className={`items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700 transition ease-in-out duration-150 cursor-not-allowed mt-4 ${
        show ? "inline-flex" : "hidden"
      }`}
      disabled
    >
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Processing
    </button>
  );
}
export default Spinner;