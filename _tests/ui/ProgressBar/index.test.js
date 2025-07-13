
import { render } from '@testing-library/react-native';


describe('ProgressBar', () => {
  it('affiche la progression', () => {
    const { getByTestId } = render(
      <ProgressBar progress={0.5} testID="progress-bar" />
    );
    expect(getByTestId('progress-bar')).toBeTruthy();
  });
});
