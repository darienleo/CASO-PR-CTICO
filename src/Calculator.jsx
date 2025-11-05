import { useState } from "react";

export default function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [op, setOp] = useState("add");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const parse = (v) => (v.trim() === "" ? NaN : Number(v));

  const compute = () => {
    setError("");
    const x = parse(a);
    const y = parse(b);

    if (Number.isNaN(x) || Number.isNaN(y)) {
      setResult(null);
      setError("Ingrese números válidos.");
      return;
    }

    if (op === "div" && y === 0) {
      setResult(null);
      setError("División por cero no permitida.");
      return;
    }

    const map = { add: x + y, sub: x - y, mul: x * y, div: x / y };
    setResult(map[op]);
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
      <h2>Calculadora</h2>
      <div style={{ display: "grid", gap: 8 }}>
        <input
          data-testid="input-a"
          placeholder="Primer número"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <input
          data-testid="input-b"
          placeholder="Segundo número"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
        <select
          data-testid="op-select"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="add">Suma</option>
          <option value="sub">Resta</option>
          <option value="mul">Multiplicación</option>
          <option value="div">División</option>
        </select>
        <button data-testid="calc-btn" onClick={compute}>Calcular</button>

        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {result !== null && !error && (
          <p>
            Resultado: <b>{result}</b>
          </p>
        )}
      </div>
    </div>
  );
}
