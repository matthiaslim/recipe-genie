import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    const { colors } = useTheme();
    const styles = useStyles(colors);

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text variant="headlineLarge" style={styles.bold}>Recipe Genie</Text> */}
            <View style={styles.form}>
                <Text variant="headlineMedium" style={[styles.bold, styles.formHeader]}>Register</Text>
                <TextInput
                    mode="outlined"
                    label="Username"
                    onChangeText={value => setUsername(value)}
                    style={styles.input}
                />
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
                <TextInput
                    mode="outlined"
                    label="Confirm Password"
                    onChangeText={value => setPassword2(value)}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Button mode="contained" onPress={() => console.log("login function")} style={styles.loginButton}>Register</Button>
            </View>
            <Button mode="text" onPress={() => router.replace('/login')} style={styles.loginButton} labelStyle={{ fontFamily: 'Montserrat-Bold' }}>Already registered? Login</Button>
        </SafeAreaView>
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
        width: '100%'
    }
})