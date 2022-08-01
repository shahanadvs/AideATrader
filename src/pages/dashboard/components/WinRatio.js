import { Text, Paper, Group, Stack, RingProgress } from '@mantine/core';
import { ArrowUpRight } from 'tabler-icons-react';
import {useState, useEffect} from "react";


function WinRatio({data}) {


  const da = data;
  const [win, setWin] = useState(0);

  const getData =  () => {
    var win =0;
    

    da.forEach((cr)=>{
      if (cr.status == "WIN"){
        win +=1;
      }
	  
    })
    const p = (win/da.length)*100;
    setWin(p)

  }
  useEffect(() => {

    
      
        getData();
       
        
      
    
  },[win]);




  return (
    <Paper shadow="sm" p="md" radius="md">
      <Group position='left' py="xs">
            <Stack>
                <Text color="gray">Win Ratio</Text>
                <Group spacing="xs">
                <Text  size="xl" weight="500" >{win}%</Text>
                
                
                </Group>
            </Stack>
            <RingProgress 
    
                size={80}
                thickness={5}
                roundCaps
                my="-2px"
                sections={[{ value: win, color: 'green' }]} 
                label={
                    <Text color="green" weight={450} align="center" size="xl">
                      {win}%
                    </Text>
                  }
            />
      </Group>
    </Paper>
  );
}

export default WinRatio;