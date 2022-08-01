/** @format */

import { Card, Image, Text, Group, Progress, Space } from "@mantine/core";
import { useState, useEffect, useContext } from "react";
import { db } from "../../../firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";


function StrategyWin() {
  const { currentUser } = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const da = [];
  const da2 = [];

  const getData = async () => {
    
    const q = query(collection(db, currentUser.uid), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      da.push(doc.data());
    });
    setDatas(da);

    
    const stra = [];

    da.forEach((cr, ind) => {
      const isPre = (e) => e == cr.strategy;
      var x = stra.findIndex(isPre);
      if (x === -1 && cr.status == "WIN") {
        stra.push(cr.strategy);
        da2.push({
          strategy: cr.strategy,
          count: 1,
          win: 1,
        });
      } else if (x === -1 && cr.status == "LOSS") {
        stra.push(cr.strategy);
        da2.push({
          strategy: cr.strategy,
          count: 1,
          win: 0,
        });
      } else if (x != -1 && cr.status == "WIN") {
        da2[x].count = da2[x].count + 1;
        da2[x].win = da2[x].win + 1;
      } else {
        da2[x].count = da2[x].count + 1;
        da2[x].win = da2[x].win + 0;
      }
    });
    setDatas(da2);
    
  };
  useEffect(() => {
    return ()=>{
    getData(); }
    },[]);
    
  return (
    <Card shadow="sm" p="xl" radius="md">
      <Text weight={500} size="lg" mb="lg">
        Strategy Winrate
      </Text>

      {datas.forEach((cr, ind) => {
        return (
          <>
            <Group  position="apart">
              <Text size="md">{datas.strategy}</Text>
              <Text size="sm" color="gray">
                {datas.win}/{datas.count}
              </Text>
            </Group>
            <Progress my="xs" value={(datas.win / datas.count) * 100} />
            <Space h="xs" />
          </>
        );
      })}
    </Card>
  );
}

export default StrategyWin;
