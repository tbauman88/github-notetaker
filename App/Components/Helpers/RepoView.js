import React from 'react';
import { StyleSheet, View, WebView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
  }
});

export default function RepoView(props) {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: props.url }} />
    </View>
  );
}
