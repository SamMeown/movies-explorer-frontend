import { useState } from "react"

export default function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt) => {
    const {value, checked, type, name} = evt.target;
    setValues({
      ...values, 
      [name]: type === "checkbox" ? checked : value
    });
  }

  return {values, setValues, handleChange};
}
