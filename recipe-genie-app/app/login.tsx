import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    const { colors } = useTheme();
    const styles = useStyles(colors);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="headlineLarge" style={styles.bold}>Recipe Genie</Text>
            <View style={styles.form}>
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
                <Button mode="contained" onPress={() => console.log("login function")} style={styles.loginButton}>Login</Button>
            </View>
        </SafeAreaView>
    )
}

const useStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    form: {
        marginTop: 50,
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
        backgroundColor: colors.primary,
        width: '100%'
    }
})