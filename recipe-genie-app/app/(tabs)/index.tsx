import Stars from "@/components/RatingStars";
import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet, Image, ScrollView, Platform } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Icon,
  TouchableRipple,
  Text,
  IconButton,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useStoreUserEffect } from "@/hooks/useStoreUserEffects";

export default function Index() {
  const { colors } = useTheme();
  const styles = useStyles(colors);

  const { signOut } = useClerk();
  const { user } = useUser();

  const { isLoading, isAuthenticated } = useStoreUserEffect();

  const onSignOut = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.header}>
        <Text variant="headlineSmall" style={{ color: "#FFFFFF" }}>
          Welcome,
        </Text>
        <Text
          variant="headlineLarge"
          style={{ color: "#FFFFFF", fontFamily: "Montserrat-Bold" }}
        >
          {user?.username}
        </Text>
      </SafeAreaView>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <Link href="/generateRecipe" asChild>
            <TouchableRipple
              style={styles.inspoContainer}
              onPress={() => console.log("Pressed")}
            >
              <View style={styles.inspoContent}>
                <Icon size={24} source="magnify" color="#EF95A4" />
                <Text style={styles.inspoTextColor}>
                  Find Recipe Inspirations
                </Text>
              </View>
            </TouchableRipple>
          </Link>
          <Text variant="titleLarge" style={styles.bold}>
            Recently viewed recipes
          </Text>
          <View style={styles.recentViewed}>
            <TouchableRipple
              style={styles.recipeCard}
              onPress={() => console.log("Recipe 1")}
            >
              <View>
                <Image
                  style={styles.recipeImg}
                  source={require("../../assets/images/ratatouille.jpg")}
                />
                <Text variant="titleSmall">Ratatouille</Text>
                <Stars count={5} />
              </View>
            </TouchableRipple>
            <TouchableRipple
              style={styles.recipeCard}
              onPress={() => console.log("Recipe 2")}
            >
              <View>
                <Image
                  style={styles.recipeImg}
                  source={require("../../assets/images/foccacia.jpg")}
                />
                <Text variant="titleSmall">Foccacia</Text>
                <Stars count={3} />
              </View>
            </TouchableRipple>
            <TouchableRipple
              style={styles.recipeCard}
              onPress={() => console.log("Recipe 3")}
            >
              <View>
                <Image
                  style={styles.recipeImg}
                  source={require("../../assets/images/carbonara.webp")}
                />
                <Text variant="titleSmall">Carbonara</Text>
                <Stars count={2} />
              </View>
            </TouchableRipple>
          </View>
          <Button onPress={onSignOut}>Log Out</Button>
        </View>
      )}
    </ScrollView>
  );
}

const useStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.primary,
      paddingTop: Platform.OS === "ios" ? 5 : 20,
      paddingHorizontal: 15,
      paddingVertical: Platform.OS === "ios" ? 5 : 40,
    },
    container: {
      marginHorizontal: 15,
      marginTop: 31,
    },
    inspoContainer: {
      width: "100%",
      borderWidth: 2,
      borderColor: colors.secondary,
      borderRadius: 10,
      borderStyle: "dashed",
      padding: 70,
      marginBottom: 31,
    },
    inspoContent: {
      justifyContent: "center",
      alignItems: "center",
      color: colors.secondary,
    },
    inspoTextColor: {
      color: colors.secondary,
    },
    bold: {
      fontFamily: "Montserrat-Bold",
    },
    recentViewed: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 16,
    },
    recipeCard: {
      flexBasis: "48%",
      marginBottom: 16,
    },
    recipeImg: {
      width: "100%",
      height: 125,
      borderRadius: 10,
    },
  });
