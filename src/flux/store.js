import { dispatch } from "./dispatcher";
import { getProps, logging } from "../utils";

let state = {
  users: [],
  filteredUsers: [],
  sortColumn: null,
  sortDirection: "asc",
  filters: {
    country: "",
  },
  activeFilter: true,
};

export const getState = () => state;

const sortByColumn = (column) => {
  logging("sortByColumn");
  const { filteredUsers, sortDirection, activeFilter } = getState();

  if (!activeFilter) return filteredUsers;

  const sortedUsers = [...filteredUsers].sort((userA, userB) => {
    const userFieldA = getProps(userA, column.split(".")).toLowerCase();
    const userFieldB = getProps(userB, column.split(".")).toLowerCase();

    if (userFieldA < userFieldB) {
      return sortDirection === "asc" ? -1 : 1;
    } else if (userFieldA > userFieldB) {
      return sortDirection === "asc" ? 1 : -1;
    }

    return 0;
  });

  return sortedUsers;
};

const filterUsersByCountry = (users, country) => {
  logging("filterUsersByCountry");
  if (country === "") {
    return users;
  }

  const filteredUsers = users.filter((user) => {
    const userCountry = user.location.country.toLowerCase();
    return userCountry === country.toLowerCase();
  });

  updateState({ filteredUsers }); // Actualizar el estado con los usuarios filtrados

  return filteredUsers;
};

export const updateState = (newState) => {
  console.log("\n\n");
  logging("updateState");
  const { users, filteredUsers, sortColumn, sortDirection, filters } =
    getState();

  const updatedState = {
    users: newState.users || users,
    filteredUsers: newState.filteredUsers || filteredUsers,
    sortColumn: newState.sortColumn || sortColumn,
    sortDirection: newState.sortDirection || sortDirection,
    filters: {
      ...filters,
      ...newState.filters,
    },
    activeFilter: newState.activeFilter || false,
  };

  state = updatedState;
  dispatch({ type: "STATE_UPDATED", payload: state });
};

export const actions = {
  fetchData: (users) => {
    logging("fetchData");
    updateState({ users, filteredUsers: users });
  },

  updateCountryFilter: (country) => {
    logging("updateFilterCountry");
    const { users } = state;

    const filteredUsers = filterUsersByCountry(users, country);
    updateState({ filters: { country }, filteredUsers });
  },

  updateSort: (column) => {
    logging("updateSort");
    const { sortColumn, sortDirection, activeFilter } = state;

    if (!activeFilter) return;

    let newSortColumn = column;
    let newSortDirection = "asc";

    if (column === sortColumn) {
      newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    }

    const sortedUsers = sortByColumn(column);

    updateState({
      sortColumn: newSortColumn,
      sortDirection: newSortDirection,
      filteredUsers: sortedUsers,
      activeFilter: true,
    });
  },

  sortByCountry: () => {
    logging("sortByCountry");

    const { filteredUsers } = getState();
    const column = "location.country";

    const sortedUsers = [...filteredUsers].sort((userA, userB) => {
      const userFieldA = getProps(userA, column.split(".")).toLowerCase();
      const userFieldB = getProps(userB, column.split(".")).toLowerCase();

      if (userFieldA < userFieldB) return -1;

      return 0;
    });

    updateState({
      sortColumn: column,
      sortDirection: "asc",
      filteredUsers: sortedUsers,
      activeFilter: false,
    });
  },

  deleteUser: (userId) => {
    logging("deleteUser");
    const { filteredUsers } = state;
    const updatedFilteredUsers = filteredUsers.filter(
      (user) => user.login.uuid !== userId
    );

    updateState({ filteredUsers: updatedFilteredUsers });
  },

  restoreData: () => {
    logging("restoreData");
    const { users } = getState();
    updateState({ filteredUsers: users, activeFilter: true });
  },
};
