import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useFormContext } from "react-hook-form";
// import { defaultFormValues } from "../InvoiceGeneratingForm";
import "./Input.css";

type TextInputProps = {
  label: string;
  placeholder: string;
  name: string;
  validationObj?: {};
};

function TextInput({
  label,
  placeholder,
  name,
  validationObj = {},
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Form.Group controlId="validationCustom01">
        <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
          <Form.Control
            type="text"
            placeholder={placeholder}
            isInvalid={errors[name] ? true : undefined}
            {...register(
              name,
              Object.assign(
                {},
                {
                  required: "Šis laukas privalomas. Nepalikite tuščio.",
                },
                validationObj
              )
            )}
          />
          {errors[name] && (
            <Form.Control.Feedback type="invalid" className="text-left">
              {errors[name].message}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>
      </Form.Group>
    </>
  );
}

export default TextInput;
