import React from "react";
import { Form, FloatingLabel, Row, Col } from "react-bootstrap";
import TextInput from "../fields/TextInput";

function CompanyDataInputGroup({ title, nameBase }) {
  return (
    <div className="mb-3">
      <p className="h6">{title}</p>
      <TextInput
        name={`${nameBase}_company_name`}
        label="Įmonės pavadinimas / vardas"
        placeholder=""
      />
      <TextInput
        name={`${nameBase}_company_address`}
        label="Adresas, miestas"
        placeholder=""
      />
      <FloatingLabel controlId="floatingSelectGrid" label="Valstybė">
        <Form.Select aria-label="" defaultValue="Pasirinkite...">
          <option value="1">LT</option>
          <option value="2">LV</option>
          <option value="3">PL</option>
        </Form.Select>
      </FloatingLabel>
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3} className="py-2">
            PVM statusas
          </Form.Label>
          <Col sm={9} className="py-2">
            <Form.Check
              type="radio"
              label="PVM mokėtojas"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="ne-PVM mokėtojas"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
          </Col>
        </Form.Group>
      </fieldset>
    </div>
  );
}

export default CompanyDataInputGroup;
