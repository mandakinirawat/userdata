import React, { useContext } from "react";
import UsersContext from "./context/UsersContext";

const UserForm = () => {
  const { user, handleChange, handleAdd } = useContext(UsersContext)

  return (
    <div>
      <form className="form">
        <input
          type="text"
          name="title"
          value={user?.title || ""}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Save</button>
      </form>
    </div>
  );
};

export default UserForm;
