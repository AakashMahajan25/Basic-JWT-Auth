import axios from "axios";
import { useAuthStore } from "../context/store";
import { useNavigate } from "react-router-dom";

interface loginInterface {
  username: string;
  password: string;
}

export default function useLogin() {
  const { login } = useAuthStore();
  const loginHook = (data: loginInterface) => {
    axios
      .post("http://localhost:8001/api/v1/login", data)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          login(response.data);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return { loginHook };
}
