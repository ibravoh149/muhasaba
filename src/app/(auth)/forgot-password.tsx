import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Forgot Password</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
