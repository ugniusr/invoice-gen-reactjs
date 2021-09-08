import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import TextInput from "./fields/TextInput";
import Button from "react-bootstrap/Button";
import CompanyDataInputGroup from "./groups/CompanyDataInputGroup";
import Invoice from "../invoice/Invoice";
import { FormProvider, useForm } from "react-hook-form";

function InvoiceGeneratingForm({ title }) {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  const methods = useForm();
  const [show, setShowInvoice] = useState(false);

  const handleClose = () => setShowInvoice(false);
  const handleShow = () => setShowInvoice(true);
  const onSubmit = (data) => {
    console.log(data);
    handleShow();
  };

  return (
    <div>
      <h4 className="mb-3">{title}</h4>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <CompanyDataInputGroup nameBase="client" title="Kliento duomenys" />
          <CompanyDataInputGroup
            nameBase="service_provider"
            title="Paslaugų tiekėjo duomenys"
          />

          <TextInput
            name="name_of_service_purchased"
            label="Paslaugos pavadinimas"
            placeholder="pvz. Konsultacinės paslaugos"
          />
          <TextInput name="amount" label="Suma" placeholder="pvz. 10000 EUR" />
          <div className="py-3">
            <Button size="lg" type="submit">
              Generuoti sąskaitą
            </Button>
          </div>
        </Form>
      </FormProvider>
      <Invoice show={show} onClose={handleClose} />
    </div>
  );
}

export default InvoiceGeneratingForm;
