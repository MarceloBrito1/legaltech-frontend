import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import TabelaProcessos from "./TabelaProcessos.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Painel - Legaltech Marcelo Brito</h1>
      <TabelaProcessos />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
