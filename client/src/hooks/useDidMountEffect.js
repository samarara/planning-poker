import { useRef, useEffect } from "react";

const useDidMountEffect = (cb, dependencies) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      cb();
    } else {
      didMount.current = true;
    }
  }, dependencies);
};

export default useDidMountEffect;