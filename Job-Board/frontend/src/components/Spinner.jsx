import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="h-screen flex justify-items-center items-center">
      <FaSpinner className="mx-auto" size={30} />
    </div>
  );
};

export default Spinner;
