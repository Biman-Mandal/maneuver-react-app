import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../services/redux/CounterReducer";

const Counter = () => {
  // Access the counter state
  const count = useSelector((state) => state.counter.value);

  // Dispatch actions to update the state
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Counter;
