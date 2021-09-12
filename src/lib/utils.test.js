import { shouldVatBeAppliedForInvoice } from "./utils.js";

test("tests shouldVatBeAppliedForInvoice function in all scenarios", () => {
  let serviceProviderIsVatPayer,
    serviceProviderCountry,
    clientIsVatPayer,
    clientCountry,
    result;
  /**
   * Scenario #1: when the Service Provider is NOT a VAT payer
   * Expect the result to be FALSE
   */
  serviceProviderIsVatPayer = "No";
  serviceProviderCountry = "LT";
  clientIsVatPayer = "Yes";
  clientCountry = "LT";
  result = shouldVatBeAppliedForInvoice(
    serviceProviderIsVatPayer,
    serviceProviderCountry,
    clientIsVatPayer,
    clientCountry
  );
  expect(result).toBe(false);
  /**
   * Scenario #2:
   * when the Service Provider IS a VAT payer
   * AND the Client is from outside the EU (both VAT and non-VAT payer)
   * Expect the result to be FALSE
   */
  serviceProviderIsVatPayer = "Yes";
  serviceProviderCountry = "LT";
  clientIsVatPayer = "Yes";
  clientCountry = "RW";
  result = shouldVatBeAppliedForInvoice(
    serviceProviderIsVatPayer,
    serviceProviderCountry,
    clientIsVatPayer,
    clientCountry
  );
  expect(result).toBe(false);
  clientIsVatPayer = "No";
  expect(result).toBe(false);

  /**
   * Scenario #3:
   * when the Service Provider IS a VAT payer
   * AND the Client is from the EU
   * AND the Client is a non-VAT payer
   * AND the Client is from a different country than the Service Provider
   * Expect the result to be TRUE
   */
  serviceProviderIsVatPayer = "Yes";
  serviceProviderCountry = "LT";
  clientIsVatPayer = "No";
  clientCountry = "PL";
  result = shouldVatBeAppliedForInvoice(
    serviceProviderIsVatPayer,
    serviceProviderCountry,
    clientIsVatPayer,
    clientCountry
  );
  expect(result).toBe(true);
  /**
   * Scenario #4:
   * when the Service Provider IS a VAT payer
   * AND the Client is from the EU
   * AND the Client IS a VAT payer
   * AND the Client is from a different country than the Service Provider
   * Expect the result to be FALSE
   */
  serviceProviderIsVatPayer = "Yes";
  serviceProviderCountry = "LT";
  clientIsVatPayer = "Yes";
  clientCountry = "PL";
  result = shouldVatBeAppliedForInvoice(
    serviceProviderIsVatPayer,
    serviceProviderCountry,
    clientIsVatPayer,
    clientCountry
  );
  expect(result).toBe(false);
  /**
   * Scenario #5:
   * when the Service Provider IS a VAT payer
   * AND the Client IS a VAT payer
   * AND both the Client, and the Servive Provider are from the same country
   * Expect the result to be TRUE
   */
  serviceProviderIsVatPayer = "Yes";
  serviceProviderCountry = "PT";
  clientIsVatPayer = "Yes";
  clientCountry = "PT";
  result = shouldVatBeAppliedForInvoice(
    serviceProviderIsVatPayer,
    serviceProviderCountry,
    clientIsVatPayer,
    clientCountry
  );
  expect(result).toBe(true);
});
