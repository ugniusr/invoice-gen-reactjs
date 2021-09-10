import "bootstrap/dist/css/bootstrap.min.css";
import InvoiceGeneratingForm from "./forms/InvoiceGeneratingForm";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./layout/Header";
import ContentWrapper from "./layout/ContentWrapper";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header title="Sąskaitų-faktūrų generavimo sistema" />
        <ContentWrapper>
          <InvoiceGeneratingForm title="Įveskite sąskaitos-faktūros duomenis" />
        </ContentWrapper>
      </QueryClientProvider>
    </>
  );
}

export default App;
