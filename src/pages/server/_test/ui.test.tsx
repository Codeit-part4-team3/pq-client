import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { ChannelSubjectItem } from '../_types/type';
import ChannelSubject from '../_components/ChannelSubject';

describe('toggles display style of Body on DropDownButton click', () => {
  let mockData: ChannelSubjectItem;
  let mockChild: React.ReactNode;

  beforeEach(() => {
    mockData = {
      id: 1,
      name: 'Test Subject',
    };
    mockChild = <span>Test Child</span>;

    render(<ChannelSubject data={mockData}>{mockChild}</ChannelSubject>);
  });

  it('initially hides the Body', () => {
    const button = screen.getByTestId('channel-dropdown');

    // Check initial state
    expect(screen.getByText('Test Child')).toBeVisible();

    // Simulate a button click
    fireEvent.click(button);

    // Check if the text is now present
    expect(screen.queryByText('Test Child')).not.toBeVisible();

    // Simulate another button click
    fireEvent.click(button);

    // Check if the text is hidden again
    expect(screen.getByText('Test Child')).toBeVisible();
  });
});
