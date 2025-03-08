import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar, Container } from "react-bootstrap";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Button variant="primary">Primary</Button>
    </div>
  );
}

export default App;
