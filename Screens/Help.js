import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontSizeContext } from '../App'; // Adjust the import path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
const Help = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigation = useNavigation();


    const handleSubmit = () => {
        if (email === "" || message === "") {
            Alert.alert('Please enter email or message');
            return;
        }
        Alert.alert('Sent Email');
        navigation.navigate('Home');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Help</Text>
                    <Text style={styles.text3}>Need advices? Reach out.</Text>
                    <Text style={styles.text2}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <Text style={styles.text2}>Message:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Message"
                        onChangeText={setMessage}
                        value={message}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Confirm</Text>
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
        justifyContent: 'flex-start',
        marginTop:15,
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
    },
    text: {
        fontSize: 20,
        margin:12,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center', 
    },
    text2: {
        margin:12,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        paddingLeft:30,
    },
    text3: {
        margin:12,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
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
        alignSelf: 'center', 
    },
    button: {
        width: '80%',
        height: 48,
        borderRadius: 5,
        backgroundColor: '#788eec',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center', 
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

export default Help;
