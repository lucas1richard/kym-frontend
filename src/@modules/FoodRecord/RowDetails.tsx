import { Typography } from '@libs/kym-dls'

const RowDetails: React.FC<RowDetailsProps> = ({ record }) => {
  return (
      <>
        <Typography>
          <Typography intlId="calories" component="span" />: {record.calories}
        </Typography>
        <Typography>
          <Typography intlId="protein" component="span" />: {record.protein}
        </Typography>
        <Typography>
          <Typography intlId="carbs" component="span" />: {record.carbohydrates}
        </Typography>
        <Typography>
          <Typography intlId="fat" component="span" />: {record.fat}
        </Typography>
      </>
    );
};

interface RowDetailsProps {
  record: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  }
}

export default RowDetails;