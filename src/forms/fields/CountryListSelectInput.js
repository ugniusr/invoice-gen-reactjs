import React, { useState, useEffect } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import axios from "axios";

function CountryListSelectInput({ name }) {
  const { register } = useFormContext();
  const [apiCountryList, setApiCountryList] = useState([]);

  useEffect(() => {
    // populate the list of countries from an API
    axios
      .get("https://restcountries.eu/rest/v2/all?fields=name;alpha2Code")
      .then((response) => {
        setApiCountryList(response.data);
      });
  }, []);

  return (
    <div>
      <FloatingLabel controlId="floatingSelectGrid" label="Valstybė">
        {Array.isArray(apiCountryList) && apiCountryList.length && (
          <Form.Select {...register(name)} name={name}>
            {apiCountryList.map((country) => (
              <option key={country.alpha2Code} value={country.alpha2Code}>
                {country.name}
              </option>
            ))}
          </Form.Select>
        )}
      </FloatingLabel>
    </div>
  );
}

export default CountryListSelectInput;
