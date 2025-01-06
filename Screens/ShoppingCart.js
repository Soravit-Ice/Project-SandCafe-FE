import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const ShoppingCartScreen = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSave = () => {
    navigation.navigate("Checkout", { refresh: true })

  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("UserPage", { refresh: true })}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#224E7F" />
      </TouchableOpacity>

      <Text style={styles.title}>Your Order</Text>

      {/* Scrollable Order Section */}
      <ScrollView style={styles.orderContainer}>
        <View style={styles.productContainer}>
          {/* Product Image */}
          <Image
            source={{ uri: "https://via.placeholder.com/100" }} // Replace with your product image URL
            style={styles.productImage}
          />

          {/* Product Details */}
          <View style={styles.productDetails}>
            <Text style={styles.productName}>Milk frappe</Text>
            <Text style={styles.productPrice}>45 Bath</Text>
            <Text style={styles.productNote}>* เพิ่มหวาน 75%</Text>

            {/* Quantity Controls */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={handleDecrease}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                onPress={handleIncrease}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Additional items can go here */}
      </ScrollView>

      {/* Fixed Footer */}
      <SafeAreaView style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.headerTextTotal}>ยอดชำระ</Text>
          <Text style={styles.headerTextTotal}>45</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Checkout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF6DD",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#224E7F",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  orderContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 250, // Space for footer
    marginTop:50
  },
  productContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#224E7F",
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  productNote: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#224E7F",
    borderRadius: 5,
    backgroundColor: "#E9E6FA",
  },
  quantityText: {
    fontSize: 18,
    color: "#224E7F",
    fontWeight: "bold",
  },
  quantityValue: {
    marginHorizontal: 10,
    fontSize: 18,
    color: "#224E7F",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#224E7F",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    minHeight:150
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop:20, 
    paddingLeft:25,
    paddingRight:25
  },
  headerTextTotal: {
    color: "white",
    fontSize: 20,
  },
  saveButton: {
    backgroundColor: "#FEF6DD",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginLeft:50,
    marginRight:50,
  },
  saveButtonText: {
    color: "#224E7F",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShoppingCartScreen;
