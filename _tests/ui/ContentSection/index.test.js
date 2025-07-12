import React from 'react';
import { render } from '@testing-library/react-native';
import ContentSection from '../../../src/components/ui/ContentSection';
import { Text } from 'react-native';

describe('ContentSection', () => {
  it('rend le titre et les enfants', () => {
    const { getByText } = render(
      <ContentSection title="Titre test">
        <Text>Contenu section</Text>
      </ContentSection>
    );
    expect(getByText('Titre test')).toBeTruthy();
    expect(getByText('Contenu section')).toBeTruthy();
  });
});
