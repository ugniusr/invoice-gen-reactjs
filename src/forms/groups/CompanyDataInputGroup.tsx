import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import TextInput from "../fields/TextInput";
import { useFormContext } from "react-hook-form";
import CountryListSelectInput from "../fields/CountryListSelectInput";

enum VatStatus {
  "Yes" = "Yes",
  "No" = "No",
}

type CompanyDataInputGroupProps = {
  title: string;
  nameBase: string;
};

function CompanyDataInputGroup({
  title,
  nameBase,
}: CompanyDataInputGroupProps) {
  const { register } = useFormContext();
  const optionName = `${nameBase}IsVatPayer`;

  return (
    <div className="mb-3">
      <p className="h6">{title}</p>
      <TextInput
        name={`${nameBase}CompanyName`}
        label="Įmonės pavadinimas / vardas"
        placeholder=""
      />
      <TextInput
        name={`${nameBase}CompanyAddress`}
        label="Adresas, miestas"
        placeholder=""
      />
      <CountryListSelectInput name={`${nameBase}Country`} />

      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3} className="py-2">
            PVM statusas
          </Form.Label>
          <Col sm={9} className="py-2">
            <Form.Check
              {...register(optionName, { required: true })}
              value={VatStatus.Yes}
              type="radio"
              label="PVM mokėtojas"
              name={optionName}
              id={`radio1-${optionName}`}
            />
            <Form.Check
              {...register(optionName, { required: true })}
              value={VatStatus.No}
              type="radio"
              label="ne-PVM mokėtojas"
              name={optionName}
              id={`radio2-${optionName}`}
            />
          </Col>
        </Form.Group>
      </fieldset>
    </div>
  );
}

export default CompanyDataInputGroup;
