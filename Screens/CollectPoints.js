import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CollectPoints = () => {
    const navigation = useNavigation();
    const [points, setPoints] = useState([]); // Points state
    const [loading, setLoading] = useState(true); // Loading state
    const [availablePoints, setAvailablePoints] = useState(0); // Available points
    const [redeemablePoints, setRedeemablePoints] = useState(10); // Default redeemable points

    // Fetch points from the backend
    const fetchPoints = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        try {
            const response = await axios.get('http://localhost:8080/api/getPointUserById', {
                headers: {
                    "x-access-token": token,
                },
            });

            const { availablePoints } = response.data.data;
            console.log("availablePoints", availablePoints);
            setAvailablePoints(availablePoints);

            // Generate dummy point circles based on total points
            const dummyPoints = Array.from({ length: 30 }, (_, index) => ({
                id: index + 1,
                collected: index < availablePoints, // Mark collected points based on availablePoints
            }));

            setPoints(dummyPoints);
        } catch (error) {
            console.error('Error fetching points:', error);
        } finally {
            setLoading(false);
        }
    };

    // Redeem points function
    const redeemPoints = async () => {
        if (availablePoints < redeemablePoints) {
            Alert.alert("Error", "You do not have enough points to redeem.");
            return;
        }

        const token = await AsyncStorage.getItem("accessToken");
        try {
            const response = await axios.post(
                'http://localhost:8080/api/redeemPoints',
                { redeemedPoints: redeemablePoints },
                {
                    headers: {
                        "x-access-token": token,
                    },
                }
            );

            const { message, status } = response.data;
            if (status === 200) {
                Alert.alert("Success", message);
                fetchPoints(); // Refresh points after redemption
            } else {
                Alert.alert("Error", "Failed to redeem points.");
            }
        } catch (error) {
            console.error('Error redeeming points:', error);
            Alert.alert("Error", "An error occurred while redeeming points.");
        }
    };

    useEffect(() => {
        fetchPoints();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#224E7F" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#224E7F" />
            </TouchableOpacity>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Ionicons name="person-circle" size={80} color="#224E7F" />
                <Text style={styles.userName}>Elizabeth Wang Adward</Text>
            </View>

            {/* Points Section */}
            <Text style={styles.pointsTitle}>สะสมแต้ม: {availablePoints}</Text>
            <FlatList
                data={points}
                numColumns={5}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.pointCircle, item.collected && styles.collectedCircle]}>
                        {item.collected && (
                            <Ionicons name="checkmark" size={24} color="#FFF" />
                        )}
                    </View>
                )}
                contentContainerStyle={styles.pointsGrid}
            />

            {/* Redeem Button */}
            <TouchableOpacity style={styles.redeemButton} onPress={redeemPoints}>
                <Text style={styles.redeemButtonText}>แลกแต้ม</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF6DD',
        padding: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 70,
        zIndex: 10,
        left: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 50,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#224E7F',
        marginTop: 10,
    },
    pointsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#224E7F',
        textAlign: 'center',
        marginVertical: 20,
    },
    pointsGrid: {
        alignItems: 'center',
    },
    pointCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#A4A4A4',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    collectedCircle: {
        backgroundColor: '#224E7F',
    },
    redeemButton: {
        backgroundColor: '#224E7F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 20,
    },
    redeemButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CollectPoints;
