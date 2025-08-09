import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANGUAGE_LEVELS } from "../../../utils/constants";

const ACTIVE_LEVEL_KEY = "user_active_level";

// Fonction de mapping des anciens niveaux (peut être sortie du hook si non dynamique)
const mapOldToNewLevel = (level) => {
  const mapping = { A1: "1", A2: "2", B1: "3", B2: "4", C1: "5", C2: "6" };
  return mapping[level] || level;
};

export const useDashboardLevel = ({ progress: progressData }) => {
  const [currentLevel, setCurrentLevel] = useState("1");
  const [isLoaded, setIsLoaded] = useState(false);
  
  // État pour savoir si une valeur a été chargée depuis le stockage.
  // null = pas encore vérifié, true = trouvée, false = non trouvée.
  const [levelFoundInStorage, setLevelFoundInStorage] = useState(null);

  // Effet n°1 : Chargement initial depuis AsyncStorage.
  // Ne s'exécute qu'une seule fois au montage grâce à `[]`.
  useEffect(() => {
    const loadFromStorage = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem(ACTIVE_LEVEL_KEY);
        if (savedLevel && LANGUAGE_LEVELS[savedLevel]) {
          setCurrentLevel(mapOldToNewLevel(savedLevel));
          setLevelFoundInStorage(true);
        } else {
          setLevelFoundInStorage(false);
        }
      } catch (error) {
        console.error('Erreur chargement niveau actif:', error);
        setLevelFoundInStorage(false); // En cas d'erreur, on considère que rien n'a été trouvé
      } finally {
        setIsLoaded(true);
      }
    };

    loadFromStorage();
  }, []); // <-- La dépendance vide est la clé

  // Effet n°2 : Synchronisation avec le contexte `progress`.
  // S'exécute seulement après le chargement ET si aucun niveau n'a été trouvé en mémoire.
  useEffect(() => {
    // On n'agit que si le chargement est fini et qu'aucun niveau n'a été chargé depuis AsyncStorage
    if (isLoaded && !levelFoundInStorage) {
      const levelFromProgress = progressData?.currentLevel;
      if (levelFromProgress) {
        const mappedLevel = mapOldToNewLevel(levelFromProgress);
        if (LANGUAGE_LEVELS[mappedLevel]) {
          setCurrentLevel(mappedLevel);
        }
      }
    }
  }, [isLoaded, levelFoundInStorage, progressData]);

  // Le reste du hook est mémorisé avec useCallback pour la performance
  const handleChangeActiveLevel = useCallback(async (newLevel) => {
    if (!LANGUAGE_LEVELS[newLevel]) return;

    setCurrentLevel(newLevel);
    try {
      await AsyncStorage.setItem(ACTIVE_LEVEL_KEY, newLevel);
      // Si l'utilisateur change de niveau, on considère que la source de vérité est maintenant le stockage
      setLevelFoundInStorage(true); 
    } catch (error) {
      console.error('Erreur sauvegarde niveau actif:', error);
    }
  }, []);

  const levelColor = LANGUAGE_LEVELS[currentLevel]?.color || "#3B82F6";

  return {
    currentLevel,
    handleChangeActiveLevel,
    levelColor,
    isLoaded,
  };
};