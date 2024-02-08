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
      <Link to="articles?topic=coding">
        <p>Coding</p>
      </Link>
      <Link to="articles?topic=football">
        <p>Football</p>
      </Link>
      <Link to="articles?topic=cooking">
        <p>Cooking</p>
      </Link>
    </section>
  );
}
