// src/screens/AuditSummaryScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AuditSummaryScreen = ({ route, navigation }) => {
  const { auditData } = route?.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audit Submitted by Auditor</Text>
      <Text>Rating: {auditData?.ratingAuditor}</Text>
      <Text>
        Checks:{' '}
        {auditData?.checks?.map((c, i) => (c ? `✓ Check ${i + 1} ` : '')).join('')}
      </Text>
      <Text>Comment: {auditData?.auditorComment}</Text>
      <Text>Data and Time: {auditData?.timestamp}</Text>
     
      <TouchableOpacity  onPress={() => navigation.navigate('AuditHistoryScreen')}>
        <Text style={[styles.select]}>View History</Text>
      </TouchableOpacity>
    </View>
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
    textAlign:"center",
    marginTop:30
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default AuditSummaryScreen;
