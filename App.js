import { MyContextControllerProvider } from "./store";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./routers/Router";
import { auth, db } from "./firebaseConfig"; // Import auth và db từ firebaseConfig
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import các hàm từ Firestore

const App = () => {
    const admin = {
        fullName: "Admin",
        email: "vanhuudhsp@gmail.com",
        password: "12345666",
        phone: "0913131732",
        address: "Bình Dương",
        role: "admin"
    };

    useEffect(() => {
        const checkAndCreateAdmin = async () => {
            try {
                // Trỏ tới tài liệu của admin trong collection "USERS"
                const adminDocRef = doc(db, "USERS", admin.email);
                
                // Lấy dữ liệu của tài liệu admin
                const docSnap = await getDoc(adminDocRef);

                // Nếu tài liệu không tồn tại, đăng ký và thêm vào Firestore
                if (!docSnap.exists()) {
                    // Đăng ký tài khoản admin trên Firebase Authentication
                    await createUserWithEmailAndPassword(auth, admin.email, admin.password);

                    // Lưu thông tin admin vào Firestore
                    await setDoc(adminDocRef, admin);

                    console.log("Add new account admin");
                }
            } catch (error) {
                console.error("Error creating admin account:", error);
            }
        };

        checkAndCreateAdmin();
    }, []);

    return (
        <MyContextControllerProvider>
            <NavigationContainer>
                <Router />
            </NavigationContainer>
        </MyContextControllerProvider>
    );
};

export default App;
