import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontSizeContext } from '../App'; // Adjust the import path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
const Settings = () => {
    const [fontSize, setFontSize] = useState(20);
    const { setGlobalFontSize } = useContext(FontSizeContext);
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

    const handleChangeFontSize = () => {
        const size = parseInt(fontSize);
        if (isNaN(size) || size <= 0) {
            Alert.alert('Please enter a valid number');
            return;
        }
        setGlobalFontSize(size);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Settings Screen</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter font size"
                        keyboardType="numeric"
                        onChangeText={setFontSize}
                        value={fontSize}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleChangeFontSize}>
                        <Text style={styles.buttonText}>Change Font Size</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'start',
        marginTop:15,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    input: {
        width: '80%',
        height: 48,
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#dddddd',
        paddingLeft: 16,
        marginVertical: 10,
    },
    button: {
        width: '80%',
        height: 48,
        borderRadius: 5,
        backgroundColor: '#788eec',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    logoutButton: {
        width: '80%',
        height: 48,
        borderRadius: 5,
        backgroundColor: '#e74c3c',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
});

export default Settings;
