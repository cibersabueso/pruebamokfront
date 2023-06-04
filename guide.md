# Guía de Documentación del Proyecto

Este documento proporciona una guía para documentar el proyecto. Incluye descripciones de los archivos principales y sus funciones, aquí vamos:

## Archivo App.jsx
Obviar este archivo, ya que usaremos el patrón Flux que nos da más orden en la codificación de la aplicación.

## Archivo AppFlux.jsx

El archivo `AppFlux.jsx` es el componente principal de la aplicación. Gestiona el estado, realiza peticiones de datos y muestra la interfaz de usuario. A continuación se describen las principales funciones y componentes presentes en este archivo:

- `fetchData()`: Esta función realiza una petición a una API para obtener los datos de los usuarios. Luego, llama a la acción `fetchData()` del store para actualizar el estado con los datos obtenidos.

- `handleFilterColumn(column)`: Esta función se ejecuta al hacer clic en una columna de la tabla. Llama a la acción `updateSort(column)` del store para actualizar el estado y ordenar los usuarios por la columna seleccionada.

- `handleDeleteUser(idx)`: Esta función se ejecuta al hacer clic en el botón "Eliminar" de una fila de la tabla. Llama a la acción `deleteUser(idx)` del store para eliminar el usuario correspondiente del estado.

- `handleFilterChange(event)`: Esta función se ejecuta al cambiar el valor del filtro por país. Llama a la acción `updateCountryFilter(value)` del store para actualizar el estado y filtrar los usuarios por el país seleccionado.

- `handleRestoreData()`: Esta función se ejecuta al hacer clic en el botón "Restaurar Usuarios". Llama a la acción `restoreData()` del store para restaurar los usuarios originales en el estado.

- `toggleColor()`: Esta función se ejecuta al hacer clic en el botón "Cambiar Color". Actualiza el estado para habilitar o deshabilitar el cambio de color de las filas de la tabla.

- `toggleSortByCountry()`: Esta función se ejecuta al hacer clic en el botón "Ordenar por País". Llama a la acción `sortByCountry()` del store para ordenar los usuarios por el campo de país.

- `sortArrow(column)`: Esta función devuelve una flecha ascendente o descendente según la columna actualmente ordenada en el estado.

## Archivo store.js

El archivo `store.js` contiene la lógica del store de la aplicación. Gestiona el estado y realiza acciones de actualización del estado. A continuación se describen las principales funciones y acciones presentes en este archivo:

- `getState()`: Esta función devuelve el estado actual de la aplicación almacenado en la variable `state`.

- `sortByColumn(column)`: Esta función realiza el ordenamiento de los usuarios por la columna especificada. Devuelve un nuevo array de usuarios ordenados según la columna y la dirección de ordenamiento actual.

- `filterUsersByCountry(users, country)`: Esta función filtra los usuarios por país. Recibe un array de usuarios y un país como parámetros y devuelve un nuevo array con los usuarios filtrados por el país especificado.

- `updateState(newState)`: Esta función actualiza el estado de la aplicación con el nuevo estado proporcionado en `newState`. Luego, envía una acción al dispatcher para notificar a los componentes registrados sobre el cambio de estado.

- `actions`: Este objeto contiene las acciones disponibles en la aplicación. Cada acción realiza una operación específica y llama a `updateState` para actualizar el estado.

## Archivo utils.js

El archivo `utils.js` contiene utilidades utilizadas en la aplicación. A continuación se describen las principales funciones presentes en este archivo:

- `getProps(object, path)`: Esta función recibe un objeto y una ruta de acceso (`path`) como parámetros y devuelve el valor correspondiente al recorrer el objeto utilizando la ruta de acceso.

- `logging(className)`: Esta función imprime un mensaje de log en la consola indicando la ejecución de una clase o función específica.

