import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react-native";

export default function LoginScreen() {
  const { logged, login, logout } = useAuth();

  if (logged) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Você está logado!</Text>

        <TouchableOpacity
          onPress={logout}
          style={{ backgroundColor: "red", padding: 12, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <User size={52} color="#FF5722" />

        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
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
