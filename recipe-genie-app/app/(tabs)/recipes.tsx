import { StyleSheet, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, IconButton, Searchbar, SegmentedButtons, Text, TextInput, TouchableRipple, useTheme } from 'react-native-paper'
import React from "react";
import Stars from "@/components/RatingStars";
import { router } from "expo-router";

export default function Recipes() {
    const { colors } = useTheme();
    const styles = useStyles(colors);

    const [value, setValue] = React.useState('saved');
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <Text variant="headlineMedium" style={styles.bold}>Recipes</Text>
                    <Button icon="plus" mode="outlined" onPress={() => router.push('/createRecipe')}>
                        New Recipe
                    </Button>
                </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.search}
                />
                <SegmentedButtons
                    value={value}
                    onValueChange={setValue}
                    buttons={[
                        {
                            value: 'saved',
                            label: 'Saved',
                        },
                        {
                            value: 'created',
                            label: 'Created',
                        },
                    ]}
                    style={styles.tabs}
                />
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                {value === 'saved' && (
                    <View>
                        <TouchableRipple
                            style={styles.recipeCard}
                            onPress={() => console.log('Saved Recipe 1')}
                        >
                            <View>
                                <Image
                                    style={styles.recipeImg}
                                    source={require("../../assets/images/ratatouille.jpg")} />
                                <Text variant="titleMedium">Ratatouille</Text>
                                <Stars count={5} />
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={styles.recipeCard}
                            onPress={() => console.log('Recipe 3')}
                        >
                            <View>
                                <Image style={styles.recipeImg} source={require("../../assets/images/carbonara.webp")} />
                                <Text variant="titleSmall">Carbonara</Text>
                                <Stars count={2} />
                            </View>
                        </TouchableRipple>
                    </View>
                )}
                {value === 'created' && (
                    <View>
                        <TouchableRipple
                            style={styles.recipeCard}
                            onPress={() => console.log('Created Recipe 1')}
                        >
                            <View>
                                <Image
                                    style={styles.recipeImg}
                                    source={require("../../assets/images/foccacia.jpg")} />
                                <Text variant="titleMedium">Focaccia</Text>
                                <Stars count={3} />
                            </View>
                        </TouchableRipple>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const useStyles = (colors: any) => StyleSheet.create({
    container: {
        marginTop: 31,
    },
    header: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    search: {
        marginTop: 20,
    },
    bold: {
        fontFamily: 'Montserrat-Bold'
    },
    content: {
        paddingBottom: 200,
        paddingHorizontal: 15,
    },
    tabs: {
        marginTop: 20
    },
    recipeCard: {
        marginBottom: 20
    },
    recipeImg: {
        width: '100%',
        height: 175,
        borderRadius: 10,
    }
})