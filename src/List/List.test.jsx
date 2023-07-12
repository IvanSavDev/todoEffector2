import { render, screen } from '@testing-library/react';
import { List } from './List';

const data = ['html', 'css', 'js'];

describe('List component', () => {
  test('List render', () => {
    render(<List items={data} />);

    expect(screen.getByText('html')).toBeInTheDocument();
  });
  test('Exist list', () => {
    render(<List items={data} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  test('Render without list', () => {
    render(<List />);

    expect(screen.queryByRole('list')).toBeNull();
  });
  test('Snapshot', () => {
    const view = render(<List items={data} />);

    expect(view).toMatchSnapshot();
  });
  test('Empty snapshot', () => {
    const view = render(<List />);

    expect(view).toMatchSnapshot();
  });
});
