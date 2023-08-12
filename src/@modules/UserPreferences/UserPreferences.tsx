import { Typography } from '@libs/kym-dls';
import DietPreferences from './DietPreferences';

const UserPreferences = () => (
  <div>
    <Typography variant="h2" component="h1" intlId="userPreferences" />
    <DietPreferences />
  </div>
);

export default UserPreferences;
