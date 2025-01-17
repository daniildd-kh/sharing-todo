import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchRegistration } from "../store/actions";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRegistration({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя</label>
        <input onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label>Пароль</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <button type="submit">Зарегестрироваться</button>
    </form>
  );
};

export default RegistrationForm;
