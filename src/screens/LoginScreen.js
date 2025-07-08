import React from 'react';
import { roleBase } from '../RoleProvider/useContextProvider';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const { setRole } = roleBase();

  // role base navigate screen
  const selectAuditRole = args => {
    setRole(args);
    if (args === 'Auditor') {
      navigation.navigate('AuditFormScreen');
    } else {
      navigation.navigate('AuditHistoryScreen');
    }
  };

  return (
    <>
    {/* header of screen */}
      <Text style={[styles.mainTitle]}>Login </Text>

      <View style={styles.container}>
        {/* role bases */}
        <Text style={styles.header}>Please Select Role:</Text>
        <TouchableOpacity onPress={() => selectAuditRole('Admin')}>
          <Text style={styles.select}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectAuditRole('Auditor')}>
          <Text style={styles.select}>Auditor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectAuditRole('Viewer')}>
          <Text style={styles.select}>Viewer</Text>
        </TouchableOpacity>

        <Text style={[styles.header, { marginTop: 10 }]}>Privacy Policy:</Text>
        {/* Policy web view screen */}
        <TouchableOpacity
          onPress={() => navigation.navigate('PolicyViewerScreen')}
        >
          <Text style={[styles.select, { marginTop: -10 }]}>Policy </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    backgroundColor: '#32656A',
    color: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 7,
    marginVertical: 10,
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
  header: {
    fontSize: 22,
    marginBottom: 30,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
