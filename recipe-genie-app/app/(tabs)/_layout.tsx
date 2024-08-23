import { Tabs } from "expo-router";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";

export default function TabLayout() {

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerStyle: {
                        backgroundColor: '#C8102F',
                        paddingVertical: 24,
                    },
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon size={28} source="home" color={color} />

                }}
            />
            <Tabs.Screen
                name="recipes"
                options={{
                    title: "Recipes",
                    headerStyle: {
                        backgroundColor: '#C8102F',
                        paddingVertical: 24,
                    },
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Icon size={28} source="chef-hat" color={color} />

                }}
            />
        </Tabs>
    )
}