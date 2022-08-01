import React, {useState, useContext, useEffect} from 'react';
import { Grid, Skeleton, Container, Paper, Center } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import StrategyWin from './components/StrategyWin';
import WinRatio from './components/WinRatio';
import AvgReturn from './components/AvgReturn';
import TotalReturn from './components/TotalReturn';
import TradeTable from './components/TradeTable';
import AddTrade from './components/AddTrade';
import { db } from "../../firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";


const child = <Skeleton height={140} radius="md" animate={false} />;

function Dashboard() {

  const [update, setUpdate] = useState(false);


 const handleUpdate =()=>{
      setUpdate(!update);
 }
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
      <>
      <AddTrade handleUpdate={handleUpdate} />
      <Container my="xl" mx="xs" fluid="true">
        <Grid>
          <Grid.Col span={9}>
            <Grid columns={24} >
                <Grid.Col span={9}><TotalReturn data={datas}/></Grid.Col>
                <Grid.Col span={6}><WinRatio data={datas}/></Grid.Col>
                <Grid.Col span={9}><AvgReturn data={datas}/></Grid.Col>
               
                <Grid.Col span={24}><TradeTable/></Grid.Col>

            </Grid>
          </Grid.Col>
          <Grid.Col span={3}>
          <Grid >
                <Grid.Col span={12}>
                    <Paper shadow="sm" radius="md">
                        <Center py="sm" >
                            <Calendar />
                        </Center>
                    </Paper>

                </Grid.Col>
                <Grid.Col span={12}>
                    <StrategyWin data={datas}/>
                </Grid.Col>
                

            </Grid>
          </Grid.Col>
          
        </Grid>
      </Container>
      </>
    );
  }

export default Dashboard;
