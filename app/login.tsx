import { Link, useRouter } from 'expo-router';
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleLogin = () => {
        router.replace("/");
    };

    return (
        <View style={styles.layout}>
            <View>
                <Image
                    source={require("../assets/images/login.png")}
                    style={styles.image}
                    resizeMode={'cover'}
                />
            </View>
           
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Enter your password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Don’t have an account? <Link href="/register" style={styles.link}>register</Link>
                </Text>
                <TouchableOpacity>
                    <Link href="/forget" style={styles.link}>Forget password</Link>
                </TouchableOpacity>
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
        paddingTop: 30,
        paddingHorizontal: 24,
        justifyContent: "center",
    },
    image: {
        width: "100%",
        objectFit: 'fill',
        height: 250
        
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#2F80ED",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    footer: {
        alignItems: "center",
        marginTop: 24,
    },
    footerText: {
        fontSize: 14,
        color: "#333",
    },
    link: {
        color: "#2F80ED",
        fontWeight: "600",
    }
});