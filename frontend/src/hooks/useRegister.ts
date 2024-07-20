import axios from "axios";

interface registerInterface {
  username: string;
  password: string;
}

export default function useRegister() {
  const register = (data: registerInterface) => {
    axios
      .post("http://localhost:8001/api/v1/register", data)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.accessToken)
          );
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return { register };
}
