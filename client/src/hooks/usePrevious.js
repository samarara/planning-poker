import { useEffect, useRef } from "react";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    console.log("in use previous")
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;