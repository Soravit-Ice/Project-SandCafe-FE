import React, { useState , useEffect , useCallback} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView ,Alert} from 'react-native';
import { Ionicons , Feather , MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { registerForPushNotificationsAsync } from "../notificationFunction";
import { useFocusEffect } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"
const AdminPage = ({ navigation ,route}) => {
    const [drinks, setDrinks] = useState([]);
    const [activeTab, setActiveTab] = useState('drinks');
    const [activeTab2, setActiveTab2] = useState('coffee'); 
    const [longPressItem, setLongPressItem] = useState(null);
    const fetchDrinks = async () => {
        console.log("activeTab",activeTab , activeTab2)
        try {
          const response = await axios.get( `https://project-sandcafe-be.onrender.com/api/productFindAll?tab=${activeTab}&subcategory=${activeTab2}`);
          setDrinks(response.data.data);
        } catch (error) {
          console.error("Error fetching drinks:", error);
        }
      };

    useFocusEffect(
        useCallback(() => {
          if (route.params?.refresh) {
            fetchDrinks("drinks"); // Refresh data on navigation
          }
        }, [route.params])
      );

    useEffect(() => {
      fetchDrinks(activeTab);
    }, [activeTab, activeTab2]);

    const fetchAndSavePushToken = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        alert(token);
        const userToken = await AsyncStorage.getItem("accessToken");
        await axios.post("https://project-sandcafe-be.onrender.com/api/save-fcm-token", {
          token: token,
        }, {
          headers: { "x-access-token": userToken },
        });
      }else{
        alert("Failed to get push token for push notification!");
      }
    };
    
    // Call this function after admin logs in
    useEffect(() => {
      fetchAndSavePushToken();
    }, []);

    const onChangeTab2 = async () => {
        setActiveTab('desserts')
        setActiveTab2("")
        fetchDrinks()
    }

    const onChangeTab1 = async () => {
        setActiveTab('drinks')
        setActiveTab2("")
        fetchDrinks()
    }

    const deleteProduct = async (id) => {
      try {
          await axios.delete(`https://project-sandcafe-be.onrender.com/api/deleteProduct/${id}`).then((data)=>{
            if(data.status === 200){
              Alert.alert("สำเร็จ", "สินค้าถูกลบเรียบร้อยแล้ว");
            }else{
              Alert.alert("ล้มเหลว", "เกิดข้อผิดพลาดในการลบสินค้า");
            }
          });
          fetchDrinks(); // รีเฟรชข้อมูลใหม่หลังลบ
      } catch (error) {
          Alert.alert("ล้มเหลว", "เกิดข้อผิดพลาดในการลบสินค้า");
          console.error("Error deleting product:", error);
      }
  };

  const confirmDelete = (id) => {
      Alert.alert(
          "ยืนยันการลบ",
          "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?",
          [
              { text: "ยกเลิก", style: "cancel" },
              { text: "ลบ", style: "destructive", onPress: () => deleteProduct(id) }
          ]
      );
  };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <Text style={styles.headerText}>EONNI cafe & cake</Text>
                <TouchableOpacity  style={styles.profileIcon} onPress={() => navigation.navigate('Menu')}>
                    <Ionicons name="person-circle-outline" size={75} color="white" />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Tabs Section */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'drinks' && styles.activeTab]}
                    onPress={onChangeTab1}>
                    <Text style={[styles.tabText, activeTab === 'drinks' && styles.activeTabText]}>
                    เมนูเครื่องดื่ม
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'desserts' && styles.activeTab]}
                    onPress={onChangeTab2}>
                    <Text style={[styles.tabText, activeTab === 'desserts' && styles.activeTabText]}>
                        เมนูเค้ก
                    </Text>
                </TouchableOpacity>
            </View>
            {activeTab === 'drinks' ? (
  <View style={styles.tabsContainer}>
    <TouchableOpacity
      style={[
        styles.tab,
        activeTab2 === 'coffee' ? styles.activeTab : styles.inactiveTab
      ]}
      onPress={() => setActiveTab2('coffee')}
    >
      <View style={styles.iconContainer}>
        <Feather name="coffee" size={24} color={activeTab2 === 'coffee' ? "white" : "black"} />
        <Text style={[styles.tabText, { color: activeTab2 === 'coffee' ? "white" : "black" }]}>
          Coffee
        </Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.tab,
        activeTab2 === 'no_coffee' ? styles.activeTab : styles.inactiveTab
      ]}
      onPress={() => setActiveTab2('no_coffee')}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="coffee-off-outline" size={24} color={activeTab2 === 'noCoffee' ? "white" : "black"} />
        <Text style={[styles.tabText, { color: activeTab2 === 'noCoffee' ? "white" : "black" }]}>
          No Coffee
        </Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.tab,
        activeTab2 === 'soda' ? styles.activeTab : styles.inactiveTab
      ]}
      onPress={() => setActiveTab2('soda')}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="bottle-soda-classic-outline" size={24} color={activeTab2 === 'soda' ? "white" : "black"} />
        <Text style={[styles.tabText, { color: activeTab2 === 'soda' ? "white" : "black" }]}>
          Soda
        </Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.tab,
        activeTab2 === 'smoothie' ? styles.activeTab : styles.inactiveTab
      ]}
      onPress={() => setActiveTab2('smoothie')}
    >
      <View style={styles.iconContainer}>
        <Entypo name="drink" size={24} color={activeTab2 === 'smoothie' ? "white" : "black"} />
        <Text style={[styles.tabText, { color: activeTab2 === 'smoothie' ? "white" : "black" }]}>
          Smoothie
        </Text>
      </View>
    </TouchableOpacity>
  </View>
) : null}


            {/* Content Based on Active Tab */}
            <ScrollView contentContainerStyle={styles.drinksContainer}>
                {drinks ? (
                    
                    drinks.map((drink, index) => (
                      <TouchableOpacity
                      key={drink.id}
                      style={styles.drinkItem}
                      onLongPress={() => setLongPressItem(drink.id)} // เปิดปุ่มลบ
                  >
                        <View key={index} style={styles.drinkItem}>
                            <Image source={{ uri: drink.image }} style={styles.drinkImage} />
                            <Text style={styles.drinkName}>{drink.name}</Text>
                            <Text style={styles.drinkPrice}>{drink.price} ฿</Text>
                        </View>

                        {longPressItem === drink.id && (
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => confirmDelete(drink.id)}
                                >
                                    <Text style={styles.deleteButtonText}>ลบ</Text>
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>ไม่มีเมนูเค้กในขณะนี้</Text>
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.addButton}   onPress={() => navigation.navigate('AdminAddMenu')}>
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333333',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#224E7F',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        minHeight: 150,
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 20,
    },
    profileIcon: {
        position: 'relative',
        marginRight:20
    },
    notificationDot: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 80,
        right: 20,
        backgroundColor: '#FF8A4C',
        borderRadius: 10,
        padding: 10,
        zIndex: 10,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#EAEAEA',
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
        margin: 5,
    },
    inactiveTab: {
        backgroundColor: 'white', // Inactive background color
        borderWidth: 1, // Optional: Add border for better visual separation
        borderColor: '#ddd',
      },
    activeTab: {
        backgroundColor: '#224E7F',
    },
    tabText: {
        color: '#224E7F',
        marginTop: 5, 
        fontSize: 12,
        fontWeight: 'bold',
    },
    activeTabText: {
        color: 'white',
    },
    iconContainer: {
        alignItems: 'center', // Centers the icon and text horizontally
        justifyContent: 'center',
      },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuText: {
        color: '#FFF',
        fontSize: 16,
    },
    drinksContainer: {
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    drinkItem: {
        width: '15%',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 15,
    },
    drinkImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    drinkName: {
        marginTop: 10,
        color: '#224E7F',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    drinkPrice: {
        color: '#224E7F',
        textAlign: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#224E7F',
        borderRadius: 30,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    drinkItem: {
      position: 'relative',
      width: '45%',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 15,
  },
  deleteButton: {
      position: 'absolute',
      bottom: -10,
      right: -10,
      backgroundColor: 'red',
      borderRadius: 15,
      padding: 5,
  },
  deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
  },

});

export default AdminPage;
