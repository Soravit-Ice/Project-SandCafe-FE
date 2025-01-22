import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CheckoutFinal = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#224E7F" />
      </TouchableOpacity>

      {/* Success Text */}
      <View style={styles.textContainer}>
        <Text style={styles.successText}>ทำรายการเสร็จสิ้น</Text>
      </View>

      {/* Logo */}
      <Image
        source={require("../assets/new_logo.png")} // Replace with your logo path
        style={styles.logo}
      />

      {/* Back to Home Button */}
      <SafeAreaView style={styles.footer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("UserPage")} // Replace "Home" with your home screen route
        >
          <Text style={styles.homeButtonText}>กลับสู่หน้าหลัก</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF6DD",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  textContainer: {
    marginTop: 100,
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#224E7F",
    textAlign: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 20,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 40,
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#224E7F",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  homeButtonText: {
    color: "#FEF6DD",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutFinal;
