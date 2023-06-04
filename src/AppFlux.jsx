import { useState, useEffect, Fragment } from "react";
import { registerStore, unregisterStore } from "./flux/dispatcher";
import { actions, getState } from "./flux/store";
import "./App.css";

function App() {
  const [state, setState] = useState(getState());
  const [colorEnabled, setColorEnabled] = useState(false);

  useEffect(() => {
    registerStore(updateStore);
    fetchData();
    return () => {
      unregisterStore(updateStore);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const jsonData = await response.json();

      const usersData = jsonData.results;
      actions.fetchData(usersData);
    } catch (error) {
      console.log("No se pudo obtener los datos:", error);
    }
  };

  const updateStore = () => {
    setState(getState());
  };

  const handleFilterColumn = (column) => {
    actions.updateSort(column);
  };

  const handleDeleteUser = (idx) => {
    actions.deleteUser(idx);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    actions.updateCountryFilter(value);
  };

  const handleRestoreData = () => {
    actions.restoreData();
  };

  const toggleColor = () => {
    setColorEnabled(!colorEnabled);
  };

  const toggleSortByCountry = () => {
    actions.sortByCountry();
  };

  const sortArrow = (column) => {
    if (state.sortColumn === column) {
      return state.sortDirection === "asc" ? "↑" : "↓";
    }
    return "";
  };

  return (
    <Fragment>
      <h1>Usuarios</h1>
      <button onClick={toggleColor}>Cambiar Color</button>
      <button onClick={handleRestoreData}>Restaurar Usuarios</button>
      <button onClick={toggleSortByCountry}>Ordenar por País</button>
      <div>
        <label htmlFor='countryFilter'>Filtro por País:</label>
        <select id='countryFilter' onChange={handleFilterChange}>
          <option value=''>Todos</option>
          {[...new Set(state.users.map((user) => user.location.country))].map(
            (country) => (
              <option key={country} value={country}>
                {country}
              </option>
            )
          )}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleFilterColumn("name.first")}>
              Nombre {sortArrow("name.first")}
            </th>
            <th onClick={() => handleFilterColumn("name.last")}>
              Apellido {sortArrow("name.last")}
            </th>
            <th onClick={() => handleFilterColumn("gender")}>
              Género {sortArrow("gender")}
            </th>
            <th onClick={() => handleFilterColumn("email")}>
              Correo Electrónico {sortArrow("email")}
            </th>
            <th onClick={() => handleFilterColumn("location.country")}>
              País {sortArrow("location.country")}
            </th>
          </tr>
        </thead>
        <tbody>
          {state.filteredUsers.length &&
            state.filteredUsers.map((user, idx) => (
              <tr
                key={user.login.uuid}
                style={{
                  backgroundColor:
                    colorEnabled && idx % 2 === 0 ? "#112233" : "#556677",
                }}
              >
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.login.uuid)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default App;
