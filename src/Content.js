import React, { useContext } from "react";
import UsersContext from "./context/UsersContext";

const Content = () => {
  const { state, handleChange, handleEdit } = useContext(UsersContext);
  const { loading, users, error } = state;
  return (
    <main className="main">
      {loading && <>Loading ...</>}
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span
                style={
                  user.completed ? { textDecoration: "line-through" } : null
                }
                className="tit"
              >
                {user.title}
              </span>

              <input
                name="completed"
                type="checkbox"
                onChange={handleChange}
                value={user.completed}
              />

              <button name="delete" id={user.id} onClick={handleEdit}>
                delete
              </button>
              <button name="edit" id={user.id} onClick={handleEdit}>
                edit
              </button>
            </li>
          ))}
        </ul>
      ) : error !== "" ? (
        <p>{error}</p>
      ) : (
        <p style={{ marginTop: "80px", fontSize: "20px", color: "red" }}>
          List is empty
        </p>
      )}
      {error.message}
    </main>
  );
};

export default Content;
