import axios from "axios";

interface loginInterface {
  username: string;
  password: string;
}

export default function useLogin() {
  const login = (data: loginInterface) => {
    axios
      .post("http://localhost:8001/api/v1/login", data)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return { login };
}
