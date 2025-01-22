import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image, StyleSheet, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Please fill in both email and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data = await response.json();

            if (data.status === 200) {
                console.log('Login successful', data.roles[0].role.name );
                await AsyncStorage.setItem('accessToken', data.token);
                await AsyncStorage.setItem('role', data.roles[0].role.name);

                // Check role and navigate accordingly
                if (data.roles[0].role.name === "ADMIN") {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'AdminPage' }],
                        })
                    );
                } else {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'UserPage' }],
                        })
                    );
                }
            } else {
                Alert.alert('Error', 'Invalid login credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    const handleRegister = () => {
        // Navigate to the registration screen
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/imagePro.png')} style={styles.logo} />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.title2}>Sign to continute</Text>
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
            <TouchableOpacity style={styles.forgetButton} onPress={handleRegister}>
                <Text style={styles.registerText2}> Forget Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerText}>Don't have an account?<Text style={styles.registerText2}> Create an Account</Text></Text>
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
    logo:{
        marginBottom:20
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color:'#224E7F',
        marginBottom: 20,
    },
    title2: {
        fontSize: 22,
        color:'#224E7F',
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
    forgetButton: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    registerText: {
        color: '#000',
        fontSize: 14,
    },
    registerText2: {
        color: '#224E7F',
        fontSize: 14,
    },
});

export default Login;
