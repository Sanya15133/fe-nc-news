import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section className="navbar">
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/articles">
        <p>Articles</p>
      </Link>
      <p>Coding</p>
      <p>Football</p>
      <p>Cooking</p>
    </section>
  );
}
