import React, { useState, useEffect } from 'react';

function TabelaProcessos() {
  const [processos, setProcessos] = useState([]);
  const [peticao, setPeticao] = useState("");
  const [mostrarPeticao, setMostrarPeticao] = useState(false);

  useEffect(() => {
    setProcessos([
      {
        numero_processo: "1001234-56.2022.8.26.0053",
        foro: "TJSP 1º Grau",
        cliente: "Prefeitura de SP",
        status: "Ativo",
        ultima_atualizacao: "2025-06-10",
        responsavel: "Marcelo Oliveira",
        fase: "Conhecimento",
        tags: "IPTU, Usucapião"
      }
    ]);
  }, []);

  const gerarPeticao = async (processo) => {
    try {
      const resposta = await fetch("https://legaltech-backend.onrender.com/api/gerar-peticao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processo)
      });
      const resultado = await resposta.json();
      if (resposta.ok) {
        setPeticao(resultado.texto_peticao);
        setMostrarPeticao(true);
      } else {
        alert("Erro: " + resultado.erro);
      }
    } catch (err) {
      console.error(err);
      alert("Falha ao gerar petição.");
    }
  };

  return (
    <div className="bg-white shadow mt-6 p-4 rounded">
      <h2 className="text-lg font-semibold mb-3">📋 Banca de Processos</h2>
      <table className="w-full text-sm table-auto border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="border px-2 py-1">Número</th>
            <th className="border px-2 py-1">Foro</th>
            <th className="border px-2 py-1">Cliente</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Atualização</th>
            <th className="border px-2 py-1">Responsável</th>
            <th className="border px-2 py-1">Fase</th>
            <th className="border px-2 py-1">Ações</th>
          </tr>
        </thead>
        <tbody>
          {processos.map((p, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{p.numero_processo}</td>
              <td className="border px-2 py-1">{p.foro}</td>
              <td className="border px-2 py-1">{p.cliente}</td>
              <td className="border px-2 py-1">{p.status}</td>
              <td className="border px-2 py-1">{p.ultima_atualizacao}</td>
              <td className="border px-2 py-1">{p.responsavel}</td>
              <td className="border px-2 py-1">{p.fase}</td>
              <td className="border px-2 py-1 text-center">
                <button onClick={() => gerarPeticao(p)} className="px-2 py-0.5 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                  Gerar Petição IA
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mostrarPeticao && (
        <div className="mt-4 p-4 bg-gray-50 border rounded">
          <h3 className="text-sm font-bold mb-1">📄 Petição Gerada:</h3>
          <pre className="text-xs whitespace-pre-wrap">{peticao}</pre>
        </div>
      )}
    </div>
  );
}

export default TabelaProcessos;
