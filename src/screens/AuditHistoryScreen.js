// src/screens/AuditHistoryScreen.js
import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { roleBase } from '../RoleProvider/useContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuditHistoryScreen = () => {
  const { role, auditData, setAuditData } = roleBase();
  // delete history if role is admin access this part
  const deleteHistoryAudit = async args => {
    Alert.alert('delete History', 'Are you sure you want to delete?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          const updated = auditData.filter(a => a.id !== args);
          setAuditData(updated);

          try {
            // store audit store data
            await AsyncStorage.setItem('auditStore', JSON.stringify(updated));
          } catch (e) {
            console.error('invalid audit id:', e);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* condition base show header */}
      <Text style={[styles.mainTitle]}>
        {role === 'Admin' ? 'Admin' : 'Audit'}
      </Text>

      <Text style={styles.title}>Audit History</Text>
      {/* flatlist use list of audit history */}
      {/* ListEmptyComponent if is empty show message no history found */}
      <FlatList
        data={auditData}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text
            style={{
              marginLeft: 20,
              color: '#000000',
              marginTop: 20,
              fontWeight: '400',
            }}
          >
            No audits found History.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text
              style={{
                marginLeft: 20,
                color: '#000000',
                marginTop: 5,
                fontWeight: '400',
              }}
            >
              Rating: {item.ratingAuditor}
            </Text>
            <Text
              style={{
                marginLeft: 20,
                color: '#000000',
                marginTop: 5,
                fontWeight: '400',
              }}
            >
              Comment: {item.auditorComment}
            </Text>
            <Text
              style={{
                marginLeft: 20,
                color: '#000000',
                marginTop: 5,
                fontWeight: '400',
                marginBottom: 10,
              }}
            >
              Date and Time: {item.timestamp}
            </Text>
            {item.auditImage && (
              <Image
                source={{ uri: item.auditImage }}
                style={{ width: 100, height: 100, margin: 10, borderRadius: 8 }}
              />
            )}
            {role === 'Admin' && (
              <TouchableOpacity onPress={() => deleteHistoryAudit(item.id)}>
                <Text style={[styles.select]}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  select: {
    backgroundColor: '#32656A',
    color: '#ffffff',
    paddingVertical: 10,
    borderRadius: 7,
    marginVertical: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    margin: 15,
    borderColor: '#32656A',
    borderRadius: 10,
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

export default AuditHistoryScreen;
