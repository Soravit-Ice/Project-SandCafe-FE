import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderHistory = () => {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);

    const fetchOrderDetails = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");
            const response = await axios.get(`https://project-sandcafe-be.onrender.com/api/getOrderHistoryByUserId`, {
                headers: {
                    "x-access-token": token,
                },
            });
            console.log("response", response.data.data);
            const data = response.data.data;

            // Group orders by orderdetail_id
            const groupedOrders = data.reduce((acc, order) => {
                const { orderdetail_id } = order;
                if (!acc[orderdetail_id]) {
                    acc[orderdetail_id] = { ...order, items: [] };
                }
                acc[orderdetail_id].items.push(order);
                return acc;
            }, {});
            
            // เรียง `groupedOrders` ตาม `orderdetail_id` (จากมากไปน้อย)
            const sortedGroupedOrders = Object.values(groupedOrders).sort(
                (a, b) => b.orderdetail_id - a.orderdetail_id
            );
            setOrders(Object.values(sortedGroupedOrders));
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#224E7F" />
            </TouchableOpacity>
            <Text style={styles.title}>Order History</Text>
            <FlatList
                data={orders}
                renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.orderCard}
                                onPress={() => navigation.navigate('CheckoutOrderSummary', { orderId: item.orderdetail_id })}
                            >
                    <View style={styles.orderCard}>
                        {item?.items?.map((subItem) => (
                            <View key={subItem.id} style={styles.orderSubItem}>
                                <TouchableOpacity onPress={() => setPreviewImage(subItem?.product?.image)}>
                                    <Image source={{ uri: subItem?.product?.image }} style={styles.orderImage} />
                                </TouchableOpacity>
                                <Text style={styles.userName}>{subItem?.product?.name}</Text>
                                <Text style={styles.userName}>Note: {subItem?.note}</Text>
                                <Text style={styles.priceText}>Price: ${subItem.price}</Text>
                            </View>
                        ))}
                        <Text style={styles.totalPriceText}>
                            Total Price: ${item.items?.reduce((total, subItem) => total + subItem.price, 0)}
                        </Text>
                    </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.orderdetail_id.toString()}
            />
            {previewImage && (
                <Modal transparent={true} visible={!!previewImage} animationType="slide">
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={() => setPreviewImage(null)}>
                            <Ionicons name="close-circle" size={36} color="#224E7F" />
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
        color: '#224E7F',
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
    orderSubItem: {
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#224E7F',
    },
    priceText: {
        fontSize: 16,
        color: '#555',
        marginVertical: 5,
    },
    totalPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 10,
    },
    orderImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
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

export default OrderHistory;
