import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InvoiceGeneratingForm from "./forms/InvoiceGeneratingForm";

function App() {
  return (
    <>
      {/** EXTRACT INTO A HEADER COMPONENT */}
      <div className="container-fluid bg-dark text-light p-4">
        <h1 className="display-6">Sąskaitų-faktūrų generavimo sistema</h1>
      </div>

      {/** EXTRACT INTO A FORM-SECTION COMPONENT */}
      <Container className="p-4 mx-0">
        <Row>
          <Col>
            <InvoiceGeneratingForm title="Įveskite sąskaitos-faktūros duomenis" />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
