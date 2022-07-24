import { Kbd, TextInput } from '@mantine/core';
import { Search } from 'tabler-icons-react';

function SearchBar() {
  
  
  return (
    <TextInput
      style={{width:'250px'}}
      placeholder="Search"
      icon={<Search size={16} />}
      
      styles={{ rightSection: { pointerEvents: 'none' } }}
    />
  );
}

export default SearchBar;