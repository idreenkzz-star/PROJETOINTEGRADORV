import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, ChefHat, CheckCircle, Package } from 'lucide-react-native';
import { useMenu } from '@/contexts/MenuContext';
import { Order } from '@/types/menu';

const STATUS_CONFIG = {
  pending: { label: 'Pendente', color: '#F39C12', icon: Clock },
  preparing: { label: 'Preparando', color: '#3498DB', icon: ChefHat },
  ready: { label: 'Pronto', color: '#27AE60', icon: CheckCircle },
  delivered: { label: 'Entregue', color: '#95A5A6', icon: Package },
};

export default function OrdersScreen() {
  const router = useRouter();
  const { orders, updateOrderStatus } = useMenu();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleStatusChange = (orderId: string, currentStatus: Order['status']) => {
    const statusFlow: Order['status'][] = ['pending', 'preparing', 'ready', 'delivered'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    if (currentIndex < statusFlow.length - 1) {
      updateOrderStatus(orderId, statusFlow[currentIndex + 1]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Pedidos</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const statusConfig = STATUS_CONFIG[item.status];
          const StatusIcon = statusConfig.icon;

          return (
            <TouchableOpacity
              style={styles.orderCard}
              onPress={() => setSelectedOrder(item)}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderCustomer}>{item.customerName}</Text>
                  <Text style={styles.orderTime}>{formatDate(item.createdAt)}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusConfig.color }]}>
                  <StatusIcon size={16} color="#FFF" />
                  <Text style={styles.statusText}>{statusConfig.label}</Text>
                </View>
              </View>

              <View style={styles.orderItems}>
                {item.items.map((orderItem, index) => (
                  <Text key={index} style={styles.orderItemText}>
                    {orderItem.quantity}x {orderItem.menuItem.name}
                  </Text>
                ))}
              </View>

              <View style={styles.orderFooter}>
                <Text style={styles.orderTotal}>
                  Total: R$ {item.total.toFixed(2)}
                </Text>
                {item.status !== 'delivered' && (
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: statusConfig.color }]}
                    onPress={() => handleStatusChange(item.id, item.status)}>
                    <Text style={styles.actionButtonText}>
                      {item.status === 'pending' && 'Iniciar Preparo'}
                      {item.status === 'preparing' && 'Marcar Pronto'}
                      {item.status === 'ready' && 'Marcar Entregue'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Modal
        visible={selectedOrder !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedOrder(null)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedOrder(null)}>
          <View style={styles.modalContent}>
            {selectedOrder && (
              <>
                <Text style={styles.modalTitle}>Detalhes do Pedido</Text>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Cliente:</Text>
                  <Text style={styles.modalValue}>{selectedOrder.customerName}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Horário:</Text>
                  <Text style={styles.modalValue}>
                    {formatDate(selectedOrder.createdAt)}
                  </Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Status:</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: STATUS_CONFIG[selectedOrder.status].color }
                  ]}>
                    <Text style={styles.statusText}>
                      {STATUS_CONFIG[selectedOrder.status].label}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalDivider} />

                <Text style={styles.modalLabel}>Itens do Pedido:</Text>
                {selectedOrder.items.map((orderItem, index) => (
                  <View key={index} style={styles.modalItem}>
                    <Text style={styles.modalItemName}>
                      {orderItem.quantity}x {orderItem.menuItem.name}
                    </Text>
                    <Text style={styles.modalItemPrice}>
                      R$ {(orderItem.menuItem.price * orderItem.quantity).toFixed(2)}
                    </Text>
                  </View>
                ))}

                <View style={styles.modalDivider} />

                <View style={styles.modalTotal}>
                  <Text style={styles.modalTotalLabel}>Total:</Text>
                  <Text style={styles.modalTotalValue}>
                    R$ {selectedOrder.total.toFixed(2)}
                  </Text>
                </View>

                {selectedOrder.status !== 'delivered' && (
                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      { backgroundColor: STATUS_CONFIG[selectedOrder.status].color }
                    ]}
                    onPress={() => {
                      handleStatusChange(selectedOrder.id, selectedOrder.status);
                      setSelectedOrder(null);
                    }}>
                    <Text style={styles.modalButtonText}>
                      {selectedOrder.status === 'pending' && 'Iniciar Preparo'}
                      {selectedOrder.status === 'preparing' && 'Marcar Pronto'}
                      {selectedOrder.status === 'ready' && 'Marcar Entregue'}
                    </Text>
                  </TouchableOpacity>
                )}
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
  backButton: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  placeholder: {
    width: 40,
  },
  list: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderCustomer: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  orderTime: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
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
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  modalSection: {
    marginBottom: 12,
  },
  modalLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
    fontWeight: '600',
  },
  modalValue: {
    fontSize: 16,
    color: '#333',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalItemName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  modalItemPrice: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  modalTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTotalLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  modalTotalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
  },
  modalButton: {
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
