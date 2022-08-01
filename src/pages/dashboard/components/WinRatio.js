import { Text, Paper, Group, Stack, RingProgress } from '@mantine/core';
import { ArrowUpRight } from 'tabler-icons-react';
import {useState, useEffect, useContext} from "react";
import { db } from "../../../firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";

function WinRatio() {

  const { currentUser } = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const da = [];
  const da2 = [];
  const [win, setWin] = useState(0);

  const getData = async () => {
    
    const q = query(collection(db, currentUser.uid), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      da.push(doc.data());
    });
    setDatas(da);


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
    return ()=>{
    getData(); }
    },[]);
    




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