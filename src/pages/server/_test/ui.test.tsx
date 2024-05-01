import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { ChannelGroupData } from '../_types/type';
import ChannelGroup from '../_components/ChannelGroup';
import { useMutationPost } from 'src/apis/service/service';

// 모킹
jest.mock('src/apis/service/service', () => ({
  useMutationPost: jest.fn(),
}));

describe('toggles display style of Body on DropDownButton click', () => {
  let mockData: ChannelGroupData;
  let mockChild: React.ReactNode;

  beforeEach(() => {
    (useMutationPost as jest.Mock).mockReturnValue([
      jest.fn(),
      { data: mockData, error: null, isLoading: false, isSuccess: true },
    ]);
    mockData = {
      id: 1,
      name: 'Test Subject',
    };
    mockChild = <span>Test Child</span>;

    render(<ChannelGroup data={mockData}>{mockChild}</ChannelGroup>);
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
