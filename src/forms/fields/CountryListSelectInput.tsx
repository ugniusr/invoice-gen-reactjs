import React, { useState, useEffect } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { fetchCountryList } from "../../lib/utils";

type CountryListSelectInputProps = {
  name: string;
};

type Country = {
  alpha2Code: string;
  name: string;
};

function CountryListSelectInput({ name }: CountryListSelectInputProps) {
  const { register } = useFormContext();
  const [apiCountryList, setApiCountryList] = useState<Country[]>([]);

  const { data } = useQuery("countryList", fetchCountryList, {
    refetchOnWindowFocus: false,
  });

  const populateCountryDropdown = () => {
    return (
      apiCountryList.length &&
      apiCountryList.map((country) => (
        <option key={country.alpha2Code} value={country.alpha2Code}>
          {country.name}
        </option>
      ))
    );
  };

  useEffect(() => {
    if (data === undefined || data === null) return;
    setApiCountryList(data.data);
  }, [data]);

  return (
    <div>
      <FloatingLabel controlId="floatingSelectGrid" label="Valstybė">
        {Array.isArray(apiCountryList) && apiCountryList.length && (
          <Form.Select {...register(name, { required: true })} name={name}>
            {populateCountryDropdown()}
          </Form.Select>
        )}
      </FloatingLabel>
    </div>
  );
}

export default CountryListSelectInput;
