import TesteLogin from "./TesteLogin";
import { useRouter } from 'expo-router';
import { Plus, Trash2, User  } from 'lucide-react-native';


const router = useRouter();

export default function LoginScreen() {
  function handleLogin() {
    router.replace("/restaurant");
  }

  return <TesteLogin onLogin={handleLogin} />;
}
