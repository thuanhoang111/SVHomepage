import { useState } from "react";

/**
 * useToggleValue: A custom hook for managing a boolean toggle state.
 *
 * This hook provides a stateful value and a function to toggle its state between `true` and `false`.
 * It initializes the value based on the provided `initialValue` and returns the current value along
 * with a function to toggle the value.
 *
 * @param {boolean} [initialValue=false] - The initial value of the state. Defaults to `false` if not provided.
 * @returns {Object} The stateful value and a function to toggle it:
 *   - `value` {boolean}: The current state value.
 *   - `handleToggleValue` {Function}: A function that toggles the state between `true` and `false`.
 */
export default function useToggleValue(initialValue = false) {
  // Define a state variable `value` and a function `setValue` to update it
  const [value, setValue] = useState<boolean>(initialValue);

  // Function to toggle the state value
  const handleToggleValue = () => {
    setValue(!value);
  };

  // Return the current state value and the toggle function
  return {
    value,
    handleToggleValue,
  };
}
