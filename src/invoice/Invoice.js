import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col, Table } from "react-bootstrap";
import { countryIsInEU, getVatRate } from "../lib/utils";

function Invoice({ show, onClose, data }) {
  const [vatRate, setVatRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const isTrue = (str) => str === "true";

  useEffect(() => {
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
      async function fetchVat() {
        let vat = await getVatRate(data.clientCountry);
        console.log("vat");
        console.log(vat);
        setVatRate(vat);
      }
      fetchVat();
    }
  }, [data]);

  useEffect(() => {
    setTotalAmount(data.amount + (vatRate * data.amount) / 100);
  }, [vatRate, data.amount]);

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
                <p className="my-0">{data && data.clientCompanyName}</p>
                <p className="my-0">{data && data.clientCompanyAddress}</p>
                <p className="my-0">Banko sąsk. nr.: </p>
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
                    <td>PVM ({vatRate && `${vatRate}`}%)</td>
                    <td>{`${vatRate && totalAmount - data.amount} EUR`}</td>
                  </tr>
                  <tr>
                    <td className="text-end">
                      <strong>Iš viso:</strong>
                    </td>
                    <td>{totalAmount && totalAmount + " EUR"}</td>
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
