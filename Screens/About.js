import React , {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSizeContext } from '../App'
const About = () => {
    const { globalFontSize } = useContext(FontSizeContext);
    return (
        <View style={styles.container}>
            <Text style={[styles.text , { fontSize: globalFontSize }]}>About</Text>
            <View style={styles.container2}>
            <Text style={[styles.text2 , { fontSize: globalFontSize }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                 deserunt mollit anim id est laborum.
            </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop:15,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    container2: {
        flex: 1,
        borderRadius: 10,
        margin:10,
        padding:15,
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: '#5F9C94',
    },
    text: {
        fontWeight: 'bold',
        color: '#000',
    },

    text2: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default About;
