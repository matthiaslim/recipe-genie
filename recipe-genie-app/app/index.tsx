import { useAuth } from "@clerk/clerk-expo"
import { Redirect } from "expo-router"

export default function StartPage() {
    const { isSignedIn } = useAuth()

    const InitialRedirect = () => {
        if (isSignedIn) {
            return <Redirect href="/(tabs)" />
        } else if (!isSignedIn) {
            return <Redirect href="/(auth)/login" />
        }
    }

    return (
        <InitialRedirect />
    )
}