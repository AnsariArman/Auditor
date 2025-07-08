
// audit Context provider
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const contextRoleSelect = createContext();

export const ContextProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [auditData, setAuditData] = useState([]);

  // audit data fetch 
  useEffect(() => {
    const  fetchAuditHistory= async () => {
      try {
        const getData = await AsyncStorage.getItem('auditStore');
        if (getData !== null) {
          setAuditData(JSON.parse(getData));
        }
      } catch{
        console.log('not found data');
      }
    };

    fetchAuditHistory();
  }, []);

  // store audit data
  useEffect(() => {
    const storeAuditHistory = async () => {
      try {
        await AsyncStorage.setItem('auditStore', JSON.stringify(auditData));
      } catch {
        console.error('invalid auditSTore data');
      }
    };

    if (auditData.length > 0) {
      storeAuditHistory();
    }
  }, [auditData]);

  return (
    <contextRoleSelect.Provider value={{ role, setRole, auditData, setAuditData }}>
      {children}
    </contextRoleSelect.Provider>
  );
};

export const roleBase = () => useContext(contextRoleSelect);

