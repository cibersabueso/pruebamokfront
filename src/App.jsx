import { useState, useEffect } from 'react'
import { getProps } from './utils';
import './App.css'

function App() {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);
  const [savedData, setSavedData] = useState([])
  const [colorEnabled, setColorEnabled] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);  
  const [filterCountry, setFilterCountry] = useState('Todos');

  const [canFilter, setCanFilter] = useState(true);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const jsonData = await response.json();

      
      setData(jsonData.results);
      setInitialData(jsonData.results)
    } catch (error) {
      console.log('No se pudo obtener los datos:', error);
    }
  };

  const toggleColor = () => {
    setColorEnabled(!colorEnabled);
  };

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry);
    const dataTemporal = [...data];
    dataTemporal.sort((a, b) => {
      return a.location.country.localeCompare(b.location.country);
    })
    setData(dataTemporal);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = [...data];
    updatedUsers.splice(index, 1);
    setData(updatedUsers);
  };

  const handleFilterCountry = (event) => {
    setCanFilter(false);
    setFilterCountry(event.target.value);
    setSavedData(data);
    const filteredUsers = initialData.filter((user) => {
      if (filterCountry === 'Todos') {
        return true;
      } else {
        return user.location.country === filterCountry;
      }
    });
    setData(filteredUsers);
  };

  const getCountries = () => {
    const countries = ['Todos']; // Incluye 'Todos' en la lista de países
    initialData.forEach((user) => {
      if (!countries.includes(user.location.country)) {
        countries.push(user.location.country);
      }
    });
    return countries;
  };
  
  const handleFilter = (key) => {
    if (!canFilter) return; // Si no se puede filtrar, no hace nada

    // Definimos la orientación de la ordenación
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }

    const filteredUsers = [...data];
    filteredUsers.sort((a, b) => {
      const userA = getProps(a, key.split(".")).toLowerCase();
      const userB = getProps(b, key.split(".")).toLowerCase();

      if (userA < userB) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (userA > userB) {
        return sortDirection === 'asc' ? 1 : -1;
      }

      return 0;
    })
    setData(filteredUsers);
  };

  const handleRestoreData = () => {
    setData(initialData); // Restaura los usuarios iniciales
    setCanFilter(true);   // Habilita el filtrado
  };

  const RenderFilters = () => {
    return (
      <>
        <button onClick={toggleColor}>Cambiar Color</button>
        <button onClick={toggleSortByCountry}>Ordenar por País</button>
        <button onClick={handleRestoreData}>Restaurar Usuarios</button>
        <div>
          <label htmlFor="filter-country">Filtro por País:</label>
          <select value={filterCountry} onChange={handleFilterCountry}>
            {getCountries().map((country, idx) => (
              <option key={`country-${idx.toString()}`} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </>
    )
  }

  return (
    <>
      <h1>Usuarios</h1>
      {RenderFilters()}
      <table>
        <thead>
          <tr>
            <th style={{ cursor:'pointer' }} onClick={() => handleFilter('name.first')}>Nombre</th>
            <th style={{ cursor:'pointer' }} onClick={() => handleFilter('name.last')}>Apellido</th>
            <th style={{ cursor:'pointer' }} onClick={() => handleFilter('gender')}>Género</th>
            <th style={{ cursor:'pointer' }} onClick={() => handleFilter('email')}>Correo Electrónico</th>
            <th style={{ cursor:'pointer' }} onClick={() => handleFilter('location.country')}>País</th>
          </tr>
        </thead>
        <tbody>
          {data.length && data.map((user, idx) => (
            <tr key={`user-${idx.toString()}`} style={{
              backgroundColor: colorEnabled && idx % 2 === 0 ? '#112233' : '#556677',
            }}>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDeleteUser(idx)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
