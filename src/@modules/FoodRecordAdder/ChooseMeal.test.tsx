import { render } from '@testing-library/react';
import ChooseMeal from './ChooseMeal';

// unit tests for the ChooseMeal component
describe('ChooseMeal', () => {
  it('should render', () => {
    // Arrange
    const { container } = render(<ChooseMeal />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
