import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { User } from "lucide-react-native";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginScreen() {
  const { loginAsAdmin } = useAuth(); // usa admin por enquanto
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    // 🚀 Aqui você implementará login real depois
    loginAsAdmin(); // por enquanto isso libera as telas do admin
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <User size={52} color="#FF5722" />

        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center"
  },
  card: {
    width: "80%", padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    gap: 12,
    alignItems: "center"
  },
  title: {
    fontSize: 22, fontWeight: "bold"
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#FF5722",
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff", fontWeight: "bold"
  }
});
