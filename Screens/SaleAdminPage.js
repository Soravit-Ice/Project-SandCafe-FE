import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ScrollView,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
const SaleAdminPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [dates, setDates] = useState([]);
    const [salesData, setSalesData] = useState([]);

    const navigation = useNavigation();

    const mockSalesData = {
        '2024-11-03': [{ id: 1, item: 'Milk Frappe', sale: 1 }],
        '2024-11-02': [{ id: 2, item: 'Brown Sugar', sale: 1 }],
        '2024-11-05': [{ id: 1, item: 'Milk Frappe', sale: 1 }, { id: 2, item: 'Brown Sugar', sale: 1 }],
    };

    useEffect(() => {
        const today = new Date();
        const pastDates = [];
        
        for (let i = 0; i < 8; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const formattedDate = date.toISOString().split('T')[0];
            pastDates.push(formattedDate);
        }

        setDates(pastDates.reverse());
        setSelectedDate(pastDates[5]); // Default selected date
    }, []);

    useEffect(() => {
        if (selectedDate) {
            setSalesData(mockSalesData[selectedDate] || []);
        }
    }, [selectedDate]);

    const RenderItem = ({ orderName , index }) => (
        <View style={styles.tableRow}>
            <Text style={styles.cell}>{index+1}.</Text>
            <Text style={styles.cell}>{orderName.item}</Text>
            <Text style={styles.cell}>{orderName.sale}</Text>
        </View>
    );

    const onClickData = (date) => {
        setSelectedDate(date);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FF8A4C" />
            </TouchableOpacity>
            <Text style={styles.title}>Sales</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateTabContainer}>
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
                <Text style={styles.headerText}>Order list</Text>
                <Text style={styles.headerText}>Sale</Text>
            </View>
            <FlatList
                data={salesData}
                renderItem={({ item, index }) => <RenderItem orderName={item} index={index} />}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.noDataText}>No sales data</Text>}
                style={styles.flatList} // เพิ่ม style นี้สำหรับ FlatList
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor: '#FFF',
        padding: 20,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top:10,
        left: 20,
    },
    backText: {
        fontSize: 20,
        color: '#FF7F50',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF7F50',
        marginBottom: 10,
    },
    dateTabContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    dateButton: {
        backgroundColor: '#FF7F50',
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
        marginBottom: 10,
        marginTop:-650
    },
    headerText: {
        fontWeight: 'bold',
        color: '#FF7F50',
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
        color: '#000',
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
    flatList: {
        flex: 1, // ทำให้ FlatList ขยายเต็มที่
        width: '100%', // เพื่อให้ FlatList ครอบคลุมพื้นที่ที่เหมาะสม
    },
});

export default SaleAdminPage;

