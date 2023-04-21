import { Typography } from '@libs/kym-dls';
import Dashboard from '@modules/Dashboard';
import Homepage from '@modules/Homepage';
import { Routes, Route, Outlet, Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Typography variant="h4">Home</Typography>
    </div>
  );
}

function About() {
  return (
    <div>
      <Typography variant="h4">About</Typography>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <Typography variant="h4">Nothing to see here!</Typography>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const KymRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default KymRouter;