import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "../firebaseConfig"; // Import db từ firebaseConfig
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Validation schema with Yup
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên dịch vụ không để trống"),
    price: Yup.number()
        .required("Giá không để trống")
        .min(10000, "Giá nhỏ nhất là 10,000 VNĐ")
});

const AddNewService = ({ navigation }) => {

    const handleAddService = async (values) => {
        try {
            await addDoc(collection(db, "services"), {
                name: values.name,
                price: parseFloat(values.price),
                createdBy: "Admin", // Hoặc thay đổi theo thông tin người dùng hiện tại
                createdAt: Timestamp.fromDate(new Date()),
                updatedAt: Timestamp.fromDate(new Date()),
            });
            Alert.alert("Thành công", "Thêm dịch vụ thành công");
            navigation.goBack(); // Quay lại màn hình trước đó
        } catch (error) {
            console.error("Error adding document: ", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm dịch vụ");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Thêm dịch vụ mới</Text>
            <Formik
                initialValues={{ name: "", price: "" }}
                validationSchema={validationSchema}
                onSubmit={handleAddService}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <TextInput
                            mode="outlined"
                            label="Tên dịch vụ"
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                            style={styles.input}
                        />
                        <ErrorMessage name="name" component={Text} style={styles.errorText} />

                        <TextInput
                            mode="outlined"
                            label="Giá"
                            keyboardType="numeric"
                            onChangeText={handleChange("price")}
                            onBlur={handleBlur("price")}
                            value={values.price}
                            style={styles.input}
                        />
                        <ErrorMessage name="price" component={Text} style={styles.errorText} />

                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={styles.button}
                        >
                            Thêm
                        </Button>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
        padding: 5,
        backgroundColor: 'green',
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});

export default AddNewService;

