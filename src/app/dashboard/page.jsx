"use client";
import { useState } from "react";
const Dashboard = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Your count is : {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default Dashboard;
