import React, { useEffect, useState, useContext } from "react";
import { getUsers } from "../../api";
import UserCard from "./UserCard";
import { UserContext } from "./UserContext";

const AllUsers = () => {
  const { loggedInUser, setLoggednUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <div className="user-page">
      <h2>Login</h2>
      <p>Click on a user to log in!</p>
      {users.map((user) => (
        <UserCard key={user.username} user={user} />
      ))}
    </div>
  );
};

export default AllUsers;
