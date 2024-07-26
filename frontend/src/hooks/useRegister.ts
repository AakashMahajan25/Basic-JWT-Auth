import axios from "axios";
import { useAuthStore } from "../context/store";

interface registerInterface {
  username: string;
  password: string;
}

export default function useRegister() {
  const { login } = useAuthStore();
  const register = (data: registerInterface) => {
    axios
      .post("http://localhost:8001/api/v1/register", data)
      .then((response) => {
        if (response.data.accessToken) {
          login(response.data);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return { register };
}
