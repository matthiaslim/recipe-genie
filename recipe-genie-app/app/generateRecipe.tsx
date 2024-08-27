import { router } from "expo-router";
import React from "react";
import { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Chip, TextInput, Text, IconButton, useTheme, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function newRecipe() {
    const { colors } = useTheme();
    const styles = useStyles(colors);

    const ingredients = ["Celery", "Kale", "Tomato"];
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    const [filteredIngredients, setFilteredIngredients] = useState(ingredients);

    const handleInputChange = (text: string) => {
        setSearchQuery(text);
        setFilteredIngredients(ingredients.filter(chip => chip.toLowerCase().includes(text.toLowerCase())));
    };

    const [searchQuery, setSearchQuery] = React.useState('');


    const toggleSelection = (ingredient: string) => {
        setSelectedIngredients(prevState =>
            prevState.includes(ingredient)
                ? prevState.filter(item => item !== ingredient)
                : [...prevState, ingredient]
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.headerLine}>
                        <IconButton icon="close" onPress={() => router.back()} />
                        <View>
                            <Text variant="headlineMedium" style={styles.bold}>Recipes</Text>
                            <Text variant="titleMedium">based on ingredients that you have</Text>
                        </View>
                    </View>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={handleInputChange}
                        value={searchQuery}
                    />
                    <Button style={styles.buttonMargin} icon="camera" mode="contained">Get ingredients using camera</Button>
                    <View style={styles.chipContainer}>
                        {filteredIngredients.map((ingredient, index) => (
                            <Chip
                                key={index}
                                selected={selectedIngredients.includes(ingredient)}
                                onPress={() => toggleSelection(ingredient)}
                                style={styles.ingredientChip}
                                selectedColor="#000000"
                            >
                                {ingredient}
                            </Chip>
                        ))}
                    </View>
                </View>
                <Button style={styles.buttonMargin} mode="contained" buttonColor="#C8102F">Generate Images</Button>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const useStyles = (colors: any) => StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 15,
        height: '100%',
        flex: 1,
        justifyContent: 'space-between'
    },
    headerLine: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    ingredientChip: {
        width: 'auto',
        alignSelf: 'flex-start',
        marginHorizontal: 5,
        backgroundColor: colors.secondary,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonMargin: {
        marginVertical: 20,
    },
    bold: {
        fontFamily: "Montserrat-Bold"
    }
});