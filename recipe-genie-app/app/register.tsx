import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignUp, } from "@clerk/clerk-expo";
import { store } from "@/convex/users";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";

export default function Login() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { isLoaded, signUp, setActive } = useSignUp();

  const storeUser = useMutation(api.users.store);

  const [username, setUsername] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [error, setError] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signUp.create({
        username,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!pendingVerification && (
        <>
          <View style={styles.form}>
            <Text
              variant="headlineMedium"
              style={[styles.bold, styles.formHeader]}
            >
              Register
            </Text>
            <TextInput
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={(username) => setUsername(username)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Email"
              value={emailAddress}
              onChangeText={(email) => setEmailAddress(email)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Confirm Password"
              onChangeText={(value) => setPassword2(value)}
              secureTextEntry={true}
              style={styles.input}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button
              mode="contained"
              onPress={onSignUpPress}
              style={styles.loginButton}
            >
              Register
            </Button>
          </View>
          <Button
            mode="text"
            onPress={() => router.replace("/login")}
            style={styles.loginButton}
            labelStyle={{ fontFamily: "Montserrat-Bold" }}
          >
            Already registered? Login
          </Button>
        </>
      )}
      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Button onPress={onPressVerify}> Verify Email </Button>
        </>
      )}
    </SafeAreaView>
  );
}

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 15,
      paddingVertical: 30,
    },
    form: {
      marginTop: 75,
      alignSelf: "stretch",
      alignItems: "center",
    },
    formHeader: {
      marginVertical: 50,
    },
    bold: {
      fontFamily: "Montserrat-Bold",
    },
    input: {
      marginVertical: 10,
      width: "100%", // Ensure the input fields take full width
    },
    loginButton: {
      marginTop: 20,
      width: "100%",
    },
    errorText: {
      color: "red",
      marginTop: 20,
      textAlign: "center",
    },
  });
