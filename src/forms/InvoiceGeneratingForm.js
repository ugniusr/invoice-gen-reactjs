import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CompanyDataInputGroup from "./groups/CompanyDataInputGroup";
import NotCompanySpecificInputGroup from "./groups/NotCompanySpecificInputGroup";
import Invoice from "../invoice/Invoice";
import { FormProvider, useForm } from "react-hook-form";

// type InvoiceGeneratingFormProps = {
//   title: string;
// };

// interface IInvoiceForm {
//   clientIsVatPayer: boolean;
//   clientCompanyName: string;
//   clientCompanyAddress: string;
//   clientCountry: string;
//   serviceProviderIsVatPayer: boolean;
//   serviceProviderCompanyName: string;
//   serviceProviderCompanyAddress: string;
//   serviceProviderCountry: string;
//   nameOfServicePurchased: string;
//   amount: number;
// }

function InvoiceGeneratingForm({ title }) {
  const methods = useForm({
    defaultValues: {
      clientIsVatPayer: "Yes",
      clientCompanyName: "UAB Pirkikas",
      clientCompanyAddress: "45 some street, Miestas #1",
      clientCountry: "PL",
      serviceProviderIsVatPayer: "Yes",
      serviceProviderCompanyName: "UAB Pardavikas",
      serviceProviderCompanyAddress: "46 another street, Miestas #2",
      serviceProviderCountry: "PL",
      nameOfServicePurchased: "Konsultacijos",
      amount: 100,
    },
  });
  const { handleSubmit } = methods;
  const [show, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const handleClose = () => setShowInvoice(false);

  const handleShow = () => setShowInvoice(true);
  const onSubmit = (data) => {
    console.log(data);
    setInvoiceData(data);
    handleShow();
  };

  return (
    <div>
      <h4 className="mb-3">{title}</h4>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CompanyDataInputGroup nameBase="client" title="Kliento duomenys" />
          <CompanyDataInputGroup
            nameBase="serviceProvider"
            title="Paslaugų tiekėjo duomenys"
          />
          <NotCompanySpecificInputGroup />
          <div className="py-3">
            <Button size="lg" type="submit">
              Generuoti sąskaitą
            </Button>
          </div>
        </Form>
      </FormProvider>
      <Invoice show={show} onClose={handleClose} data={invoiceData} />
    </div>
  );
}

export default InvoiceGeneratingForm;
