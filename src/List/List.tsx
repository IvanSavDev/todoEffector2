export const List = ({ items = [] }: { items: [] }) => {
  if (items.length === 0) return null;

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
