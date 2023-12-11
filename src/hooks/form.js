import { useState } from "react"

export default function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt) => {
    console.log(evt);
    const {value, checked, type, name} = evt.target;
    setValues({
      ...values, 
      [name]: type === "checkbox" ? checked : value
    });
  }

  return {values, setValues, handleChange};
}
