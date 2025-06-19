import { useRoute } from "@react-navigation/native";
import Dashboard from "../../src/screens/Dashboard";

export default function DashboardScreen() {
  const route = useRoute();
  return <Dashboard route={route} />;
}
