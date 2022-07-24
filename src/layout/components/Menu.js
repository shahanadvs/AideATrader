import { Menu, Text, Avatar, Group, } from '@mantine/core';
import { Settings,ChevronDown,  } from 'tabler-icons-react';
import React from 'react';



         

function MenuDrop({firstName, lastName}) {


  return (
    <Menu
    placement='end'
    control={<Group spacing={7}>
    <Avatar color="cyan" radius="xl">XL </Avatar>
    <Text weight={500}>{firstName} {lastName}</Text>
    <ChevronDown size={18} /> 
   </Group>}>
      
      <Menu.Item
        icon={<Settings size={16} />}
        rightSection={
          <Text size="sm" color="gray">
            ⌘K
          </Text>
        }
      >
        Label
      </Menu.Item>
    </Menu>
  );
}

export default MenuDrop;