import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";

const AdminAddMenu = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const categories = [
    { label: "Drinks", value: "drinks" },
    { label: "Desserts", value: "desserts" },
  ];
  
  const subcategories = {
    drinks: [
      { label: "Coffee", value: "coffee" },
      { label: "No Coffee", value: "no_coffee" },
      { label: "Soda", value: "soda" },
      { label: "Smoothie", value: "smoothie" },
    ],
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if(category === "Drinks"){
        if(!subcategory){
            Alert.alert("Error", "");
            return;
        }
    }
    if (!name || !price || !image || !category || (category === "Drinks" && !subcategory)) {
      Alert.alert("Error", "Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subcategory", subcategory || ""); 
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "menu_image.jpg",
    });

    try {
      const response = await fetch("https://project-sandcafe-be.onrender.com/api/saveProduct", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", result.message);
        navigation.navigate("AdminPage", { refresh: true });
      } else {
        Alert.alert("Error", result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to save product. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("AdminPage", { refresh: true })} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#224E7F" />
      </TouchableOpacity>

      <Text style={styles.title}>Add Menu</Text>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Ionicons name="camera-outline" size={50} color="#A4A4A4" />
        )}
      </TouchableOpacity>

      <Text style={styles.title2}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaaaaa"
        onChangeText={setName}
        value={name}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.title2}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#aaaaaa"
        onChangeText={setPrice}
        value={price}
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
      />

    <Text style={styles.title2}>Category</Text>
    <RNPickerSelect
  onValueChange={(value) => {
    setCategory(value);
    setSubcategory(""); // Reset subcategory when category changes
  }}
  items={categories}
  style={pickerStyles}
  placeholder={{ label: "Select a category", value: "" }}
  doneText="Done"
/>

{category && subcategories[category] && (
  <>
    <Text style={styles.title2}>Subcategory</Text>
    <RNPickerSelect
      onValueChange={setSubcategory}
      items={subcategories[category]}
      style={pickerStyles}
      placeholder={{ label: "Select a subcategory", value: "" }}
      doneText="Done"
    />
  </>
)}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};


const pickerStyles = StyleSheet.create({
    inputIOS: {
      height: 48,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#dddddd",
      backgroundColor: "white",
      paddingLeft: 16,
      zIndex:25000000,
      marginBottom: 10,
    },
    inputAndroid: {
      height: 48,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#dddddd",
      backgroundColor: "white",
      paddingLeft: 16,
      marginBottom: 10,
    },
  });

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 20,
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
  },
  title2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "left",
    marginTop: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    backgroundColor: "#E9E6FA",
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  input: {
    width: "100%",
    height: 48,
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dddddd",
    paddingLeft: 16,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#224E7F",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 50,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AdminAddMenu;
