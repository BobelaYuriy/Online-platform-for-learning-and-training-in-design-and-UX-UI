import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { testReducer } from "../../store/slices/testReducer";

export const HomePage = () => {
  const { count } = useSelector((state) => state.test);
  const { increment } = testReducer.actions; // Використовуйте екшени через testReducer.actions
  const dispatch = useDispatch();

  return (
    <div>
      <div className="container rounded p-4 bg-light">
        <div className="text-center">
          <h1 className="mb-4">Design Online Platform</h1>
          <p className="lead">
            Welcome to our online platform dedicated to design enthusiasts.
            Whether you're a professional designer or just starting out, our
            platform offers resources, tools, and inspiration to help you
            unleash your creativity and bring your ideas to life.
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-center text-white" style={{ fontSize: "6rem" }}>
          {count}
        </h1>
        <div className="d-flex justify-content-center mt-3">
          <Button
            onClick={() => dispatch(increment(5))} // Використовуйте increment з testReducer.actions
            variant="secondary"
            size="lg"
            className="btn-xl me-3"
          >
            Add cash
          </Button>
        </div>
      </div>
    </div>
  );
};
