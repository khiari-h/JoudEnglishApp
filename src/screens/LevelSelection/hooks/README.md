# useLevelListData

Prépare les données d'affichage pour `LevelSelection` en séparant la logique (progression, hasStarted) du rendu UI.

## API
- Entrée: `{ getLevelProgress(levelId), hasProgress(exerciseId, levelId) }`
- Sortie: `{ currentUserLevel: number, currentLevelData, levels: Array<LevelCardData> }`

### LevelCardData
- `{ id, title, progress, color, icon, hasProgress, hasStarted }`

## Notes
- Ne déclenche aucun effet; tout est calculé via `useMemo`.
- Conçu pour être facilement testable.
