import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Checkout = () => {
  const navigation = useNavigation();

  const handlePayment = () => {
    alert("Proceeding to payment!");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#224E7F" />
      </TouchableOpacity>

      {/* Customer Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>คุณ</Text>
        <Text style={styles.detailText}>เบอร์โทรศัพท์: 064374658</Text>
        <Text style={styles.detailText}>วันที่รับสินค้า: 25 ธันวาคม 2025</Text>
        <Text style={styles.detailText}>เวลาที่ส่งสินค้า: 10.00 น.</Text>
      </View>

      {/* Logo */}
      <Image
        source={{ uri: "https://via.placeholder.com/150" }} // Replace with your logo URL
        style={styles.logo}
      />

      {/* Banking Details */}
      <View style={styles.bankDetailsContainer}>
        <Text style={styles.bankText}>ธนาคารกสิกรไทย</Text>
        <Text style={styles.bankText}>เลขที่บัญชี: 145-8-40942-7</Text>
        <Text style={styles.bankText}>Pichamol Khaewpud</Text>
      </View>

      {/* File Upload Section */}
      <View style={styles.fileUploadContainer}>
        <Text style={styles.fileUploadLabel}>แบบไฟล์</Text>
        <TextInput style={styles.fileInput} placeholder="Upload file here" />
      </View>

      {/* Pay Now Button */}
      <SafeAreaView style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>ชำระเงิน</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF6DD",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 10,
  },
  detailsContainer: {
    marginTop: 120,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    color: "#224E7F",
    fontWeight: "bold",
    marginBottom: 5,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  bankDetailsContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  bankText: {
    fontSize: 16,
    color: "#224E7F",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  fileUploadContainer: {
    marginBottom: 30,
  },
  fileUploadLabel: {
    fontSize: 16,
    color: "#224E7F",
    fontWeight: "bold",
    marginBottom: 10,
  },
  fileInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
  footer: {
    backgroundColor: "#224E7F",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  payButton: {
    backgroundColor: "#FEF6DD",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  payButtonText: {
    color: "#224E7F",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Checkout;
