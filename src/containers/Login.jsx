import React, { useState } from "react";
import "../styles/Login.scss";
import { useDispatch } from "react-redux";
import { getToken } from "../components/reducers/actions/loginUser";

const Login = () => {
  const [username, setUsername] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();




  const handleChange = (e) => {
    setUsername({
      ...username,
      [e.target.name]: e.target.value,
    });    
  };

  const submitRequest=(e) => {
    e.preventDefault();
    dispatch(getToken(username));

  };

  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form">
          <h2 className="login-title">Iniciar Sesión</h2>
          <div className="input-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input type="text" id="username" name="username" required onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required onChange={handleChange}/>
          </div>
          <button type="submit" className="login-button" onClick={submitRequest}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
