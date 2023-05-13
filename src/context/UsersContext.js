import { useState, useEffect, useReducer, createContext } from "react";
import api from "../api/Users";

const UsersContext = createContext();

const initialState = {
  loading: false,
  users: null,
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE": {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index >= 0) {
        state.users[index] = action.payload;

        return { ...state, users: [...state.users] };
      } else {
        return {
          ...state,
          users: [action.payload, ...state.users],
        };
      }
    }

    case "DELETE":
      return { ...state, users: action.payload };

    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_USERS":
      return { ...initialState, users: action.payload };
    case "ERROR":
      return { ...initialState, error: action.payload };

    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [user, setUser] = useState({
    id: state.users ? state.users.length : 0,
    title: "",
    completed: true,
  });

  useEffect(() => {
    const fetchusers = async () => {
      try {
        dispatch({ type: "LOADING" });
        const response = await api.get("/todos");
        dispatch({ type: "SET_USERS", payload: response.data });
      } catch (err) {
        console.log(`Error ${err.message}`);
        dispatch({ type: "ERROR", payload: err.message });
      }
    };
    fetchusers();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
    if (e.target.type === "checkbox") {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE", payload: user });
    setUser({
      id: state.users.length,
      title: "",
      completed: false,
    });
  };

  const handleEdit = (e) => {
    if (e.target.name === "edit") {
      const editUser = state.users.find(
        (user) => user.id === parseInt(e.target.id)
      );
      console.log(editUser);
      if (editUser) {
        setUser(editUser);
      }
    }
    if (e.target.name === "delete") {
      const users = state.users.filter(
        (user) => user.id !== parseInt(e.target.id)
      );
      dispatch({ type: "DELETE", payload: users });
    }
  };

  return (
    <UsersContext.Provider
      value={{ user, setUser, state, handleChange, handleAdd, handleEdit }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
