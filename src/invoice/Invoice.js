import React from "react";
import { Modal, Button, Container, Row, Col, Table } from "react-bootstrap";

function Invoice({ show, onClose }) {
  return (
    <div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="text-center mb-5">
              <p className="my-0">
                <strong>SĄSKAITA-FAKTŪRA Nr. 1</strong>
              </p>
              <p className="my-0">2021-09-08</p>
            </Row>
            <Row className="mb-5">
              <Col>Pardavėjo info</Col>
              <Col>Pirkėjo info</Col>
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
                    <td>Programavimas</td>
                    <td>2 EUR</td>
                  </tr>
                  <tr>
                    <td>PVM (21%)</td>
                    <td>1 EUR</td>
                  </tr>
                  <tr>
                    <td className="text-end">
                      <strong>Iš viso:</strong>
                    </td>
                    <td>3 EUR</td>
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
