import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15
  }
});

export default function Separator() {
  return <View style={styles.separator} />;
}
