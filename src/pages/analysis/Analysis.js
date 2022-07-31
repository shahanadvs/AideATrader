import { 

    Container,
    Grid,
    Paper,
    Text,
    Space,
} from '@mantine/core';
import React from 'react';

import DailyGraph from './components/DailyGraph';
import AvgReturn from './components/AvgReturn';


const Analysis = () => {

    return(
        <Container fluid  mx="xs" my="md">
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
                            <Text>Average Return</Text>
                            <Space h="md" />
                            <AvgReturn />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Paper shadow="sm" p="md" radius="md">
                            <Text>Total Return</Text>
                            <Space h="md" />
                            <AvgReturn />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Paper shadow="sm" p="md" radius="md">
                            <Text>Strategy-wise P/L</Text>
                            <Space h="md" />
                            <DailyGraph />
                        </Paper>
                    </Grid.Col>
                </Grid>
        </Container>
        
        )
}

export default Analysis;