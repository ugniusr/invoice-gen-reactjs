import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col, Table } from "react-bootstrap";
import { countryIsInEU, getVatRate } from "../lib/utils";

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
  const [vatRate, setVatRate] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const isTrue = (status: VatStatus) => status === VatStatus.Yes;

  useEffect(() => {
    if (data === undefined || data === null) return;
    let vatRateShouldBeApplied = false;
    /**
     * a number of conditions to check if VAT should be applied
     * */
    if (isTrue(data.serviceProviderIsVatPayer)) {
      if (countryIsInEU(data.clientCountry)) {
        if (data.clientCountry === data.serviceProviderCountry) {
          vatRateShouldBeApplied = true;
        } else {
          if (!isTrue(data.clientIsVatPayer)) vatRateShouldBeApplied = true;
        }
      }
    }
    if (vatRateShouldBeApplied) {
      const fetchVat = async () => {
        let vat = await getVatRate(data.clientCountry);
        console.log("data.clientCountry");
        console.log(data.clientCountry);
        console.log("vat fetched:");
        console.log(vat);
        setVatRate(vat);
      };
      fetchVat();
    } else {
      setVatRate(0);
      setVatAmount(0);
    }
  }, [data]);

  useEffect(() => {
    // Calculate the VAT cost, as soon as the VAT rate is known (or changed)
    if (vatRate === 0 || data?.amount === undefined) return;
    let vat = (vatRate / 100) * data.amount;
    let vatRounded = Math.round(vat * 100) / 100;
    setVatAmount(vatRounded);
  }, [vatRate, data.amount]);

  useEffect(() => {
    // Calculate the Total invoice amount, as soon as the VAT cost and the service costs are known (or changed)
    setTotalAmount(Number(data.amount) + vatAmount);
  }, [vatAmount, data.amount]);

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
                <p className="my-0">
                  {data && data.serviceProviderCompanyName}
                </p>
                <p className="my-0">
                  {data && data.serviceProviderCompanyAddress}
                </p>
              </Col>
              <Col>
                <p className="my-0">PIRKĖJAS:</p>
                <p className="my-0">{data && data.clientCompanyName}</p>
                <p className="my-0">{data && data.clientCompanyAddress}</p>
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
                    <td>{data && data.nameOfServicePurchased}</td>
                    <td>{data && data.amount + " EUR"}</td>
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
