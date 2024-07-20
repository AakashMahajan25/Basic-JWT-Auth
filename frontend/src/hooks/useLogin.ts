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
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return { login };
}
