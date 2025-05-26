import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>This screen doesn't exist.</Text>
    </SafeAreaView>
  )
}
