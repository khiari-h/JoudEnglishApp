
import { render } from '@testing-library/react-native';



describe('ProgressCard', () => {
  it('affiche le titre par défaut', () => {
    const { getByText } = render(<ProgressCard />);
    expect(getByText('Progress')).toBeTruthy();
  });
});
