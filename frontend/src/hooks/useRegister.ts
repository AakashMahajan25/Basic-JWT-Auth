import axios from "axios";

interface registerInterface {
  username: string;
  password: string;
}

export default function useRegister() {
  const register = (data: registerInterface) => {
    axios
      .post("http://localhost:8001/api/v1/register", data)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return { register };
}
