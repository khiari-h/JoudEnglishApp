import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ProgressCard from '../../../src/components/ui/ProgressCard';

describe('ProgressCard', () => {
  it('renders correctly with default props', () => {
    render(<ProgressCard />);
    
    expect(screen.getByText('Progression')).toBeOnTheScreen();
    
    // Chercher le texte complet ou utiliser des expressions régulières
    expect(screen.getByText('0')).toBeOnTheScreen();
    expect(screen.getByText(/\/\s*0/)).toBeOnTheScreen(); // Cherche "/" suivi de "0"
    expect(screen.getByText('0%')).toBeOnTheScreen();
  });

  it('renders with custom title and subtitle', () => {
    render(<ProgressCard title="My Progress" subtitle="Daily Goals" />);
    expect(screen.getByText('My Progress')).toBeOnTheScreen();
    expect(screen.getByText('Daily Goals')).toBeOnTheScreen();
  });

  it('displays correct progress values', () => {
    render(<ProgressCard progress={50} completed={5} total={10} />);
    
    // Chercher les valeurs numériques et utiliser regex pour le slash
    expect(screen.getByText('5')).toBeOnTheScreen();
    expect(screen.getByText(/\/\s*10/)).toBeOnTheScreen(); // Cherche "/" suivi de "10"
    expect(screen.getByText('50%')).toBeOnTheScreen();
  });

  it('expands and collapses when expandable and onToggleExpand are provided', () => {
    const handleToggleExpand = jest.fn();
    render(
      <ProgressCard
        expandable={true}
        expanded={false}
        onToggleExpand={handleToggleExpand}
        categoryData={[{ id: '1', title: 'Category 1', completed: 1, total: 2, progress: 50 }]}
      />
    );

    // Initially collapsed, category data should not be visible
    expect(screen.queryByText('Par catégorie')).toBeNull();

    // Tap to expand
    fireEvent.press(screen.getByText('Progression'));
    expect(handleToggleExpand).toHaveBeenCalledTimes(1);

    // Re-render with expanded state
    render(
      <ProgressCard
        expandable={true}
        expanded={true}
        onToggleExpand={handleToggleExpand}
        categoryData={[{ id: '1', title: 'Category 1', completed: 1, total: 2, progress: 50 }]}
      />
    );
    expect(screen.getByText('Par catégorie')).toBeOnTheScreen();
    expect(screen.getByText('Category 1')).toBeOnTheScreen();
  });

  it('calls onCategoryPress when a category is pressed', () => {
    const handleCategoryPress = jest.fn();
    const categoryData = [{ id: '1', title: 'Category 1', completed: 1, total: 2, progress: 50 }];
    render(
      <ProgressCard
        expandable={true}
        expanded={true}
        categoryData={categoryData}
        onCategoryPress={handleCategoryPress}
      />
    );

    fireEvent.press(screen.getByText('Category 1'));
    expect(handleCategoryPress).toHaveBeenCalledWith(0);
  });

  it('does not expand when expandable is false', () => {
    const handleToggleExpand = jest.fn();
    render(
      <ProgressCard
        expandable={false}
        onToggleExpand={handleToggleExpand}
        categoryData={[{ id: '1', title: 'Category 1', completed: 1, total: 2, progress: 50 }]}
      />
    );

    fireEvent.press(screen.getByText('Progression'));
    expect(handleToggleExpand).not.toHaveBeenCalled();
  });
});