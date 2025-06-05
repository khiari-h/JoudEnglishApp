// src/hooks/useLocalStorage.js
import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook pour stocker et récupérer des données dans AsyncStorage
 * avec gestion d'état React
 * 
 * @param {string} key - Clé utilisée pour stocker la valeur
 * @param {*} initialValue - Valeur par défaut si rien n'est trouvé en storage
 */
const useLocalStorage = (key, initialValue) => {
  // État pour stocker notre valeur
  const [storedValue, setStoredValue] = useState(initialValue);

  // Flag pour indiquer si les données ont été chargées
  const [loaded, setLoaded] = useState(false);

  // Erreur éventuelle
  const [error, setError] = useState(null);

  // Ref pour éviter les changements de initialValue
  const initialValueRef = useRef(initialValue);
  
  // Fonction pour charger la valeur depuis AsyncStorage
  const getStoredValue = useCallback(async () => {
    try {
      // Récupérer la valeur depuis AsyncStorage
      const item = await AsyncStorage.getItem(key);

      // Analyser la valeur stockée ou retourner initialValue
      const value = item ? JSON.parse(item) : initialValueRef.current;
      setStoredValue(value);
      setLoaded(true);
      setError(null);
      return value;
    } catch (error) {
      console.error('Error reading from AsyncStorage:', error);
      setError(error);
      setLoaded(true);
      return initialValueRef.current;
    }
  }, [key]); // ← Seulement 'key' dans les dépendances

  // Fonction pour définir une valeur dans AsyncStorage et dans l'état
  const setValue = useCallback(async (value) => {
    try {
      // Permettre à la valeur d'être une fonction pour la même API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Sauvegarder dans l'état
      setStoredValue(valueToStore);

      // Sauvegarder dans AsyncStorage
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      setError(null);
    } catch (error) {
      console.error('Error writing to AsyncStorage:', error);
      setError(error);
    }
  }, [key, storedValue]);

  // Fonction pour supprimer une valeur de AsyncStorage
  const removeValue = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(initialValueRef.current);
      setError(null);
    } catch (error) {
      console.error('Error removing from AsyncStorage:', error);
      setError(error);
    }
  }, [key]);

  // Charger la valeur depuis AsyncStorage au montage SEULEMENT
  useEffect(() => {
    let mounted = true;
    
    const loadInitialValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        const value = item ? JSON.parse(item) : initialValueRef.current;
        
        if (mounted) {
          setStoredValue(value);
          setLoaded(true);
          setError(null);
        }
      } catch (error) {
        if (mounted) {
          console.error('Error loading initial value:', error);
          setError(error);
          setLoaded(true);
        }
      }
    };

    loadInitialValue();

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [key]); // ← Seulement 'key', pas getStoredValue !

  return {
    value: storedValue,
    setValue,
    removeValue,
    getStoredValue,
    loaded,
    error,
  };
};

export default useLocalStorage;