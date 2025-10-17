import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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

export default function LoginScreen() {
    const router = useRouter();
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
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
                try {
                    const res = await fetch("http://10.0.2.2:5000/users/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: values.email, password: values.password }), // what you're sending
                    });

                    if (res.status === 401) {
                        alert("Login failed");
                        return;
                    }
                    const data = await res.json();
                    if (data.result) {
                        alert(data.message);
                        await AsyncStorage.setItem("user", JSON.stringify(data.user));
                        router.replace("/");
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
                            placeholder="Email"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            style= {styles.input}
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
                        <Button title="Login" style={styles.button} onPress={handleSubmit} />
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
            )}
        </Formik>
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