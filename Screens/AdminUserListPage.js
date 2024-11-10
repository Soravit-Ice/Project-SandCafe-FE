import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AdminUserListPage = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([
        { id: '1', name: 'Elizabeth Wang Adward', email: 'ElizabethWang@gmail.com', phone: '0633030333', isBlocked: true },
        { id: '2', name: 'Onglee Oscar Adward', email: 'ongleeoscar@gmail.com', phone: '0674567890', isBlocked: false },
    ]);

    const toggleBlock = (userId) => {
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
        );
        setUsers(updatedUsers);
    };

    const navigateToEditPage = (userId) => {
        navigation.navigate('AdminEditUserPage', { userId });
    };

    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FF8A4C" />
            </TouchableOpacity>
            <Text style={styles.title}>User</Text>
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <View style={styles.userCard}>
                        <Text style={styles.userName}>{item.name}</Text>
                        <Text style={styles.userInfo}>{item.email}</Text>
                        <Text style={styles.userInfo}>{item.phone}</Text>
                        <TouchableOpacity  style={styles.blockButton}>
                            <Ionicons name={item.isBlocked ? 'ios-remove-circle' : 'checkmark-circle'} size={24} color={item.isBlocked ? 'red' : 'green'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigateToEditPage(item.id)} style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop:50,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign:'center',
        color: '#FF7F50',
        marginBottom: 10,
    },
    userCard: {
        padding: 15,
        marginBottom: 10,
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
    userInfo: {
        fontSize: 14,
        color: '#888',
    },
    blockButton: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    editButton: {
        marginTop: 10,
        backgroundColor: '#FF8A4C',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    editButtonText: {
        color: '#FFF',
        textAlign:'center',
        fontWeight: 'bold',
    },
    backButton: {
        top: 0,
        left: 0,
    },
});

export default AdminUserListPage;
