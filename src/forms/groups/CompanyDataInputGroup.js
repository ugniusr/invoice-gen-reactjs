import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import TextInput from "../fields/TextInput";
import { useFormContext } from "react-hook-form";
import CountryListSelectInput from "../fields/CountryListSelectInput";

function CompanyDataInputGroup({ title, nameBase }) {
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
              value={true}
              type="radio"
              label="PVM mokėtojas"
              name={optionName}
              id="radio1"
            />
            <Form.Check
              {...register(optionName, { required: true })}
              value={false}
              type="radio"
              label="ne-PVM mokėtojas"
              name={optionName}
              id="radio2"
            />
          </Col>
        </Form.Group>
      </fieldset>
    </div>
  );
}

export default CompanyDataInputGroup;
