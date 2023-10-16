import { useContext } from "react";
/* Constant for form context */
const FormContext = useContext();

/* This function returns form context for Create form (NewForm.jsx) component */
export function useFormContext() {
  return useContext(FormContext);
}

export default FormContext;