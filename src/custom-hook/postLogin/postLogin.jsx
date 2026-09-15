import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useLogin(url) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const hendlChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submit = (e) => {
    e.preventDefault();
    setError("");
    const post = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: user.username,
              email: user.email,
              password: user.password,
            },
          }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.user.token);

          navigate("/");
        } else {
          localStorage.setItem("vision", false);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    if (user.password.length < 3 || user.password.length > 40) {
      alert("Длина пароля должна составлять от 6 до 40 символов.");
      return;
    }
    if (user.password !== user.repeatpassword) {
      alert("Пароли не совподают.");
      return;
    }
    if (user.username.length < 3 || user.username.length > 20) {
      alert("Имя должно быть не менее 3 символов и не более 20 символов.");
      return;
    }
    post();
  };

  return { user, error, submit, hendlChange };
}
export default useLogin;
