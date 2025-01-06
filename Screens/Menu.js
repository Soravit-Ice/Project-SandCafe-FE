import React from 'react';
import { View, Text, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Menu = () => {
    const navigation = useNavigation();
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            Alert.alert('Logged out');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#224E7F" />
            </TouchableOpacity>

            <View style={styles.profileContainer}>
                <Ionicons name="person-circle" size={80} color="#224E7F" />
                <Text style={styles.profileName}>EONNI cafe & cake</Text>
            </View>

            <View style={styles.menuOptionContainer}>
                <TouchableOpacity style={styles.menuOption} onPress={() => navigation.navigate('SaleAdmin')}>
                    <Text style={styles.menuText}>Sales</Text>
                    <Ionicons name="chevron-forward" size={24} color="#224E7F" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuOption} onPress={() => navigation.navigate('OrderAdmin')}>
                    <Text style={styles.menuText}>Order</Text>
                    <Ionicons name="chevron-forward" size={24} color="#224E7F" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuOption} onPress={() => navigation.navigate('AdminUserListPage')}>
                    <Text style={styles.menuText}>User</Text>
                    <Ionicons name="chevron-forward" size={24} color="#224E7F" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuOption} onPress={handleLogout}>
                    <Text style={styles.menuText}>Log Out</Text>
                    <Ionicons name="chevron-forward" size={24} color="#224E7F" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF6DD',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 30,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#224E7F',
        marginTop: 10,
    },
    menuOptionContainer: {
        marginTop: 20,
    },
    menuOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    menuText: {
        fontSize: 18,
        color: '#224E7F',
    },
});

export default Menu;
