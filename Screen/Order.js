import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Modal,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
const { height, width } = Dimensions.get("window");
import { ScaledSheet } from "react-native-size-matters";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Camera } from "expo-camera";
import { ref, onValue, push } from "firebase/database";
import { db } from "../config";
import { useNavigation } from "@react-navigation/native";

export default function Order() {
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1); // Initial count
  const [Item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [scannedItemData, setScannedItemData] = useState(null);
  const [ItemCount, setItemCount] = useState(null);
  const [TotalWeight, setTotalWeight] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const ItemRef = ref(db, "Iteam");
    const ItemCountRef = ref(db, "ItemCount");
    const TotalWeightRef = ref(db, "TotalWeight");

    onValue(ItemRef, (snapshot) => {
      const data = snapshot.val();

      setItem(data);
    });

    onValue(ItemCountRef, (snapshot) => {
      const data = snapshot.val();

      setItemCount(data);
    });

    onValue(TotalWeightRef, (snapshot) => {
      const data = snapshot.val();

      setTotalWeight(data);
    });
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      if (Item && Item[data]) {
        const matchedItem = Item[data];
        const existingItemIndex = items.findIndex(
          (item) => item.Name === matchedItem.Name
        );
        if (existingItemIndex !== -1) {
          // If the scanned item already exists in the list, increase its count
          const newItems = [...items];
          newItems[existingItemIndex].count++;
          setItems(newItems);
        } else {
          // If the scanned item is not in the list, add it to the list
          setItems([...items, { ...matchedItem, count: 1 }]);
        }
        setModalVisible(false);
      } else {
        Alert.alert("Invalid QR Code", "Unrecognized Item");
        setModalVisible(false);
      }
    }
  };

  const increaseCount = (index) => {
    const newItems = [...items];
    newItems[index].count++;
    setItems(newItems);
  };
  const decreaseCount = (index) => {
    const newItems = [...items];
    newItems[index].count--;
    if (newItems[index].count === 0) {
      newItems.splice(index, 1); // Remove the item from the array
    }
    setItems(newItems);
  };

  const calculateTotalItemCount = () => {
    let totalCount = 0;
    items.forEach((item) => {
      totalCount += item.count;
    });
    return totalCount;
  };

  const calculateTotalWeight = () => {
    let totalWeight = 0;
    items.forEach((item) => {
      totalWeight += item.Weight * item.count;
    });
    return totalWeight;
  };

  const handlePayment = () => {
    // Prepare data to send to Firebase
    const paymentData = {
      items: items.map(({ Name, Weight, Price, count }) => ({
        Name,
        Weight,
        Price,
        count,
      })),
      totalCount: calculateTotalItemCount(),
      totalWeight: calculateTotalWeight(),
    };

    // Write data to Firebase under a unique id
    const paymentRef = ref(db, "payments");
    push(paymentRef, paymentData)
      .then(() => {
        setItems([]);
        alert("Payment successfully!");
        navigation.navigate("Home");
      })
      .catch((error) => {
        // Handle errors
        alert("Error adding data");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          width: width / 1,
          height: height / 10,
          //   backgroundColor: "red",
          justifyContent: "center",
        }}
      >
        <Text style={styles.HeadText}>My cart</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item, index) => (
              <View key={index} style={styles.Box}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.ImageBox}>
                    <Image
                      style={[styles.image, StyleSheet.absoluteFillObject]}
                      source={{ uri: item.Image }}
                    />
                  </View>
                  <View style={{ flexDirection: "colum" }}>
                    <Text style={styles.BoxText}>{item.Name}</Text>
                    <Text style={styles.BoxQuantityText}>
                      Weight: {item.Weight} g
                    </Text>
                    <Text style={styles.BoxQuantityText}>
                      Price: Rs:{item.Price}
                    </Text>
                  </View>
                </View>
                <View style={styles.CountBox}>
                  <TouchableHighlight
                    onPress={() => decreaseCount(index)}
                    underlayColor="transparent"
                  >
                    <Entypo name="minus" size={24} color="#6dd051" />
                  </TouchableHighlight>
                  <Text style={styles.CountNumberText}>{item.count}</Text>
                  <TouchableHighlight
                    onPress={() => increaseCount(index)}
                    underlayColor="transparent"
                  >
                    <Entypo name="plus" size={24} color="#6dd051" />
                  </TouchableHighlight>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Display total item count */}
        <View style={styles.totalItem}>
          <Text style={styles.totalItemText}>
            Total Items: {calculateTotalItemCount()}
          </Text>

          {/* Conditional rendering for error text */}
          {ItemCount !== calculateTotalItemCount() &&
            calculateTotalItemCount() !== 0 && (
              <Text style={styles.ErrorText}>
                The total item count is mismatched.
              </Text>
            )}

          {/* Display total weight */}
          <Text style={styles.totalItemText}>
            Total Weight: {calculateTotalWeight()} g
          </Text>

          {/* Conditional rendering for error text */}
          {TotalWeight !== calculateTotalWeight() &&
            calculateTotalItemCount() !== 0 && (
              <Text style={styles.ErrorText}>
                The total item Weight is mismatched.
              </Text>
            )}
        </View>

        {/* Display Pay button*/}
        <View style={{ flex: 0.4 }}>
          <TouchableHighlight
            onPress={() => {
              setModalVisible(true);
            }}
            underlayColor="#C2FFB0"
            style={styles.QRbtn}
          >
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={44}
              color={"#6dd051"}
              style={styles.Qr}
            />
          </TouchableHighlight>

          {ItemCount !== calculateTotalItemCount() ||
          calculateTotalItemCount() === 0 ||
          TotalWeight !== calculateTotalWeight() ? (
            <TouchableHighlight
              underlayColor={"#928F8A"}
              style={[styles.PayButton, { backgroundColor: "#ccc" }]} // Change button color to gray when disabled
              disabled={true} // Disable the button
            >
              <Text style={styles.PayButtonText}>Pay Now</Text>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              underlayColor={"#928F8A"}
              style={styles.PayButton}
              onPress={handlePayment}
            >
              <Text style={styles.PayButtonText}>Pay Now</Text>
            </TouchableHighlight>
          )}
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={20}
            tint="systemThinMaterialDark"
            style={styles.modalView}
          >
            <View style={styles.Cam}>
              <Camera
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
            {scanned && setScanned(false)}
            <TouchableHighlight
              underlayColor={"#928F8A"}
              style={styles.openButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </BlurView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  HeadText: {
    paddingLeft: 10,
    fontSize: "25@mvs",
    fontFamily: "Inter_500Medium",
    color: "#515151",
    margin: 10,
  },

  scroll: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  Box: {
    width: width,
    height: height / 7,
    overflow: "hidden",
    // backgroundColor: "#fff",
    borderColor: "#C9C9C9",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  ImageBox: {
    borderRadius: 10,
    width: width / 5,
    height: height / 10.9,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },

  BoxText: {
    paddingLeft: 20,
    fontSize: "20@mvs",
    fontFamily: "Inter_400Regular",
    color: "#515151",
  },

  BoxQuantityText: {
    paddingLeft: 20,
    fontSize: "15@mvs",
    fontFamily: "Inter_400Regular",
    color: "#858585",
  },

  CountBox: {
    height: "27@mvs0.1",
    width: "90@mvs0.3",
    borderRadius: 2,
    flexDirection: "row",
    shadowColor: "#1c3613",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  CountNumberText: {
    fontSize: "20@mvs",
    fontFamily: "Inter_400Regular",
    color: "#515151",
  },

  Qrtext: {
    fontSize: "15@mvs",
    fontFamily: "Inter_400Regular",
    color: "#515151",
  },

  totalItem: {
    paddingLeft: 20,
  },

  totalItemText: {
    fontSize: "20@mvs",
    fontFamily: "Inter_400Regular",
    color: "#7E7E7E",
  },

  ErrorText: {
    fontSize: "10@mvs",
    fontFamily: "Inter_400Regular",
    color: "#FF4848",
    paddingBottom: 10,
  },

  Cam: {
    width: "80%",
    height: "80%",
    borderRadius: 20,
    overflow: "hidden",
  },

  QRbtn: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderColor: "transparent",
    borderRadius: 10,
    fontSize: 42,
    marginTop: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    height: "60%",
    width: "80%",
    overflow: "hidden",
    borderRadius: 20,
    paddingTop: 35,
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#6dd051",
  },

  Qr: {
    alignSelf: "center",
  },

  openButton: {
    marginTop: 40,
    backgroundColor: "#6dd051",
    alignSelf: "center",
    justifyContent: "center",
    width: "20%",
    height: 30,
    borderRadius: 10,
    elevation: 2,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },

  PayButton: {
    marginTop: 20,
    backgroundColor: "#6dd051",
    alignSelf: "center",
    justifyContent: "center",
    width: width / 2,
    height: height / 20,
    borderRadius: 10,
  },
  PayButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: "20@mvs",
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
  },
});
