import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

// ✅ Validation schema
const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password too short!")
        .required("Password is required"),
});

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await AsyncStorage.getItem("user");
                if (user != undefined || user != null) {
                    router.replace("/");
                }
            } catch (error) {
                console.error("Error reading user data", error);
            }
        };

        fetchUser(); // 👈 call it here
    }, []);

    const handleRegister = async () => {
        try {
            console.log("handleRegister");
            const res = await fetch("http://10.0.2.2:5000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }), // what you're sending
            });
            if (res.status === 401) {
                alert("Email already exist");
                return;
            }
            const data = await res.json();

            if (data.result) {
                alert(data.message);
                router.replace("/login");
            }
            else {
                alert(data.message);
            }
        } catch (err) {
            console.error('handleRegister Error', err);

        }
    }
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
                try {
                    console.log("handleRegister");
                    const res = await fetch("http://10.0.2.2:5000/users/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: values.email, password: values.password }), // what you're sending
                    });
                    if (res.status === 401) {
                        alert("Email already exist");
                        return;
                    }
                    const data = await res.json();
        
                    if (data.result) {
                        alert(data.message);
                        router.replace("/login");
                    }
                    else {
                        alert(data.message);
                    }
                } catch (err) {
                    console.error('handleRegister Error', err);
        
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.layout}>
                    <Image
                        source={require("../assets/images/register.png")}
                        style={styles.image}
                    />
                    <View style={styles.container}>
                        <Text style={styles.title}>Register</Text>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder="Email"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            style={styles.input}
                        />
                        {errors.email && touched.email && (
                            <Text style={{ color: "red" }}>{errors.email}</Text>
                        )}
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            value={values.password}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            style={styles.input}
                        />
                        {errors.password && touched.password && (
                            <Text style={{ color: "red" }}>{errors.password}</Text>
                        )}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Create an account</Text>
                        </TouchableOpacity>
                        <Text style={styles.footer}>
                            Already have an account?{" "}
                            <Text style={styles.link} onPress={() => router.push("/login")}>
                                Login here
                            </Text>
                        </Text>
                    </View>
                </View>)}
        </Formik>
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