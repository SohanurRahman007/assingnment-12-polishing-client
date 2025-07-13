import { BallTriangle } from "react-loader-spinner";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${smallHeight ? "h-[250px]" : "h-[70vh]"} 
      flex 
      flex-col 
      justify-center 
      items-center`}
    >
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#84cc16" // lime-500 hex color
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
