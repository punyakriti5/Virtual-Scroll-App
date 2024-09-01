const Row = ({ index, style }) => {
  const item = items[index];
  return (
    <div 
      style={style} 
      className="list-item"
      role="listitem"
      aria-label={item ? `Item ${item.name}` : 'Loading item'}
      tabIndex={0}
    >
      {item ? item.name : 'Loading...'}
    </div>
  );
};