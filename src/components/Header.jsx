// import { useContext } from "react";
// import { UserContext } from "./UserContext";

export default function Header() {
  // const { loggedInUser } = useContext(UserContext);
  // console.log(loggedInUser, 'log in')
  // const currentUser = JSON.parse(localStorage.getItem("user"));
  // console.log(currentUser);

  // console.log(loggedInUser, "here");
  return (
    <div className="header">
      <h1>NC News</h1>
      {/* {!currentUser ? (
        <p className="username">{loggedInUser.username}</p>
      ) : (
        <p className="username">{currentUser.username}</p>
      )} */}
    </div>
  );
}
