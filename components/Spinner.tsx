import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="flex justify-center mt-10">
      <Spinner
        animation="border"
        variant="light"
        style={{ width: "3rem", height: "3rem" }}
      />
    </div>
  );
};

export default Loader;
