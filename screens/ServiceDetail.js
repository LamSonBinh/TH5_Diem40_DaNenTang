import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ServiceDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { service } = route.params;

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(service.name);
    const [price, setPrice] = useState(service.price.toString());

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, service]);

    const handleDelete = () => {
        Alert.alert(
            "Xóa",
            "Bạn có chắc chắn muốn xóa dịch vụ này không?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, "services", service.id));
                            navigation.goBack();
                        } catch (error) {
                            console.error("Error removing document: ", error);
                            Alert.alert("Lỗi", "Có lỗi xảy ra khi xóa dịch vụ.");
                        }
                    }
                }
            ]
        );
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = async () => {
        if (!name || !price) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
            return;
        }
        try {
            await updateDoc(doc(db, "services", service.id), {
                name,
                price: parseFloat(price),
                updatedAt: new Date(),
            });
            Alert.alert("Thành công", "Cập nhật dịch vụ thành công");
            navigation.goBack();
        } catch (error) {
            console.error("Error updating document: ", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi cập nhật dịch vụ.");
        }
    };

    if (!service) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Dịch vụ không tìm thấy.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chi Tiết Dịch Vụ</Text>
            {isEditing ? (
                <View>
                    <TextInput
                        mode="outlined"
                        label="Tên Dịch Vụ"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        mode="outlined"
                        label="Giá"
                        keyboardType="numeric"
                        value={price}
                        onChangeText={setPrice}
                        style={styles.input}
                    />
                    <Button mode="contained" onPress={handleUpdate} style={styles.button}>
                        Cập Nhật
                    </Button>
                    <Button mode="outlined" onPress={handleEditToggle} style={styles.button}>
                        Hủy
                    </Button>
                </View>
            ) : (
                <View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.label}>Tên Dịch Vụ:</Text>
                        <Text style={styles.value}>{service.name}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.label}>Giá:</Text>
                        <Text style={styles.value}>{service.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.label}>Người Tạo:</Text>
                        <Text style={styles.value}>{service.createdBy}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.label}>Thời Gian Tạo:</Text>
                        <Text style={styles.value}>{new Date(service.createdAt.seconds * 1000).toLocaleString('vi-VN')}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.label}>Lần Cuối Cập Nhật:</Text>
                        <Text style={styles.value}>{new Date(service.updatedAt.seconds * 1000).toLocaleString('vi-VN')}</Text>
                    </View>
                    <Button mode="contained" onPress={handleEditToggle} style={styles.button}>
                        Sửa Thông Tin
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        marginBottom: 15,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    button: {
        marginTop: 10,
    },
    iconButton: {
        marginRight: 12,
    },
});

export default ServiceDetail;
