import { useState, FormEvent } from "react";

interface OwnerLoginProps {
  onLogin: () => void;
}

export default function OwnerLogin({ onLogin }: OwnerLoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    // Exemplo — depois você troca por chamada de API
    if (email === "dono@restaurante.com" && password === "123456") {
      onLogin();
    } else {
      setError("Email ou senha incorretos.");
    }
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Login do Dono</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  form: {
    width: 320,
    padding: 30,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  title: {
    margin: 0,
    textAlign: "center",
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  button: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    background: "#ff5733",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
};
