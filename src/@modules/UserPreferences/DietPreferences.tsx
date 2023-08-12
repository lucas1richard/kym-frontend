import { useState } from 'react';
import { Button, Label, Typography, Well } from '@libs/kym-dls';

const DietPreferences = () => {
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const buttonClick = (meal: number) => {
    if (selectedMeals.includes(meal)) {
      setSelectedMeals(selectedMeals.filter((m) => m !== meal));
    } else {
      setSelectedMeals([...selectedMeals, meal]);
    }
  };
  return (
    <Well>
      <Typography variant="h4" component="h2" intlId="dietPreferences" />
      <p>
        <Typography>When we auto-generate a meal for you, which meals should we include?</Typography>
      </p>
      {[1, 2, 3, 4, 5, 6].map((meal) => {
        const isSelected = selectedMeals.includes(meal);
        return (
        <Button
          key={meal}
          variant={isSelected ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => buttonClick(meal)}
          aria-selected={isSelected}
        >
          <Typography color="inherit" intlId={`meal-${meal}`} />
        </Button>
      )})}
    </Well>
  );
};

export default DietPreferences;