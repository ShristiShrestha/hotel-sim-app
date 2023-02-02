import React, { useEffect, useState } from "react";
import Clock from "react-clock";

export default function ClockModal() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <Clock value={value} renderNumbers />
    </div>
  );
}
