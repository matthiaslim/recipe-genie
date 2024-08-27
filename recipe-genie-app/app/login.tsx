import { router } from "expo-router";
import React from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    const { colors } = useTheme();
    const styles = useStyles(colors);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.form}>
                    <Text variant="headlineLarge" style={styles.bold}>Recipe Genie</Text>
                    <Text variant="headlineMedium" style={[styles.bold, styles.formHeader]}>Login</Text>
                    <TextInput
                        mode="outlined"
                        label="Email"
                        onChangeText={value => setEmail(value)}
                        style={styles.input}
                    />
                    <TextInput
                        mode="outlined"
                        label="Password"
                        onChangeText={value => setPassword(value)}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <Button mode="contained" onPress={() => router.replace('/(tabs)/')} style={styles.loginButton}>Login</Button>
                </View>
                <Button mode="text" onPress={() => router.replace('/register')} style={styles.loginButton} labelStyle={{ fontFamily: 'Montserrat-Bold' }}>Create an account</Button>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const useStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        paddingVertical: 30,
    },
    form: {
        marginTop: 75,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    formHeader: {
        marginVertical: 50,
    },
    bold: {
        fontFamily: 'Montserrat-Bold'
    },
    input: {
        marginVertical: 10,
        width: '100%', // Ensure the input fields take full width
    },
    loginButton: {
        marginTop: 20,
        // paddingVertical: 5,
        // borderRadius: 5,
        // backgroundColor: colors.primary,
        width: '100%'
    }
})