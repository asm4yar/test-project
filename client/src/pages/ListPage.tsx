// ListPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { ListItem } from './components';
import useData from './useData';
import useSort from './useSort';

const SubTitle: React.FC<any> = ({children}) => (
  <h2 className={'list-subtitle'}>Active Item ID: {children}</h2>
)

function ListPage() {
  const { items, loading, error } = useData();
  const [sortedItems, sortBy, handleSortClick] = useSort(items);
  
  const [activeItemId, setActiveItemId] = useState<any>(null);
  const [query, setQuery] = useState<string>('');
  
  const activeItemText = useMemo(() => activeItemId ? activeItemId : 'Empty', [activeItemId]);
  
  const filteredItems = useMemo(() => {
    if (!query) return sortedItems;
    return sortedItems.filter(item => 
      `${item.id}`.includes(query.toLowerCase().trim())
    );
  }, [sortedItems, query]);

  const handleItemClick = (id: any) => {
    setActiveItemId(id);
  };
  
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  if (loading && items.length === 0) {
    return <div className="loading">Loading initial data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className={'list-wrapper'}>
      <div className="list-header">
        <h1 className={'list-title'}>Items List</h1>
        <SubTitle>{activeItemText}</SubTitle>
        <button onClick={handleSortClick}>
          Sort ({sortBy === 'ASC' ? 'ASC' : 'DESC'})
        </button>
        <input 
          type="text" 
          placeholder='Filter by ID' 
          value={query} 
          onChange={handleQueryChange} 
        />
      </div>
      <div className="list-container">
        <div className="list">
          {filteredItems.length === 0 ? (
            <span>No items found</span>
          ) : (
            filteredItems.map((item) => (
              <ListItem
                key={item.id}
                isactive={activeItemId === item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                onClick={handleItemClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ListPage;