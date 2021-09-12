import React from "react";
import TextInput from "../fields/TextInput";

function NotCompanySpecificInputGroup() {
  return (
    <div>
      <TextInput
        name="nameOfServicePurchased"
        label="Paslaugos pavadinimas"
        placeholder="pvz. Konsultacinės paslaugos"
      />
      <TextInput
        name="amount"
        label="Suma"
        placeholder="pvz. 10000 EUR"
        validationObj={{
          validate: (value) =>
            // check if string is a valid number
            !isNaN(parseFloat(value)) ||
            "Šiame lauke galite įvesti tik skaičių. Kableliui naudokite tašką, pvz. 5.50",
        }}
      />
    </div>
  );
}

export default NotCompanySpecificInputGroup;
