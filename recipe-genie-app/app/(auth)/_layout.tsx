import { Redirect, Stack, Href } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={('/(tabs)/index' as Href)} />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}