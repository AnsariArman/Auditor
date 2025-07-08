import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const PolicyViewerScreen = () => {
  const [loading, setLoading] = useState(true);

  const auditPolicy =
    'https://cag.gov.in/ag/himachal-pradesh/en/page-ag-himachal-pradesh-terms-and-conditions';
  return (
    <View style={styles.container}>
      <Text style={[styles.mainTitle]}>Policy </Text>
      {/* if content not load loader active  */}
      {loading && (
        <ActivityIndicator
          size="large"
          color={'#32656A'}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 1,
          }}
        />
      )}
      {/* content show web view */}
      <WebView
        source={{ uri: auditPolicy }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainTitle: {
    backgroundColor: '#32656A',
    color: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default PolicyViewerScreen;
