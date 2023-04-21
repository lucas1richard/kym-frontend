import { Typography } from '@libs/kym-dls'
import LoadableLogin from '@modules/Login';

const Homepage = () => {
  return (
    <div>
      <Typography variant="h1">Home Page</Typography>
      <LoadableLogin />
    </div>
  )
};

export default Homepage;
