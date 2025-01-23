import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShoppingCartScreen = () => {
  const navigation = useNavigation();
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const fetchOrderDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(`https://project-sandcafe-be.onrender.com/api/getOrderDetail`, {
        headers: {
          "x-access-token": token,
        },
      });
      const data = response.data.data;
      console.log("data",data)
      setOrderItems(data?.orderItems);
      setTotalPrice(data?.totalPrice ?? 0);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const fetchDiscount = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(`https://project-sandcafe-be.onrender.com/api/getDiscount`, {
        headers: { "x-access-token": token },
      });
      const data = response?.data;
      setDiscount(data?.discount ?? 0);
    } catch (error) {
      console.error("Error fetching discount:", error);
    }
  };

  // Fetch order details from the backend
  useEffect( () => {
     fetchOrderDetails();
     fetchDiscount();
  }, []);

  useEffect(() => {
    const discountedPrice = totalPrice - (totalPrice * discount);
    setFinalPrice(discountedPrice);
  }, [totalPrice, discount]);

  // Handle increase quantity
  const updateOrderItem = async (itemId, quantity) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.put(
        `https://project-sandcafe-be.onrender.com/api/updateOrderItem/${itemId}`,
        { quantity },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log("response",response)
    } catch (error) {
      console.error("Error updating order item:", error);
      Alert.alert("Error", "Failed to update the item. Please try again.");
    }
  };
  
  const handleIncrease = async (itemId) => {
    const item = orderItems?.find((item) => item.id === itemId);
    if (item) {
     await updateOrderItem(itemId, item.quantity + 1);
      fetchOrderDetails();
    }
  };
  
  const handleDecrease = async (itemId) => {
    const item = orderItems?.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
        await updateOrderItem(itemId, item.quantity - 1);
      fetchOrderDetails();
    }
  };
  // Handle delete item
  const deleteOrderItem = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      await axios.delete(`https://project-sandcafe-be.onrender.com/api/deleteOrderItem/${itemId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      fetchOrderDetails();
    } catch (error) {
      console.error("Error deleting order item:", error);
      Alert.alert("Error", "Failed to delete the item. Please try again.");
    }
  };

  // Calculate total price dynamically
  useEffect(() => {
    const newTotal = orderItems?.reduce(
      (sum, item) => sum + item.price,
      0
    );
    setTotalPrice(newTotal);
  }, [orderItems]);

  // Handle checkout
  const handleCheckout = async () => {
      navigation.navigate("Checkout", { refresh: true });
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
        {orderItems?.map((item) => (
          <View key={item.id} style={styles.productContainer}>
            <Image
              source={{ uri: item.product.image }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.product.name}</Text>
              <Text style={styles.productPrice}>{item.price} Bath</Text>
              <Text style={styles.productNote}>
                * เพิ่มหวาน {item.sweetness_level}%
              </Text>
            </View>
            <View style={styles.actionContainer}>
              {/* Quantity Controls */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => handleDecrease(item.id)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleIncrease(item.id)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Delete Button */}
              <TouchableOpacity
                onPress={() => deleteOrderItem(item.id)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash-outline" size={24} color="#FF5C5C" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Fixed Footer */}
      <SafeAreaView style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.headerTextTotal}>ราคา</Text>
          <Text style={styles.headerTextTotal}>{totalPrice} บาท</Text>
        </View>

        {discount > 0 && orderItems  && (
          <View style={styles.footerContent}>
            <Text style={styles.headerTextTotal}>Discount (10%)</Text>
            <Text style={styles.headerTextTotal}>-{((totalPrice * discount)).toFixed(2)} บาท</Text>
          </View>
        )}
{discount > 0 && orderItems && (
        <View style={styles.footerContent}>
          <Text style={styles.headerTextTotal}>Final Price</Text>
          <Text style={styles.headerTextTotal}>{finalPrice.toFixed(2)} บาท</Text>
        </View>
              )}

<TouchableOpacity
  style={[
    styles.checkoutButton,
    (!totalPrice || totalPrice === 0) && styles.disabledButton,
  ]}
  onPress={handleCheckout}
  disabled={!totalPrice || totalPrice === 0}
>
  <Text
    style={[
      styles.checkoutButtonText,
      (!totalPrice || totalPrice === 0) && styles.disabledButtonText,
    ]}
  >
    Checkout
  </Text>
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
    top: 80,
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
  disabledButton: {
    backgroundColor: '#A9A9A9', // Gray for disabled
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

  checkoutButton: {
    backgroundColor: "#FEF6DD",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 50,
  },
  checkoutButtonText: {
    color: "#224E7F",
    fontSize: 18,
    fontWeight: "bold",
  },

  actionContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  deleteButton: {
    marginLeft: 10,
  },
});

export default ShoppingCartScreen;
