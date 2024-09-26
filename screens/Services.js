import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { IconButton, Text, Card } from "react-native-paper";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import db từ firebaseConfig

const Services = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const servicesCollection = collection(db, "services");
        
        const unsubscribe = onSnapshot(servicesCollection, (querySnapshot) => {
            const servicesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setServices(servicesList);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching services: ", error);
            Alert.alert("Error", "Có lỗi xảy ra khi lấy dữ liệu dịch vụ.");
            setLoading(false);
        });

        // Cleanup function to unsubscribe from the snapshot listener
        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            onPress={() => navigation.navigate("ServiceDetail", { service: item })}
            style={styles.card}
        >
            <Card>
                <Card.Content>
                    <Text style={styles.serviceName}>{item.name}</Text>
                    <Text style={styles.servicePrice}>
                        {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/logo2.png")}
                style={styles.logo}
            />
            
            <View style={styles.header}>
                <Text style={styles.title}>
                    Danh sách dịch vụ
                </Text>
                <IconButton
                    icon="plus-circle"
                    iconColor="green"
                    size={35}
                    onPress={() => navigation.navigate("AddNewService")}
                />
            </View>
            
            {loading ? (
                <Text style={styles.loading}>Đang tải dữ liệu...</Text>
            ) : (
                <FlatList
                    data={services}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    logo: {
        alignSelf: "center",
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#333',
    },
    card: {
        marginBottom: 10,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    servicePrice: {
        fontSize: 16,
        color: '#333',
    },
    loading: {
        textAlign: 'center',
        fontSize: 18,
        color: '#333',
    }
});

export default Services;
