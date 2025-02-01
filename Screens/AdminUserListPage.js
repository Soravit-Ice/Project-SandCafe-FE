import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AdminUserListPage = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://project-sandcafe-be.onrender.com/api/getAllUser');
            const result = await response.json();
            if (result.status === 200) {
                const formattedData = result.data.map(user => ({
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    phone: user.phone_number,
                    isBlocked: false, // Add logic here if blocking info is available
                }));
                setUsers(formattedData);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleBlock = (userId) => {
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
        );
        setUsers(updatedUsers);
    };

    const navigateToEditPage = (userId) => {
        navigation.navigate('AdminEditUserPage', { userId });
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#224E7F" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#224E7F" />
            </TouchableOpacity>
            <Text style={styles.title}>User</Text>
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <View style={styles.userCard}>
                        <Text style={styles.userName}>{item.name}</Text>
                        <Text style={styles.userInfo}>Email: {item.email}</Text>
                        <Text style={styles.userInfo}>Phone: {item.phone}</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity onPress={() => toggleBlock(item.id)} style={styles.blockButton}>
                                <Ionicons
                                    name={item.isBlocked ? 'ios-remove-circle' : 'checkmark-circle'}
                                    size={24}
                                    color={item.isBlocked ? 'red' : 'green'}
                                />
                                <Text style={styles.actionText}>
                                    {item.isBlocked ? 'Blocked' : 'Active'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 50,
        backgroundColor: '#FFF',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#224E7F',
        marginBottom: 10,
    },
    userCard: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#FFF',
        elevation: 3,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#224E7F',
    },
    userInfo: {
        fontSize: 14,
        color: '#888',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    blockButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#555',
    },
    editButton: {
        backgroundColor: '#224E7F',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    editButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
});

export default AdminUserListPage;
