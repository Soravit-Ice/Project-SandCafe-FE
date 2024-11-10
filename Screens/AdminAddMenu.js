import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AdminAddMenu = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FF8A4C" />
            </TouchableOpacity>

            <Text style={styles.title}>Add Menu</Text>

            <View style={styles.imageContainer}>
                <Ionicons name="camera-outline" size={50} color="#A4A4A4" />
            </View>
            <Text style={styles.title2}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setName(text)}
                value={name}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text style={styles.title2}>Price</Text>
            <TextInput
                style={styles.input}
                placeholder="Price"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPrice(text)}
                value={price}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:20,
        backgroundColor: '#FFF',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF8A4C',
        textAlign: 'center',
        marginTop: 50,
    },
    title2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom:10,
        textAlign: 'left',
        marginTop: 20,
    },
    imageContainer: {
        width: 150,
        height: 150,
        backgroundColor: '#E9E6FA',
        alignSelf: 'center',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    input: {
        width: '100%',
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#dddddd',
        paddingLeft: 16,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#FF8A4C',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop:50,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AdminAddMenu;
