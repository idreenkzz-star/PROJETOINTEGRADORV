import React, { useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useMenu } from '@/contexts/MenuContext';

const CATEGORIES = [
  'Pizza',
  'Hambúrguer',
  'Japonês',
  'Massas',
  'Sobremesas',
  'Bebidas',
  'Saladas',
  'Outros',
];

export default function AddItemScreen() {
  const router = useRouter();
  const { addMenuItem } = useMenu();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Pizza');
  const [image, setImage] = useState<string | null>(null);

  // 📌 Abrir a galeria e escolher a imagem
  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      alert("Permissão negada para acessar a galeria.");
      return;
    }

    const img = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!img.canceled) {
      setImage(img.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    addMenuItem({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price.replace(',', '.')),
      category: selectedCategory,
      image: image || "", // agora image é URI local
    });

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Adicionar Item</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        
        {/* IMAGEM */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Imagem do Item</Text>

          {image && (
            <Image source={{ uri: image }} style={styles.previewImage} />
          )}

          <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
            <Text style={styles.pickImageText}>
              {image ? "Trocar imagem" : "Escolher imagem da galeria"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* NOME */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Prato</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Pizza Margherita"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        </View>

        {/* DESCRIÇÃO */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva os ingredientes e detalhes"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        {/* PREÇO */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preço (R$)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />
        </View>

        {/* CATEGORIA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* BOTÃO */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Adicionar ao Cardápio</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#FF6B35',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: { width: 40 },
  title: { fontSize: 20, fontWeight: '700', color: '#FFF' },
  placeholder: { width: 40 },
  content: { flex: 1 },
  scrollContent: { padding: 20 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: { minHeight: 100, paddingTop: 14 },
  pickImageButton: {
    backgroundColor: "#FF6B35",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  pickImageText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryButtonActive: { backgroundColor: '#FF6B35', borderColor: '#FF6B35' },
  categoryText: { fontSize: 14, color: '#666', fontWeight: '500' },
  categoryTextActive: { color: '#FFF' },
  submitButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  submitButtonText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
});
