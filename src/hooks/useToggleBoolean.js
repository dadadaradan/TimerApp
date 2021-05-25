import { useState } from "react";

function useToggleBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggleBoolean = () => {
    setValue(!value);
  };

  return [value, toggleBoolean];
}

export default useToggleBoolean;
