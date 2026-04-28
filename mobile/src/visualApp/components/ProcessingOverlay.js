import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function ProcessingOverlay({ visible, message = 'Procesando...' }) {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000044' },
  card: { backgroundColor: colors.surface, padding: 20, borderRadius: 12, alignItems: 'center', gap: 8 },
  text: { color: colors.text },
});
