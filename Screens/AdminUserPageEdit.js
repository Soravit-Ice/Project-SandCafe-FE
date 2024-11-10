import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdminUserEditPage = ({ route, navigation }) => {
    const { userId } = route.params;
    const [userData, setUserData] = useState({
        id: userId,
        name: 'Onglee Oscar Adward',
        email: 'ongleeoscar@gmail.com',
        phone: '0674567890',
        photo: null,
    });

    const handleSave = () => {
        // Save updated user info logic here
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FF8A4C" />
            </TouchableOpacity>
            <Text style={styles.title}>User</Text>
            <View style={styles.photoContainer}>
                <TouchableOpacity>
                    <Ionicons name="camera" size={40} color="#FF8A4C" />
                </TouchableOpacity>
            </View>
            {userData.photo && <Image source={{ uri: userData.photo }} style={styles.userPhoto} />}
            <TextInput
                value={userData.name}
                onChangeText={(text) => setUserData({ ...userData, name: text })}
                placeholder="Name"
                style={styles.input}
            />
            <TextInput
                value={userData.email}
                onChangeText={(text) => setUserData({ ...userData, email: text })}
                placeholder="Email"
                style={styles.input}
            />
            <TextInput
                value={userData.phone}
                onChangeText={(text) => setUserData({ ...userData, phone: text })}
                placeholder="Phone"
                style={styles.input}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockButton}>
                    <Text style={styles.blockButtonText}>Block</Text>
                </TouchableOpacity>
            </View>
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
    backButton: {
        top: 0,
        left: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF7F50',
        textAlign:'center',
        marginBottom: 10,
    },
    photoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#FF8A4C',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    saveButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    blockButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    blockButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default AdminUserEditPage;
