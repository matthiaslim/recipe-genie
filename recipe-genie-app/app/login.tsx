import { useSignIn } from "@clerk/clerk-expo";
import { isLoaded } from "expo-font";
import { Link, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Login() {
    const { colors } = useTheme();
    const styles = useStyles(colors);

    const {signIn, setActive, isLoaded} = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSignInPress = React.useCallback(async ()=>{
        if (!isLoaded){
            return
        }

        try{
            const signInAttempt = await signIn.create({
                identifier:emailAddress,
                password
            })

            if(signInAttempt.status === 'complete'){
                await setActive({session: signInAttempt.createdSessionId})
                router.replace('/')
            } else {
                console.error(JSON.stringify(signInAttempt,null,2))
            }
        } catch (err:any){
            console.error(JSON.stringify(err,null,2))
        }
    },[isLoaded,emailAddress,password])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text variant="headlineLarge" style={styles.bold}>Recipe Genie</Text>
                <Text variant="headlineMedium" style={[styles.bold, styles.formHeader]}>Login</Text>
                <TextInput
                    mode="outlined"
                    label="Email"
                    value={emailAddress}
                    onChangeText={emailAddress => setEmailAddress(emailAddress)}
                    style={styles.input}
                />
                <TextInput
                    mode="outlined"
                    label="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Button mode="contained" onPress={onSignInPress} style={styles.loginButton}>Login</Button>
            </View>
            <Button mode="text" onPress={() => router.replace('/register')} style={styles.loginButton} labelStyle={{ fontFamily: 'Montserrat-Bold' }}>Create an account</Button>
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
        // paddingVertical: 5,
        // borderRadius: 5,
        // backgroundColor: colors.primary,
        width: '100%'
    }
})