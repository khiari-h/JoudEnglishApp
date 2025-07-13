import { useRoute } from "@react-navigation/native";


export default function DashboardScreen() {
  const route = useRoute();
  return <Dashboard route={route} />;
}
