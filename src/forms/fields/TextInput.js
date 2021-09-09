import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useFormContext } from "react-hook-form";
// import { defaultFormValues } from "../InvoiceGeneratingForm";
import "./Input.css";

function TextInput({ label, placeholder, name }) {
  const { register } = useFormContext();
  return (
    <>
      <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
        <Form.Control
          type="text"
          placeholder={placeholder}
          {...register(name)}
        />
      </FloatingLabel>
    </>
  );
}

export default TextInput;
