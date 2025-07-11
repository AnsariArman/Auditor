// src/screens/AuditSummaryScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const AuditSummaryScreen = ({ route, navigation }) => {
  const { auditData } = route?.params;

  return (
    <>
     <Text style={[styles.mainTitle]}>
              Audit Summary
            </Text>
    <View style={styles.container}>
      
      {/* form review before submit */}
      <Text style={styles.title}>Audit Submitted by Auditor</Text>
      <Text>Rating: {auditData?.ratingAuditor}</Text>
      <Text>
        Checks:{' '}
        {auditData?.checks
          ?.map((c, i) => (c ? ` ✅ AuditCheck ${i + 1} ` : ''))
          .join('')}
      </Text>
      <Text>Comment: {auditData?.auditorComment}</Text>
      <Text>Data and Time: {auditData?.timestamp}</Text>
      {auditData?.auditImage && (
        <>
          <Text>Captured Image:</Text>
          <Image
            source={{ uri: auditData.auditImage }}
            style={{
              width: 200,
              height: 200,
              marginVertical: 10,
              borderRadius: 10,
            }}
          />
        </>
      )}
      <TouchableOpacity
        onPress={() => navigation.replace('AuditHistoryScreen')}
      >
        <Text style={[styles.select]}>View History</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  select: {
    backgroundColor: '#32656A',
    color: '#ffffff',
    paddingVertical: 10,
    borderRadius: 7,
    marginVertical: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
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

export default AuditSummaryScreen;
