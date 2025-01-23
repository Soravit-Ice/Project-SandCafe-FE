import React, { useState , useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation , useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProductDetail = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(0);
  const [note, setNote] = useState("");
  const [selectedSweetness, setSelectedSweetness] = useState(50);
  const route = useRoute(); // Access the route to get parameters
  const { productId } = route.params; 
  const increaseQuantity = () => {
    const newQuantity = quantity + 1; // Calculate the new quantity
    setQuantity(newQuantity);
    if (product) {
      setPrice(newQuantity * product.price); // Update the price based on the new quantity
    }
  };
  
  const sweetnessLevels = [
    { label: "เพิ่มหวาน 100%", value: 100 },
    { label: "เพิ่มหวาน 75%", value: 75 },
    { label: "หวานปกติ 50%", value: 50 },
    { label: "หวานน้อย 25%", value: 25 },
    { label: "ไม่หวาน 0%", value: 0 },
  ];


  const handleSelectSweetness = (value) => {
    setSelectedSweetness(value);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1; // Calculate the new quantity
      setQuantity(newQuantity);
      if (product) {
        setPrice(newQuantity * product.price); // Update the price based on the new quantity
      }
    }
  };

  const addToBusket = async () => {
    await saveProduct()
    navigation.goBack()
  }

  const buyNow = async () => {
    await  saveProduct()
        navigation.navigate("ShoppingCart", { refresh: true })
  }

  const saveProduct = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log("token",token)
        if (!token) {
          Alert.alert("Error", "Access token is missing.");
          return reject(new Error("Access token is missing."));
        }
  
        const bodyData = JSON.stringify({
          product_id: productId,
          quantity,
          sweetness_level: selectedSweetness,
          price,
          note,
        });
  
        const response = await fetch("https://project-sandcafe-be.onrender.com/api/addToOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: bodyData,
        });
  
        if (!response.ok) {
          const text = await response.text(); // Capture server response
          console.error("Server Response:", text);
          return reject(new Error("Failed to save the product. Check server logs."));
        }
  
        const result = await response.json();
        Alert.alert("Success", result.message);
        resolve(); // Resolve the promise
      } catch (error) {
        console.error("Error saving product:", error);
        Alert.alert("Error", "Unable to save product. Please try again.");
        reject(error); // Reject the promise
      }
    });
  };
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Replace with your API endpoint or data source
        const response = await fetch(`https://project-sandcafe-be.onrender.com/api/findProduct/${productId}`);
        const data = await response.json();
        console.log("data",data)
        setProduct(data.data);
        setPrice(data.data.price)
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#224E7F" />
      </TouchableOpacity>

      {/* Product Image */}
      {product && (
  <Image
    source={{ uri: product.image }} // Safe access
    style={styles.productImage}
  />
)}
      {/* Product Details */}
      {product &&( <Text style={styles.productName}>{product.name}</Text>)}

      <View style={styles.sweetnessContainer}>
        <Text style={styles.sectionTitle}>ระดับความหวาน</Text>
        <Text style={styles.sweetnessNote}>**ปกติสูตรทางร้านหวาน 50 %**</Text>
        {sweetnessLevels.map((level) => (
          <TouchableOpacity
            key={level.value}
            style={styles.sweetnessOption}
            onPress={() => handleSelectSweetness(level.value)}
          >
            <Ionicons
              name={
                selectedSweetness === level.value
                  ? "checkbox"
                  : "square-outline"
              }
              size={20}
              color="#224E7F"
              style={styles.checkboxIcon}
            />
            <Text style={styles.sweetnessLabel}>{level.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quantity and Price */}
      <View style={styles.quantityContainer}>
        <Text style={styles.sectionTitle}>จำนวน</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quantityContainer}>
      <Text style={styles.price}>ราคา</Text>
      <Text style={styles.price}>{price}.-</Text>
      </View>

      {/* Note Input */}
      <Text style={styles.sectionTitle}>Note</Text>
      <TextInput
        style={styles.noteInput}
        onChangeText={(text) => setNote(text)}
        value={note}
        placeholder="เช่น แยกน้ำแข็ง"
        placeholderTextColor="#A4A4A4"
      />

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addToBasketButton} onPress={addToBusket}>
          <Text style={styles.addToBasketText}>Add to Basket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton} onPress={buyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF6DD",
    paddingHorizontal: 40,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  productImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 100
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#224E7F",
    textAlign: "center",
    marginBottom: 20,
  },
  sweetnessContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#224E7F",
    marginBottom: 5,
  },
  sweetnessNote: {
    fontSize: 12,
    color: "#224E7F",
    marginBottom: 10,
  },
  sweetnessOption: {
    fontSize: 14,
    color: "#224E7F",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#224E7F",
    padding: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "#FEF6DD",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
    color: "#224E7F",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#224E7F",
    marginBottom: 20,
  },
  sweetnessLabel: {
    fontSize: 14,
    color: "#224E7F",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#A4A4A4",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    color: "#224E7F",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addToBasketButton: {
    backgroundColor: "#FEF6DD",
    borderWidth: 1,
    borderColor: "#224E7F",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  addToBasketText: {
    color: "#224E7F",
    fontSize: 16,
    fontWeight: "bold",
  },
  buyNowButton: {
    backgroundColor: "#224E7F",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buyNowText: {
    color: "#FEF6DD",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetail;
