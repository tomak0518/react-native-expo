import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        console.log("Registering:", email, password);
        router.replace("/");
    };
    return (
        <View style={styles.layout}>
            <Image
                source={require("../assets/images/register.png")}
                style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Create an account</Text>
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
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        paddingTop: 30,
        
    },
    image: {
        width: '100%',
        objectFit: 'fill',
        height: 250,
        marginBottom: 20,
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
   
    },
    link: {
        color: "#2563EB",
        fontWeight: "600",
    },
});