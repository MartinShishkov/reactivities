import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      home page

      <Link to='/activities'>Go to activities</Link>
    </div>
  );
};

export default HomePage;