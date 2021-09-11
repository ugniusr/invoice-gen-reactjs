import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col, Table } from "react-bootstrap";
import {
  shouldVatBeAppliedForInvoice,
  getVatRate,
  roundTo2Decimals,
} from "../lib/utils";

enum VatStatus {
  "Yes" = "Yes",
  "No" = "No",
}
type IInvoiceForm = {
  clientIsVatPayer: VatStatus;
  clientCompanyName: string;
  clientCompanyAddress: string;
  clientCountry: string;
  serviceProviderIsVatPayer: VatStatus;
  serviceProviderCompanyName: string;
  serviceProviderCompanyAddress: string;
  serviceProviderCountry: string;
  nameOfServicePurchased: string;
  amount: number;
};

type InvoiceProps = {
  show: boolean;
  onClose: () => any;
  data: IInvoiceForm;
};

function Invoice({ show, onClose, data }: InvoiceProps) {
  const [vatRequired, setVatRequired] = useState(false);
  const [vatRate, setVatRate] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const {
    serviceProviderIsVatPayer,
    clientIsVatPayer,
    clientCountry,
    serviceProviderCountry,
    serviceProviderCompanyName,
    serviceProviderCompanyAddress,
    clientCompanyName,
    clientCompanyAddress,
    nameOfServicePurchased,
    amount,
  } = data;

  useEffect(() => {
    // Check if VAT is required for the invoice
    if (
      !serviceProviderIsVatPayer ||
      !serviceProviderCountry ||
      !clientIsVatPayer ||
      !clientCountry
    )
      return;
    let status = shouldVatBeAppliedForInvoice(
      serviceProviderIsVatPayer,
      serviceProviderCountry,
      clientIsVatPayer,
      clientCountry
    );

    setVatRequired(status);
  }, [
    serviceProviderIsVatPayer,
    serviceProviderCountry,
    clientIsVatPayer,
    clientCountry,
  ]);

  useEffect(() => {
    if (!clientCountry) return;
    // if VAT is necessary, set the VAT rate
    if (vatRequired) {
      const setVat = async () => {
        setVatRate(await getVatRate(clientCountry));
      };
      setVat();
    } else {
      setVatRate(0);
      setVatAmount(0);
    }
  }, [vatRequired, clientCountry]);

  useEffect(() => {
    // Calculate the VAT cost, given the VAT rate
    if (!amount) return;
    setVatAmount(roundTo2Decimals(vatRate / 100) * amount);
  }, [vatRate, amount]);

  useEffect(() => {
    if (!amount) return;
    // Calculate the Total invoice amount
    setTotalAmount(Number(amount) + vatAmount);
  }, [vatAmount, amount]);

  return (
    <div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="text-center mb-5">
              <p className="my-0">
                <strong>SĄSKAITA-FAKTŪRA</strong>
              </p>
              <p className="my-0">2021-09-08</p>
            </Row>
            <Row className="mb-5">
              <Col>
                <p className="my-0">PARDAVĖJAS:</p>
                <p className="my-0">{serviceProviderCompanyName}</p>
                <p className="my-0">{serviceProviderCompanyAddress}</p>
              </Col>
              <Col>
                <p className="my-0">PIRKĖJAS:</p>
                <p className="my-0">{clientCompanyName}</p>
                <p className="my-0">{clientCompanyAddress}</p>
              </Col>
            </Row>
            <Row>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Paslaugos pavadinimas</th>
                    <th>Suma</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{nameOfServicePurchased}</td>
                    <td>{amount + " EUR"}</td>
                  </tr>
                  <tr>
                    <td>PVM ({vatRate}%)</td>
                    <td>{`${vatAmount} EUR`}</td>
                  </tr>
                  <tr>
                    <td className="text-end">
                      <strong>Iš viso:</strong>
                    </td>
                    <td>{`${totalAmount} EUR`}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Invoice;
