import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CheckoutOrder = () => {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/getOrderDetailAdmin`);
            const data = response.data.data;
            setOrders(data);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/changeStatusOrder/${orderId}`,
                { status }
            );
            if (response.status === 200) {
                fetchOrderDetails(); // Refresh orders after status update
            }
        } catch (error) {
            console.error(`Error updating order status for ${orderId}:`, error);
        }
    };

    const confirmOrder = (orderId) => {
        updateOrderStatus(orderId, 1); // 1 = Confirm
    };

    const rejectOrder = (orderId) => {
        updateOrderStatus(orderId, 2); // 2 = Reject
    };

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FF8A4C" />
            </TouchableOpacity>
            <Text style={styles.title}>Checkout Orders</Text>
            <FlatList
                data={orders}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <TouchableOpacity onPress={() => setPreviewImage(item.image)}>
                            <Image source={{ uri: item.image }} style={styles.orderImage} />
                        </TouchableOpacity>
                        <Text style={styles.userName}>{item.name}</Text>
                        <Text style={styles.priceText}>Price: ${item.price}</Text>
                        {item.status === 'Confirm' ? (
                            <Text style={styles.successText}>Order Confirmed</Text>
                        ) : (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity 
                                    style={[styles.confirmButton, item.status === 'Confirm' && styles.disabledButton]} 
                                    onPress={() => confirmOrder(item.id)}
                                    disabled={item.status === 'Confirm'}
                                >
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.rejectButton} 
                                    onPress={() => rejectOrder(item.id)}
                                >
                                    <Text style={styles.buttonText}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            {previewImage && (
                <Modal transparent={true} visible={!!previewImage} animationType="slide">
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={() => setPreviewImage(null)}>
                            <Ionicons name="close-circle" size={36} color="#FF8A4C" />
                        </TouchableOpacity>
                        <Image source={{ uri: previewImage }} style={styles.modalImage} />
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 50,
        backgroundColor: '#FEF6DD',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FF7F50',
        marginBottom: 10,
    },
    orderCard: {
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF7F50',
    },
    priceText: {
        fontSize: 16,
        color: '#555',
        marginVertical: 5,
    },
    orderImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    successText: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    confirmButton: {
        backgroundColor: 'green',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    rejectButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    backButton: {
        top: 0,
        left: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalImage: {
        width: '90%',
        height: '70%',
        borderRadius: 8,
    },
    modalCloseButton: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
});

export default CheckoutOrder;
