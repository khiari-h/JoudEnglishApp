// src/screens/Dashboard/hooks/useDashboardRefresh.js
import { useCallback, useState } from "react";

/**
 * Unifie le rafraîchissement des sections Dashboard et expose une clé
 * pour forcer le re-render des sous-composants dépendants.
 */
export default function useDashboardRefresh({ originalOnRefresh, refreshProgress }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = useCallback(async () => {
    await Promise.all([
      originalOnRefresh(),
      refreshProgress(),
    ]);
    setRefreshKey((prev) => prev + 1);
  }, [originalOnRefresh, refreshProgress]);

  return { refreshKey, onRefresh };
}


