import React,{useState , useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Checkout = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const handlePayment = () => {
    navigation.navigate("CheckoutFinal", { refresh: true })
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };


  const checkOutOrder = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const formData = new FormData();
  

      if (selectedImage) {
        formData.append("file", {
          uri: selectedImage?.uri,
          name: selectedImage?.fileName || "image/jpeg",
          type: selectedImage?.type || "image/jpeg",
        });
      }
  
      formData.append("user_id", userDetail?.id || ""); 
      formData.append("delivery_date", deliveryDate);
        console.log("fromdata" , formData)
       axios.post(
        "https://project-sandcafe-be.onrender.com/api/checkoutOrder",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      );
  
      navigation.navigate("CheckoutFinal", { refresh: true });
    } catch (error) {
      console.error("Error during checkout:", error.message);
      Alert.alert("Error", "Failed to complete the checkout. Please try again.");
    }
  };


    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");
          const response = await axios.get(
            `https://project-sandcafe-be.onrender.com/api/getUserById`,
            {
              headers: {
                "x-access-token": token,
              },
            }
          );
          const data = await response.data.data;
          console.log("data",data)
          setUserDetail(data)
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      const calculateDeliveryDate = () => {
        const today = new Date();
        const delivery = new Date(today);
        delivery.setDate(today.getDate() + 2); // Add 2 days
        const options = { day: "numeric", month: "long", year: "numeric" };
        setDeliveryDate(delivery.toLocaleDateString("th-TH", options)); // Format in Thai
      };
  
      calculateDeliveryDate();
        fetchUserDetails();
    }, []);


  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#224E7F" />
      </TouchableOpacity>

      {/* Customer Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>คุณ : {userDetail?.name}</Text>
        <Text style={styles.detailText}>เบอร์โทรศัพท์: {userDetail?.phone_number}</Text>
        <Text style={styles.detailText}>วันที่รับสินค้า: {deliveryDate}</Text>
        <Text style={styles.detailText}>เวลาที่ส่งสินค้า: 10.00 น.</Text>
      </View>

      {/* Logo */}
      <Image
        source={require('../assets/new_logo.png')}  // Replace with your logo URL
        style={styles.logo}
      />

      {/* Banking Details */}
      <View style={styles.bankDetailsContainer}>
        <Text style={styles.bankText}>ธนาคารกสิกรไทย</Text>
        <Text style={styles.bankText}>เลขที่บัญชี: 145-8-40942-7</Text>
        <Text style={styles.bankText}>Pichamol Khaewpud</Text>
      </View>

      <View style={styles.fileUploadContainer}>
        <Text style={styles.fileUploadLabel}>แบบไฟล์</Text>
        <TouchableOpacity style={styles.fileInput} onPress={pickImage}>
          <Text>{selectedImage ? selectedImage.fileName : "Upload image here"}</Text>
        </TouchableOpacity>
      </View>

      {/* Pay Now Button */}
      <SafeAreaView style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={checkOutOrder}>
          <Text style={styles.payButtonText}>ชำระเงิน</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
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
    width: 400,
    height: 400,
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
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  payButton: {
    backgroundColor: "#224E7F",
    color:"#FEF6DD",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  payButtonText: {
    color: "#FEF6DD",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Checkout;
