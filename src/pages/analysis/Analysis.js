/** @format */

import { Container, Grid, Paper, Text, Space } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";

import DailyGraph from "./components/DailyGraph";
import AvgReturn from "./components/AvgReturn";
import TotalReturn from "./components/TotalReturn";
import StrategyGraph from "./components/StrategyGraph";
import { db } from "../../firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

const Analysis = () => {
  const { currentUser } = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const da = [];
  

  const getData = async () => {
    const q = query(collection(db, currentUser.uid), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      da.push(doc.data());
    });
    setDatas(da);

    
  };

useEffect(() => {
return ()=>{
getData(); }
},[]);

  return (
    <Container fluid mx="xs" my="md">
      <Grid columns={12}>
        <Grid.Col span={6}>
          <Paper shadow="sm" p="md" radius="md">
            <Text>Daily P/L</Text>
            <Space h="md" />
            <DailyGraph />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper shadow="sm" p="md" radius="md">
            <Text>Total Return</Text>
            <Space h="md" />
            <TotalReturn />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper shadow="sm" p="md" radius="md">
            <Text>Average Return</Text>
            <Space h="md" />
            <AvgReturn   />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper shadow="sm" p="md" radius="md">
            <Text>Strategy-wise P/L</Text>
            <Space h="md" />
            <StrategyGraph />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Analysis;
