import React, { useContext } from "react";
import { UserContext } from "./UserContext";

const UserCard = ({ user }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  // function handleLogin() {
  //   setLoggedInUser(user);
  // }

  return (
    <div className="usercard" key={user.username}>
      <h2>{user.username}</h2>
      <img src={user.avatar_url} alt={user.username} className="login-img" />
      {user.username !== loggedInUser?.username ? (
        <button
          onClick={() => {
            setLoggedInUser(user);
            localStorage.setItem("user", JSON.stringify(user));
          }}
        >
          Login
        </button>
      ) : (
        <button>Logged In!</button>
      )}
    </div>
  );
};

export default UserCard;
