import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleRegister = async () => {
        // Validate input fields
        if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    phone_number: phone,
                    password: password,
                    role: 'USER',
                }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', data.message);
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    const handleNavigateToLogin = () => {
        // Navigate to the login screen
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.title1}>Create a new account</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setName(text)}
                value={name}
                autoCapitalize="words"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={handleNavigateToLogin}>
                <Text style={styles.registerText1}>Already have an account? <Text style={styles.registerText}>Login</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FEF6DD',
    },
    title: {
        color:"#224E7F",
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title1: {
        color:"#224E7F",
        fontSize: 20,
        marginBottom: 20,
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
    button: {
        width: '100%',
        height: 48,
        borderRadius: 5,
        backgroundColor: '#224E7F',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#ffff',
        fontSize: 16,
    },
    registerButton: {
        marginTop: 20,
    },
    registerText: {
        color: '#224E7F',
        fontSize: 14,
    },
});

export default Register;
