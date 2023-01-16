import { Link } from "react-router-dom";

const Homepage = ({ paths = {} }) => {
  return (
    <div className="home">
      <h1>Widgets</h1>

      <div className="widgets">
        {Object.entries(paths).map(([name, path], index) => {
          return (
            <Link to={path} key={index}>
              <h2>{name}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
