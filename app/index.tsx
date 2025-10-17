import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
    const router = useRouter();

    const handleSecondScreen = () => {

    };
    const handleLogout = () => {
        router.replace("/login"); // navigate back to login page
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello World</Text>
            <Text style={styles.subtitle}>This text using ubuntu font</Text>
            <TouchableOpacity style={styles.buttonPrimary} onPress={handleSecondScreen}>
                <Text style={styles.buttonText}>Go to second screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDanger} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5", // light gray background
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: "#333",
        marginBottom: 20,
    },
    buttonPrimary: {
        backgroundColor: "#2563EB", // blue
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginBottom: 10,
    },
    buttonDanger: {
        backgroundColor: "#EF4444", // red
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});