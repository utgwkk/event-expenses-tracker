import React from "react";
import { Container } from "react-bootstrap";
import { Presets } from "./components/Presets";
import { Expenses } from "./components/Expenses";
import { CSVExport } from "./components/CSVExport";
import { DangerZone } from "./components/DangerZone";

function App() {
  return (
    <Container className="p-3">
      <h1>イベント支出記録君</h1>
      <Presets />
      <Expenses />
      <CSVExport />
      <DangerZone />
    </Container>
  );
}

export default App;
