import React from "react";
import { Field } from "react-final-form";
import { InputName, InputPlaceholder } from "@/constants/globalConstants";
import ErrorMessage from "./ErrorMessage";

interface IFormInput {
  name: InputName;
  placeholder: InputPlaceholder;
}

const InputTextArea = ({ name, placeholder }: IFormInput) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div>
        <span>{placeholder}</span>
        <div>
          <textarea {...input} />
          <ErrorMessage meta={meta} />
        </div>
      </div>
    )}
  </Field>
);
export default InputTextArea;
