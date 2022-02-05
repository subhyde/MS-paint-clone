import React from "react";
import { Container, Header, Navbar } from "rsuite";
import "./App.css";
import Toolbar from "./components/Toolbar";
import "rsuite/dist/styles/rsuite-default.css";

function App() {
  return (
    <div className="App">
      <Container>
        <Toolbar />
      </Container>
    </div>
  );
}

export default App;
