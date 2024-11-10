import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                
                // Delay for 2 seconds before navigating
                setTimeout(() => {
                    if (token) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AdminPage' }],
                        });
                    } else {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    }
                }, 2000); // 2000 milliseconds = 2 seconds
            } catch (error) {
                console.error('Error checking token:', error);
                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }, 2000);
            }
        };

        checkToken();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/LogoSanDee.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: '100%',
        height: '100%',
        marginBottom: 20,
    },
});

export default SplashScreen;
