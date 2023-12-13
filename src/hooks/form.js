import { useCallback, useState } from "react"

export function useForm(inputValues) {
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

export function useFormWithValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const {value, checked, type, name} = target;
    setValues({
      ...values, 
      [name]: type === "checkbox" ? checked : value
    });
    setErrors({
      ...errors,
      [name]: target.validationMessage
    });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetForm };
}
