import { Card, Image, Text, Group, Progress, Space } from '@mantine/core';
import { useState, useEffect } from 'react';

function StrategyWin({data}) {

  const [datas, setDatas] = useState([]);
  const da = data;
  const da2 = [];

  const getData =  () => {
    const stra=[];

    da.forEach((cr, ind)=>{
      const isPre = (e) => e == cr.strategy; 
      var x = stra.findIndex(isPre);
      if (x===-1 && cr.status =="WIN"){
        stra.push(cr.strategy);
        da2.push({
          strategy: cr.strategy,
          count : 1,
          win : 1,
        });
      }else if(x===-1 && cr.status =="LOSS") {
        stra.push(cr.strategy);
        da2.push({
          strategy: cr.strategy,
          count : 1,
          win : 0,
        });
      }else if (x!=-1 && cr.status =="WIN"){
        da2[x].count = da2[x].count + 1;
        da2[x].win = da2[x].win + 1;
      }else {
        da2[x].count = da2[x].count + 1;
        da2[x].win = da2[x].win + 0;
      }
	  
    })
    setDatas(da2);
    

  }
useEffect(() => {

 
    getData(); 
  
    
  
},[datas]);





  return (
    <Card
      shadow="sm"
      p="xl"
      radius="md"
    
      
    >

      <Text weight={500} size="lg" mb="lg">
        Strategy Winrate
      </Text>

      {datas.map((cr, ind)=>{
        return (
          <>
          <Group key={datas.strategy} position="apart">
            <Text size="md" >
             {datas.strategy}
             </Text>
      <Text size="sm"  color="gray">
       {datas.win}/{datas.count}
      </Text>
      </Group>
      <Progress my="xs" value={(datas.win/datas.count)*100} />
      <Space h="xs"/>
          </>
        )
      })

      }

      

      

    </Card>
  );
}

export default StrategyWin;