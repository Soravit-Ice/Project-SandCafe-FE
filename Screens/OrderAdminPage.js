import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ScrollView,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import axios from 'axios';
const OrderAdminPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [dates, setDates] = useState([]);
    const [salesData, setSalesData] = useState([]);

    const navigation = useNavigation();

    // Format date to DD/MM/YYYY
    const formatToDDMMYYYY = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Fetch data based on the selected date
    const fetchDateDefault = async (date) => {
        try {
            const formattedDate = formatToDDMMYYYY(new Date(date));
            console.log("Fetching data for:", formattedDate);

            const response = await axios.get(
                `https://project-sandcafe-be.onrender.com/api/orders?date=${formattedDate}`
            );
            console.log("Response:", response.data);

            if (response.data && response.data.data) {
                setSalesData(response.data.data);
            } else {
                setSalesData([]); // Clear if no data
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setSalesData([]); // Clear on error
        }
    };

    // Initialize dates and default selection
    useEffect(() => {
        const today = new Date();
        const pastDates = [];

        for (let i = 0; i < 8; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            pastDates.push(date.toISOString().split('T')[0]);
        }

        setDates(pastDates.reverse());
        const defaultDate = pastDates[5];
        setSelectedDate(defaultDate);
        fetchDateDefault(defaultDate); // Fetch data for default date
    }, []);

    // Fetch data when a date is selected
    const onClickData = (date) => {
        setSelectedDate(date);
        fetchDateDefault(date);
    };

    // Render individual rows
    const RenderItem = ({ orderName, index }) => (
        <View style={styles.tableRow}>
            <Text style={styles.cell}>{index + 1}.</Text>
            <Text style={styles.cell}>{orderName?.product?.name}</Text>
            <Text style={styles.cell}>{orderName.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#224E7F" />
            </TouchableOpacity>
            <Text style={styles.title}>Order</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateTabContainer}
            >
                {dates.map((date) => (
                    <Pressable
                        key={date}
                        onPress={() => onClickData(date)}
                        style={[
                            styles.dateButton,
                            selectedDate === date && styles.dateButtonSelected,
                        ]}
                    >
                        <Text style={styles.dateText}>{new Date(date).getDate()}</Text>
                    </Pressable>
                ))}
            </ScrollView>
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>No.</Text>
                <Text style={styles.headerText}>Order Name</Text>
                <Text style={styles.headerText}>Price</Text>
            </View>
            <FlatList
                data={salesData}
                renderItem={({ item, index }) => <RenderItem orderName={item} index={index} />}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.noDataText}>No sales data</Text>}
                style={styles.flatList}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        zIndex:999999,
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#224E7F',
        marginBottom: 20,
        textAlign: 'center',
    },
    dateTabContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    dateButton: {
        backgroundColor: '#224E7F',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 4,
        height: 35,
    },
    dateButtonSelected: {
        backgroundColor: '#ffa366',
    },
    dateText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 600,
    },
    headerText: {
        fontWeight: 'bold',
        color: '#224E7F',
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    cell: {
        textAlign: 'center',
        fontSize: 20,
        flex: 1,
        color: '#224E7F',
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
    flatList: {
        flex: 1,
        width: '100%',
    },
});

export default OrderAdminPage;

