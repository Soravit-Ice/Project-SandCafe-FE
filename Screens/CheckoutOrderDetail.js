import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CheckoutOrderSummary = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { orderId } = route.params;
    const [orderDetails, setOrderDetails] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const fetchOrderSummary = async () => {
            try {
                const response = await axios.get(
                    `https://project-sandcafe-be.onrender.com/api/getOrderItemsDetailByOrderId/${orderId}`
                );
                setOrderDetails(response.data);
            } catch (error) {
                console.error("Error fetching order summary:", error);
            }
        };

        fetchOrderSummary();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#224E7F" />
            </TouchableOpacity>
            <Text style={styles.title}>Order Summary</Text>

            {orderDetails ? (
                <View>
                    {/* Slip Image Preview */}
                    <TouchableOpacity onPress={() => setPreviewImage(orderDetails.slip)}>
                        <Image source={{ uri: orderDetails.slip }} style={styles.slipImage} />
                    </TouchableOpacity>

                    <Text style={styles.orderText}>Order ID: {orderDetails.orderId}</Text>
                    <Text style={styles.orderText}>คุณ: {orderDetails.user.name}</Text>
                    <Text style={styles.orderText}>เบอร์: {orderDetails.user.phone_number}</Text>
                    <Text style={styles.orderText}>Price: {orderDetails.price} ฿</Text>
                    <Text style={styles.subTitle}>รายการสั่งซื้อ:</Text>
                    <FlatList
                        data={orderDetails.products}
                        renderItem={({ item , index }) => (
                            <View style={styles.itemContainer} key={index}>
                                <Text style={styles.itemText}>✦ {item.quantity} x {item.name}</Text>
                                <Text style={styles.itemDetail}>ความหวาน: {item.sweetness_level}%</Text>
                                {item.note && <Text style={styles.noteText}>Note: {item.note}</Text>}
                            </View>
                        )}
                        keyExtractor={(item , index) => `${item.id}-${index}`}
                    />
                </View>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}

            {/* Image Modal for Preview */}
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
        color: '#224E7F',
        marginBottom: 10,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    slipImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'center',
    },
    orderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#224E7F',
        marginTop: 15,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    itemDetail: {
        fontSize: 16,
        color: '#555',
    },
    noteText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#777',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
        color: '#777',
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

export default CheckoutOrderSummary;
