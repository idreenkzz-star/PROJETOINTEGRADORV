import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { User } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginScreen() {
  const { loginAsAdmin, loginAsClient } = useAuth();

  function handleLogin() {
    // Para apresentação, você pode alterar emails fixos
    const email = "admin@restaurante.com";

    if (email === "admin@restaurante.com") {
      loginAsAdmin();
    } else {
      loginAsClient();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <User size={52} color="#FF5722" />

        <Text style={styles.title}>Login</Text>

        <TextInput placeholder="Email" style={styles.input} />

        <TextInput placeholder="Senha" secureTextEntry style={styles.input} />

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
