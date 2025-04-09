// useSort.ts
import { useMemo, useState } from 'react';

function useSort(items: any[]): [any[], string, () => void] {
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('ASC');
  
  const sortedItems = useMemo(() => {
    const itemsCopy = [...items];
    return itemsCopy.sort((a, b) => 
      sortBy === 'ASC' ? a.id - b.id : b.id - a.id
    );
  }, [items, sortBy]);
  
  const handleSortClick = () => {
    setSortBy(prev => prev === 'ASC' ? 'DESC' : 'ASC');
  }
  
  return [sortedItems, sortBy, handleSortClick];
}

export default useSort;