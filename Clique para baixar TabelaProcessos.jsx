import React, { useState } from "react";

const processosMock = [
  {
    numero: "1234567-89.2024.8.26.0001",
    foro: "São Paulo - Foro Central",
    status: "Ativo",
  },
  {
    numero: "9876543-21.2023.8.26.0100",
    foro: "Santos - 2ª Vara Cível",
    status: "Aguardando audiência",
  },
];

export default function TabelaProcessos() {
  const [peticoes, setPeticoes] = useState({});

  const gerarPeticao = async (processo) => {
    try {
      const response = await fetch(
        "https://legaltech-backend.onrender.com/api/gerar-peticao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(processo),
        }
      );

      const data = await response.json();
      setPeticoes((prev) => ({
        ...prev,
        [processo.numero]: data.peticao || data.resultado || "Petição gerada.",
      }));
    } catch (error) {
      setPeticoes((prev) => ({
        ...prev,
        [processo.numero]: "Erro ao gerar petição.",
      }));
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Banca de Processos</h2>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Número</th>
            <th>Fórum</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {processosMock.map((proc) => (
            <tr key={proc.numero}>
              <td>{proc.numero}</td>
              <td>{proc.foro}</td>
              <td>{proc.status}</td>
              <td>
                <button onClick={() => gerarPeticao(proc)}>
                  Gerar Petição IA
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Object.entries(peticoes).map(([numero, texto]) => (
        <div key={numero} style={{ marginTop: "2rem" }}>
          <h4>Petição gerada para {numero}:</h4>
          <pre>{texto}</pre>
        </div>
      ))}
    </div>
  );
}