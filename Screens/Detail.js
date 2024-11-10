import React, { useContext } from 'react';
import { View, Text, StyleSheet,ImageBackground } from 'react-native';
import { FontSizeContext } from '../App'; // Adjust the import path as needed

const Detail = ({ route }) => {
    const { globalFontSize } = useContext(FontSizeContext);
    const { title, imageUrl,detail } = route.params;

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { fontSize: globalFontSize }]}>{title}</Text>
            <ImageBackground source={{ uri: imageUrl }} style={styles.image}>
             </ImageBackground>
             <Text style={[styles.title2, { fontSize: globalFontSize }]}>{detail}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'start',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title2: {
        width: '100%',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom:15,
        justifyContent: 'flex-end',
    },
});

export default Detail;
