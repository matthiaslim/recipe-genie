import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Chip, Divider, Icon, IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { useState } from "react";

export default function CreateRecipe() {
    const { colors } = useTheme();
    const styles = useStyles(colors);

    const ingredients = [
        { "_id": "91ufj1982394", "ingredientName": "Celery" },
        { "_id": "91ufj1982294", "ingredientName": "Kale" },
        { "_id": "28ghq1215392", "ingredientName": "Tomato" }
    ]

    const [inputText, setInputText] = useState('');

    const [selectedIngredients, setSelectedIngredients] = useState<{ _id: string, ingredientName: string, quantity: number }[]>([]);
    const [filteredIngredients, setFilteredIngredients] = useState(ingredients);

    const handleInputChange = (text: string) => {
        setInputText(text);
        setFilteredIngredients(ingredients.filter(ingredient =>
            ingredient.ingredientName.toLowerCase().includes(text.toLowerCase())
        ));
    };

    const toggleSelection = (ingredient: { _id: string, ingredientName: string }) => {
        setSelectedIngredients(prevState => {
            const existingIngredient = prevState.find(item => item.ingredientName === ingredient.ingredientName);
            if (existingIngredient) {
                return prevState.filter(item => item.ingredientName !== ingredient.ingredientName);
            } else {
                return [...prevState, { _id: ingredient._id, ingredientName: ingredient.ingredientName, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (index: number) => {
        setSelectedIngredients(prevState => {
            const newIngredients = [...prevState];
            newIngredients[index].quantity += 1;
            return newIngredients;
        });
    };

    const decreaseQuantity = (index: number) => {
        setSelectedIngredients(prevState => {
            const newIngredients = [...prevState];
            if (newIngredients[index].quantity > 1) {
                newIngredients[index].quantity -= 1;
            }
            return newIngredients;
        });
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
                                    {filteredIngredients.map(ingredient => (
                                        <Chip
                                            key={ingredient._id}
                                            selected={selectedIngredients.some(item => item.ingredientName === ingredient.ingredientName)}
                                            onPress={() => toggleSelection(ingredient)}
                                            style={styles.ingredientChip}
                                            selectedColor="#000000"
                                        >
                                            {ingredient.ingredientName}
                                        </Chip>
                                    ))}
                                </View>
                            </ScrollView>
                            <Divider />
                            <ScrollView>
                                {selectedIngredients.map((ingredient, index) => (
                                    <View style={styles.ingredientDetails}>
                                        <Text variant="titleMedium">{ingredient.ingredientName}</Text>
                                        <View style={styles.counter}>
                                            <IconButton icon="minus" onPress={() => decreaseQuantity(index)} />
                                            <Text variant="titleMedium">{ingredient.quantity}</Text>
                                            <IconButton icon="plus" onPress={() => increaseQuantity(index)} />
                                        </View>
                                    </View>
                                ))}
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
    ingredientDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        marginTop: 20,
    },
    bold: {
        fontFamily: 'Montserrat-Bold'
    }
})