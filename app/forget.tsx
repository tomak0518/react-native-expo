import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function ForgotPassword() {
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const user = await AsyncStorage.getItem("user");
            if(user != undefined || user != null){
                router.replace("/");
            }
          } catch (error) {
            console.error("Error reading user data", error);
          }
        };
      
        fetchUser(); // 👈 call it here
      }, []);
    const [email, setEmail] = useState("");

    const handleSendEmail = () => {
        console.log("Password reset email sent to:", email);
        alert("Password reset link sent!");
        router.replace("/login");
    };
    return (
        <View style={styles.layout}>
            <Image
                source={require("../assets/images/forget.png")}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.container}>
                <Text style={styles.title}>Forget Password</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
                    <Text style={styles.buttonText}>Send email</Text>
                </TouchableOpacity>

                <Text style={styles.footer}>
                    Already have an account?{" "}
                    <Text style={styles.link} onPress={() => router.push("/login")}>
                        Login here
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: 'white',
        height: '100%'
    },
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        objectFit: 'fill',
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 6,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#2563EB",
        width: "100%",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    footer: {
        marginTop: 16,
        fontSize: 14,
        color: "#555",
    },
    link: {
        color: "#2563EB",
        fontWeight: "600",
    },
});