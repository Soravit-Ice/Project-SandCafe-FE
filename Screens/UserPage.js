import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserPage = ({ navigation }) => {
    const drinks = [
        { name: 'Milk frappe', price: '40 Bath', image: require('../assets/HomeLogo.jpeg') },
        { name: 'Thai Tea', price: '55 Bath', image: require('../assets/HomeLogo.jpeg') },
        { name: 'Green Tea Frappe', price: '60 Bath', image: require('../assets/HomeLogo.jpeg') },
        { name: 'Brown Sugar', price: '60 Bath', image: require('../assets/HomeLogo.jpeg') },
        { name: 'Pink Milk Oreo', price: '55 Bath', image: require('../assets/HomeLogo.jpeg') },
        { name: 'Blue Paradise Soda', price: '40 Bath', image: require('../assets/HomeLogo.jpeg') },
    ];



    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <View>
                <Text style={styles.headerText}>Hi</Text>
                <Text style={styles.headerText2}>Elizabeth  Wang Adward</Text>
                </View>
                <TouchableOpacity  style={styles.profileIcon} onPress={() => navigation.navigate('Menu')}>
                    <Ionicons name="person-circle-outline" size={75} color="white" />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </SafeAreaView>


            <ScrollView contentContainerStyle={styles.drinksContainer}>
                {drinks.map((drink, index) => (
                    <View key={index} style={styles.drinkItem}>
                        <Image source={drink.image} style={styles.drinkImage} />
                        <Text style={styles.drinkName}>{drink.name}</Text>
                        <Text style={styles.drinkPrice}>{drink.price}</Text>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.addButton}   onPress={() => navigation.navigate('AdminAddMenu')}>
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333333',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FF8A4C',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        minHeight: 150,
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 20,
    },
    headerText2: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 20,
    },
    profileIcon: {
        position: 'relative',
        marginRight:20
    },
    notificationDot: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 80,
        right: 20,
        backgroundColor: '#FF8A4C',
        borderRadius: 10,
        padding: 10,
        zIndex: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuText: {
        color: '#FFF',
        fontSize: 16,
    },
    drinksContainer: {
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    drinkItem: {
        width: '45%',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 15,
    },
    drinkImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    drinkName: {
        marginTop: 10,
        color: '#FF8A4C',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    drinkPrice: {
        color: '#FF8A4C',
        textAlign: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FF8A4C',
        borderRadius: 30,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UserPage;
