import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Trash2, Receipt } from 'lucide-react-native';
import { useMenu } from '@/contexts/MenuContext';
import { MenuItem } from '@/types/menu';

export default function RestaurantScreen() {
  const router = useRouter();
  const { menuItems, removeMenuItem, orders } = useMenu();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      'Remover Item',
      'Tem certeza que deseja remover este item do cardápio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            removeMenuItem(id);
            setSelectedItem(null);
          },
        },
      ]
    );
  };

  const pendingOrders = orders.filter((order) => order.status === 'pending');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerenciar Cardápio</Text>
        <TouchableOpacity
          style={styles.ordersButton}
          onPress={() => router.push('/restaurant/orders')}>
          <Receipt size={24} color="#FFF" />
          {pendingOrders.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{pendingOrders.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => setSelectedItem(item)}>
            <Image
              source={{ uri: item.image }}
              style={styles.menuImage}
              resizeMode="cover"
            />
            <View style={styles.menuInfo}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.menuFooter}>
                <Text style={styles.menuPrice}>
                  R$ {item.price.toFixed(2)}
                </Text>
                <Text style={styles.menuCategory}>{item.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/restaurant/add-item')}>
        <Plus size={28} color="#FFF" />
      </TouchableOpacity>

      <Modal
        visible={selectedItem !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedItem(null)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedItem(null)}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image
                  source={{ uri: selectedItem.image }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.modalName}>{selectedItem.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedItem.description}
                </Text>
                <Text style={styles.modalPrice}>
                  R$ {selectedItem.price.toFixed(2)}
                </Text>
                <Text style={styles.modalCategory}>
                  {selectedItem.category}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemoveItem(selectedItem.id)}>
                  <Trash2 size={20} color="#FFF" />
                  <Text style={styles.deleteButtonText}>
                    Remover do Cardápio
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FF6B35',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  ordersButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    padding: 16,
  },
  menuCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E0E0E0',
  },
  menuInfo: {
    padding: 16,
  },
  menuName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  menuFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
  },
  menuCategory: {
    fontSize: 14,
    color: '#999',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF6B35',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  modalName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
    marginHorizontal: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    marginHorizontal: 20,
    lineHeight: 22,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
    marginTop: 16,
    marginHorizontal: 20,
  },
  modalCategory: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
