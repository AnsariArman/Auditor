// src/screens/AuditFormScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { roleBase } from '../RoleProvider/useContextProvider';

const AuditFormScreen = ({ navigation }) => {
  const { auditData, setAuditData } = roleBase();

  const [stepAudit, setStepAudit] = useState(1);
  const [ratingAuditor, setRatingAuditor] = useState('');
  const [selectToggle1, setSelectToggle1] = useState(false);
  const [selectToggle2, setSelectToggle2] = useState(false);
  const [auditorComment, setAuditorComment] = useState('');

  const handleStepNext = () => setStepAudit(prev => prev + 1);
  const handleStepPreview = () => setStepAudit(prev => prev - 1);

  const submitButton = () => {
    if (!ratingAuditor) {
      Alert.alert('message', 'Please enter rating 1 to 5 before submit');
      return;
    }

    const auditDetails = {
      id: Date.now(),
      ratingAuditor,
      checks: [selectToggle1, selectToggle2],
      auditorComment,
      timestamp: new Date().toLocaleString(),
    };

    const updateAuditHistory = [auditDetails, ...auditData];
    setAuditData(updateAuditHistory);
    navigation.navigate('AuditSummaryScreen', { auditData: auditDetails });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.mainTitle]}>Audit Form</Text>

      {stepAudit === 1 && (
        <>
          <Text style={styles.step}>Step 1: Enter ratingAuditor (1 to 5)</Text>
          <TextInput
            value={ratingAuditor}
            placeholder="enter here rating"
            onChangeText={setRatingAuditor}
            keyboardType="numeric"
            style={styles.input}
            maxLength={1}
          />

          <TouchableOpacity disabled={ratingAuditor?false:true} onPress={handleStepNext}>
            <Text style={[styles.select,{backgroundColor:ratingAuditor? '#32656A':'#747474'}]}>Next</Text>
          </TouchableOpacity>
        </>
      )}
      {stepAudit === 2 && (
        <>
          <Text style={styles.step}>Step 2: Select audit </Text>
          <View style={styles.RowCheck}>
            <Text>auditCheck1</Text>
            <Switch value={selectToggle1} onValueChange={setSelectToggle1} />
          </View>
          <View style={styles.RowCheck}>
            <Text>auditCheck2</Text>
            <Switch value={selectToggle2} onValueChange={setSelectToggle2} />
          </View>
          <TouchableOpacity onPress={handleStepPreview}>
            <Text style={[styles.select]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleStepNext}>
            <Text style={[styles.select]}>Next</Text>
          </TouchableOpacity>
        </>
      )}
      {stepAudit === 3 && (
        <>
          <Text style={styles.step}>Step 3: please enter Comments</Text>
          <TextInput
            value={auditorComment}
            onChangeText={setAuditorComment}
            placeholder="Write comment here auditor..."
            multiline
            numberOfLines={4}
            style={[styles.input, { height: 100 }]}
          />
           <TouchableOpacity onPress={handleStepPreview}>
            <Text style={[styles.select]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={submitButton}>
            <Text style={[styles.select]}>Submit</Text>
          </TouchableOpacity>
          
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
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
  step: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  RowCheck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  blocked: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
    marginHorizontal: 20,
  },
  select: {
    backgroundColor: '#32656A',
    color: '#ffffff',
    paddingVertical: 10,
    borderRadius: 7,
    marginVertical: 10,
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: 20,
  },
});

export default AuditFormScreen;
