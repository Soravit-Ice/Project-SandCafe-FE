import React, { useState , useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
    const navigation = useNavigation();

    // State variables for user inputs
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    // Function to handle saving changes
    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");
            const response = await axios.post(
                'https://project-sandcafe-be.onrender.com/api/updateUser',
                { name, phoneNumber, email }, // Data sent to the backend
                {
                    headers: {
                        "x-access-token": token,
                    },
                }
            );

            if (response.status === 200) {
                Alert.alert('Success', 'Profile updated successfully!');
                navigation.goBack(); // Navigate back to the previous screen
            } else {
                Alert.alert('Error', response.data.error || 'Something went wrong!');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };

    const fetchUserData = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");
            const response = await axios.get('https://project-sandcafe-be.onrender.com/api/getUserById', {
                    headers: {
                        "x-access-token": token,
                    },
            });

            if (response.status === 200) {
                const { name, phone_number, email } = response.data.data; // Assuming user data is in `data`
                setName(name || '');
                setPhoneNumber(phone_number || '');
                setEmail(email || '');
            } else {
                Alert.alert('Error', response.data.error || 'Failed to fetch user data');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Unable to fetch user details. Please try again.');
        }
    };

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Ionicons name="arrow-back" size={24} color="#224E7F" />
            </TouchableOpacity>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <View style={styles.avatar}>
                    <Ionicons name="person" size={80} color="black" />
                </View>
                <Text style={styles.editText}>Edit Profile</Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
                {/* Name Field */}
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />

                {/* Phone Number Field */}
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                {/* Email Field */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
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
        zIndex: 10,
        padding: 10,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 70,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    editText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#224E7F',
        marginTop: 10,
    },
    form: {
        marginTop: 30,
    },
    label: {
        fontSize: 16,
        color: '#224E7F',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    saveButton: {
        backgroundColor: '#224E7F',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditProfile;
