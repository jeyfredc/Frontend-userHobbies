import React, { useEffect, useState } from "react";
import "../../styles/components/UserTable.scss";
import {
  addPerson,
  deletePerson,
  editPerson,
  getAllUsers,
} from "../reducers/actions/managementUsers";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/actions/loginUser";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(null);
  const [desactiveFields, setDesactiveFields] = useState({});
  const dispatch = useDispatch();
  const { authReducer, usersReducer } = useSelector((state) => state);
  const [activeSelectFields, setActiveSelectFields] = useState({});



  const navigate = useNavigate();
  useEffect(() => {
    if (authReducer.token !== "") {
      dispatch(getAllUsers(authReducer.token));
    }
  }, [authReducer.token, dispatch]);

  useEffect(() => {
    if(usersReducer.updateSuccessfully){
      setDesactiveFields((prevState) => ({
        ...prevState,
        [usersReducer.userId]: !prevState[usersReducer.userId],
      }));
    }
    if(usersReducer.addSuccessfully){
      setNewUser(null);
      setUsers([])
      setDesactiveFields({});
      setActiveSelectFields({});
      dispatch(getAllUsers(authReducer.token));
    }
  }, [usersReducer.updateSuccessfully, usersReducer.addSuccessfully,usersReducer.userId, authReducer.token, dispatch]);
  
  useEffect(() => {
    if (usersReducer.users) {
      setUsers(usersReducer.users);

      const activeFields = usersReducer.users.reduce((stateField, user) => {
        stateField[user.id] = true;
        return stateField;
      }, {});
      setDesactiveFields(activeFields);
    }
  }, [usersReducer.users]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const changeData = (e, userId) => {
    const { name, value } = e.target;
    setUsers((prevState) =>
      prevState.map((user) =>
        user.id === userId ? { ...user, [name]: value } : user
      )
    );
  };

  const onEdit = (userId) => {
    setDesactiveFields((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const savePersonEdited = (userId) => {
    const user = users.find((user) => user.id === userId);
    const dataUser = {
      name: user.name,
      last_name: user.last_name,
      hobbie: user.hobbie,
    };
    dispatch(editPerson(userId, dataUser, authReducer.token));

  };

  const deleteUser = (userId) => {
    dispatch(deletePerson(userId, authReducer.token));
    setUsers((prevState) => prevState.filter((user) => user.id !== userId));
  };

  const addToList = () => {
    let idNewUser=0;
    users.map((user) => {
      idNewUser = user.id+1;
    });    
    
    const newUser = {
      id: idNewUser,
      type_document: "",
      document_number: "",
      name: "",
      last_name: "",
      hobbie: "",
    };
    setUsers([...users, newUser]);
    setNewUser(newUser);
    setActiveSelectFields((prevState) => ({
      ...prevState,
      [newUser.id]: true,
    }));
  };

 const saveNewPerson = (userId) => {

    const user = users.find((user) => user.id === userId);
    const dataUser = {
      type_document: user.type_document,
      document_number: user.document_number,
      name: user.name,
      last_name: user.last_name,
      hobbie: user.hobbie,
    };
    dispatch(addPerson(dataUser, authReducer.token));
  }


  return (
    <div>
      <div className="header">
        <h1 className="header-title">Gestión de Usuarios</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="user-table-container">
        <div className="c-plus">
          <button className="b-plus">
            <FontAwesomeIcon
              icon={faPlus}
              className="i-plus"
              onClick={addToList}
            />
            Crear nuevo usuario
          </button>
        </div>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo Documento</th>
              <th>Número Documento</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Hobbie</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {users.map((user) => (
            <tbody key={user.id}>
              <tr>
                <td>{user.id}</td>
                <td>
                  {activeSelectFields[user.id] ? (
                    <select
                      name="type_document"
                      value={user.type_document}
                      onChange={(e) => changeData(e, user.id)}
                      className="field-input-active"
                    >
                      <option value="">Seleccionar</option>
                      <option value="CC">CC</option>
                      <option value="CE">CE</option>
                      <option value="TI">TI</option>
                      <option value="RC">RC</option>
                    </select>
                  ) : (
                    user.type_document
                  )}
                </td>
                <td>
                  {" "}
                  {activeSelectFields[user.id] ? (
                    <input
                      type="text"
                      name="document_number"
                      className={
                        desactiveFields[user.id]
                          ? "field-input-deactive"
                          : "field-input-active"
                      }
                      onChange={(e) => changeData(e, user.id)}
                      disabled={desactiveFields[user.id]}
                    />
                  ) : (
                    user.document_number
                  )}
                </td>
                <td>
                  <input
                    name="name"
                    className={
                      desactiveFields[user.id]
                        ? "field-input-deactive"
                        : "field-input-active"
                    }
                    type="text"
                    value={user.name}
                    onChange={(e) => changeData(e, user.id)}
                    disabled={desactiveFields[user.id]}
                  />
                </td>
                <td>
                  <input
                    name="last_name"
                    className={
                      desactiveFields[user.id]
                        ? "field-input-deactive"
                        : "field-input-active"
                    }
                    type="text"
                    value={user.last_name}
                    onChange={(e) => changeData(e, user.id)}
                    disabled={desactiveFields[user.id]}
                  />
                </td>
                <td>
                  <input
                    name="hobbie"
                    className={
                      desactiveFields[user.id]
                        ? "field-input-deactive"
                        : "field-input-active"
                    }
                    type="text"
                    value={user.hobbie}
                    onChange={(e) => changeData(e, user.id)}
                    disabled={desactiveFields[user.id]}
                  />
                </td>
                <td className="buttons-actions">

            
                  <button
                    className="button-edit"
                    onClick={() => {
                      onEdit(user.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />{" "}
                  </button>
          
                  {newUser?.id ? (
                    <button
                      className="button-save"
                      onClick={() => saveNewPerson(user.id)}
                    >
                      <FontAwesomeIcon icon={faSave} />{" "}
                    </button>
                  ) : (
                    <button
                      className="button-save"
                      onClick={() => savePersonEdited(user.id)}
                    >
                      <FontAwesomeIcon icon={faSave} />{" "}
                    </button>
                  )}
                  <button
                    className="button-delete"
                    onClick={() => deleteUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default UserTable;
