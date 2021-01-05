import React from "react";
import { Container, Header, Navbar } from "rsuite";
import "./App.css";
import Toolbar from "./components/Toolbar";
import "rsuite/dist/styles/rsuite-default.css";

function App() {
  return (
    <div className="App">
      <Container>
        <Header>
          <Navbar style={{ paddingBottom: "20px" }} appearance="inverse">
            <Navbar.Header>
              <h4 className={"titlebar"}>
                CANimmunize Technical Assessment: Ethan Johnson
              </h4>
            </Navbar.Header>
          </Navbar>
        </Header>
        <Toolbar />
      </Container>
    </div>
  );
}

export default App;
