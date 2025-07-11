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
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { Image } from 'react-native';
import { roleBase } from '../RoleProvider/useContextProvider';

const AuditFormScreen = ({ navigation }) => {
  const { auditData, setAuditData } = roleBase();
  const [auditImage, setAuditImage] = useState(null);

  const [stepAudit, setStepAudit] = useState(1);
  const [ratingAuditor, setRatingAuditor] = useState('');
  const [selectToggle1, setSelectToggle1] = useState(false);
  const [selectToggle2, setSelectToggle2] = useState(false);
  const [auditorComment, setAuditorComment] = useState('');

  // 1.Permission android camera
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission Required',
            message: 'We need camera access to take pictures.',
            buttonPositive: 'Allow',
            buttonNegative: 'Cancel',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert(
            'Permission Denied',
            'Camera permission is required for this feature. Please enable it in settings.',
            [
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
              { text: 'OK' },
            ],
            { cancelable: false },
          );
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    // On iOS or default allow
    return true;
  };

  //  capture Image
  const handleAuditImageCapture = async () => {
    // Request permission only on Android if true camera capture
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: true,
      },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error Camera', response.errorMessage);
          return;
        }
        const img = response.assets?.[0];
        if (img?.uri) setAuditImage(img.uri);
      },
    );
  };
  // next step
  const handleStepNext = () => setStepAudit(prev => prev + 1);
  // previous step
  const handleStepPreview = () => setStepAudit(prev => prev - 1);

  // complete form button
  const submitButton = () => {
    if (!ratingAuditor) {
      Alert.alert('message', 'Please enter rating 1 to 5 before submit');
      return;
    }
    //  merge required details
    const auditDetails = {
      id: Date.now(),
      ratingAuditor,
      checks: [selectToggle1, selectToggle2],
      auditorComment,
      auditImage,
      timestamp: new Date().toLocaleString(),
    };
    // history update
    const updateAuditHistory = [auditDetails, ...auditData];
    setAuditData(updateAuditHistory);
    navigation.replace('AuditSummaryScreen', { auditData: auditDetails });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.mainTitle]}>Audit Form</Text>
      {/*  step1 audit  */}
      {stepAudit === 1 && (
        <>
          <Text style={styles.step}>Step 1: Enter ratingAuditor</Text>
          <TextInput
            value={ratingAuditor}
            placeholder="enter here rating"
            onChangeText={setRatingAuditor}
            keyboardType="numeric"
            style={styles.input}
            maxLength={1}
          />

          <TouchableOpacity
            disabled={ratingAuditor ? false : true}
            onPress={handleStepNext}
          >
            <Text
              style={[
                styles.select,
                { backgroundColor: ratingAuditor ? '#32656A' : '#747474' },
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </>
      )}
      {/*  step2 audit  */}

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
          <View style={styles.rows}>
            <TouchableOpacity onPress={handleStepPreview}>
              <Text style={[styles.select]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleStepNext}>
              <Text style={[styles.select]}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* step 3 audit */}
      {stepAudit === 3 && (
        <>
          <Text style={styles.step}>
            Step 3: please enter Comments and Image
          </Text>
          <TextInput
            value={auditorComment}
            onChangeText={setAuditorComment}
            placeholder="Write comment here auditor..."
            multiline
            numberOfLines={4}
            style={[styles.input, { height: 70 }]}
          />
          <TouchableOpacity onPress={handleAuditImageCapture}>
            <Text style={[styles.select]}>Capture Image</Text>
          </TouchableOpacity>
          {auditImage && (
            <Image
              source={{ uri: auditImage }}
              style={{
                width: 150,
                height: 150,
                alignSelf: 'center',
                marginTop: 10,
                borderRadius: 10,
              }}
            />
          )}
            <View style={styles.rows}>
          <TouchableOpacity onPress={handleStepPreview}>
            <Text style={[styles.select]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={submitButton}>
            <Text style={[styles.select]}>Submit</Text>
          </TouchableOpacity>
          </View>
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
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingHorizontal: 40,
  },
});

export default AuditFormScreen;
