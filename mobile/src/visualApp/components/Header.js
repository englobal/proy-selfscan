import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { deployConfig } from '../config/deployConfig';
import { colors } from '../theme/colors';

export default function Header({ title }) {
  return (
    <View style={styles.wrap}>
      <Image source={{ uri: deployConfig.logoUri }} style={styles.logo} resizeMode="contain" />
      <View>
        <Text style={styles.brand}>{deployConfig.companyName}</Text>
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  logo: { width: 62, height: 40, backgroundColor: colors.white, borderRadius: 8 },
  brand: { color: colors.primary, fontWeight: '700', fontSize: 16 },
  title: { color: colors.text, fontSize: 13 },
});
