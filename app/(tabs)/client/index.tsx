import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingCart, Plus, Minus } from 'lucide-react-native';
import { useMenu } from '@/contexts/MenuContext';
import { MenuItem, OrderItem } from '@/types/menu';

export default function ClientScreen() {
  const router = useRouter();
  const { menuItems } = useMenu();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [quantity, setQuantity] = useState(1);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = () => {
    if (!selectedItem) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.menuItem.id === selectedItem.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.menuItem.id === selectedItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { menuItem: selectedItem, quantity }];
    });

    setSelectedItem(null);
    setQuantity(1);
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const sections = Object.entries(groupedItems).map(([category, items]) => ({
    category,
    data: items,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
            />
        <Text style={styles.title}>Cardápio</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            router.push({
              pathname: '/client/cart',
              params: { cart: JSON.stringify(cart) },
            })
          }>
          <ShoppingCart size={24} color="#FFF" />
          {cartItemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={sections}
        keyExtractor={(item) => item.category}
        contentContainerStyle={styles.list}
        renderItem={({ item: section }) => (
          <View style={styles.section}>
            <Text style={styles.categoryTitle}>{section.category}</Text>
            {section.data.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuCard}
                onPress={() => {
                  setSelectedItem(item);
                  setQuantity(1);
                }}>
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
                  <Text style={styles.menuPrice}>
                    R$ {item.price.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      {cartItemCount > 0 && (
        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={() =>
            router.push({
              pathname: '/client/cart',
              params: { cart: JSON.stringify(cart) },
            })
          }>
          <Text style={styles.viewCartText}>Ver Carrinho</Text>
          <Text style={styles.viewCartTotal}>R$ {cartTotal.toFixed(2)}</Text>
        </TouchableOpacity>
      )}

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

                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantidade:</Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus size={20} color="#FF6B35" />
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => setQuantity(quantity + 1)}>
                      <Plus size={20} color="#FF6B35" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddToCart}>
                  <Text style={styles.addButtonText}>
                    Adicionar - R${' '}
                    {(selectedItem.price * quantity).toFixed(2)}
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 6,
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
  cartButton: {
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
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuImage: {
    width: 100,
    height: 100,
    backgroundColor: '#E0E0E0',
  },
  menuInfo: {
    flex: 1,
    padding: 12,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  menuPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
  },
  viewCartButton: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  viewCartText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  viewCartTotal: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
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
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
