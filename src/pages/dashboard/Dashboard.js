import React from 'react';
import { Grid, Skeleton, Container, Paper, Center } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import StrategyWin from './components/StrategyWin';
import WinRatio from './components/WinRatio';
import AvgReturn from './components/AvgReturn';
import TotalReturn from './components/TotalReturn';
import TradeTable from './components/TradeTable';
import AddTrade from './components/AddTrade';

const child = <Skeleton height={140} radius="md" animate={false} />;

function Dashboard() {
    return (
      <>
      <AddTrade/>
      <Container my="xl" mx="xs" fluid="true">
        <Grid>
          <Grid.Col span={9}>
            <Grid columns={24} >
                <Grid.Col span={9}><TotalReturn/></Grid.Col>
                <Grid.Col span={6}><WinRatio/></Grid.Col>
                <Grid.Col span={9}><AvgReturn/></Grid.Col>
               
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
                    <StrategyWin/>
                </Grid.Col>
                

            </Grid>
          </Grid.Col>
          
        </Grid>
      </Container>
      </>
    );
  }

export default Dashboard;
