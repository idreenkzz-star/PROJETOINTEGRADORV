import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMenu } from "@/contexts/MenuContext";

export default function EditItemScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { menuItems, updateMenuItem } = useMenu();

  const item = menuItems.find((i) => i.id === id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Item não encontrado</Text>
      </View>
    );
  }

  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(String(item.price));
  const [category, setCategory] = useState(item.category);
  const [image, setImage] = useState(item.image);

  const handleSave = () => {
    if (!name || !price || !category) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    updateMenuItem(item.id, {
      name,
      description,
      price: Number(price),
      category,
      image,
    });

    Alert.alert("Sucesso", "Prato atualizado com sucesso!");
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Prato</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />

      <Text style={styles.label}>URL da Imagem</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  saveButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ff6b35",
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
  },
});
