import { useState } from "react";
import { sendLoginRequest } from "../../service/auth.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = async () => {
    const credentials = {
      email: email,
      password: password,
    };
    setError("");
    try {
      const response = await sendLoginRequest(credentials);
      console.log({ response });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (e) {
      if (e?.response?.status === 401) {
        setError("Email or password incorrect");
      } else {
        setError("error occurs");
      }
      console.log(e);
    }
  };

  // function sendLoginRequest() {
  //   const reqBody = {
  //     email: email,
  //     password: password,
  //   };
  //
  //
  //   fetch("http://localhost:8080/api/auth/login", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "post",
  //     body: JSON.stringify(reqBody),
  //   }).then((reponse) => {
  //     if (reponse.status === 200)
  //       return Promise.all([reponse.json(), reponse.headers]);
  //   });
  // }

  return (
    <form method="POST">
      <label>Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="button" onClick={login}>
        Login
      </button>
      {error && (
        <div>
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}
