import { Grid, Typography, Well } from '@libs/kym-dls';
import LoadableDateJust from '@modules/DateJust';
import LoadableDayType from '@modules/DayType';
import FoodRecord from '@modules/FoodRecord';
import LoadableFoodRecordAdder from '@modules/FoodRecordAdder';

const Dashboard = () => (
  <Grid
    templateColumnsSm="1fr"
    templateColumnsMd="1fr 1fr"
    templateColumnsLg="1fr 1fr"
    templateColumnsXl="1fr 1fr"
    gap="2rem"
    gapSm="1rem"
  >
    <Well>
      <LoadableDateJust />
    </Well>
    <Well>
      <LoadableDayType />
    </Well>
    <Well>
      <LoadableFoodRecordAdder />
    </Well>
    <Well>
      <FoodRecord />
    </Well>
  </Grid>
);

export default Dashboard;
