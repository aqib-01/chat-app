import Image from "next/image";
const SpinnerLoading = ({ width }) => {
  return (
    <div className="w-fit">
      <Image
        src={"/images/spinner-loading.svg"}
        width={width ? width : 50}
        height={width ? width : 50}
        alt="Spinner Loading"
      />
    </div>
  );
};

export default SpinnerLoading;
