import React, { useState, useEffect } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { fetchCountryList } from "../../lib/utils";

function CountryListSelectInput({ name }) {
  const { register } = useFormContext();
  const [apiCountryList, setApiCountryList] = useState([]);

  const { data } = useQuery("countryList", fetchCountryList, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data === undefined || data === null) return;
    setApiCountryList(data.data);
  }, [data]);

  return (
    <div>
      <FloatingLabel controlId="floatingSelectGrid" label="Valstybė">
        {Array.isArray(apiCountryList) && apiCountryList.length && (
          <Form.Select {...register(name, { required: true })} name={name}>
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
