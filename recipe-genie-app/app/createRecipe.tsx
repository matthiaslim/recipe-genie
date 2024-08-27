import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Chip, IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { useState } from "react";

export default function CreateRecipe() {
    const { colors } = useTheme();
    const styles = useStyles(colors);

    const ingredients = ["Celery", "Kale", "Tomato"];

    const [inputText, setInputText] = useState('');

    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [filteredIngredients, setFilteredIngredients] = useState(ingredients);

    const handleInputChange = (text: string) => {
        setInputText(text);
        setFilteredIngredients(ingredients.filter(chip => chip.toLowerCase().includes(text.toLowerCase())));
    };

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
                        <Text variant="headlineMedium" style={styles.bold}>Create recipe</Text>
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            mode="outlined"
                            label="Recipe Name"
                            style={styles.inputs}
                        />
                        <Text variant="labelMedium" style={styles.ingredientHeader}>Ingredients</Text>
                        <View style={styles.ingredientContainer}>
                            <TextInput
                                mode="outlined"
                                label="Search Ingredient"
                                onChangeText={handleInputChange}
                            />
                            <ScrollView>
                                <View style={styles.ingredientsInput}>
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
                            </ScrollView>
                        </View>
                        <TextInput
                            mode="outlined"
                            label="Description"
                            multiline={true}
                            numberOfLines={10}
                            style={styles.inputs}
                        />
                    </View>
                </View>
                <Button mode="contained">Create</Button>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )

}

const useStyles = (colors: any) => StyleSheet.create({
    container: {
        marginVertical: 20,
        marginHorizontal: 15,
        height: '100%',
        flex: 1,
        justifyContent: 'space-between'
    },
    headerLine: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

    },
    ingredientHeader: {
        marginTop: 20,
        marginBottom: 5,
    },
    ingredientContainer: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#7c757e',
        padding: 5,
    },
    form: {

    },
    ingredientsInput: {
        paddingVertical: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    ingredientChip: {
        width: 'auto',
        alignSelf: 'flex-start',
        marginHorizontal: 5,
        backgroundColor: colors.secondary,
    },
    inputs: {
        marginTop: 20,
    },
    bold: {
        fontFamily: 'Montserrat-Bold'
    }
})