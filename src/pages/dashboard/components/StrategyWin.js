import { Card, Image, Text, Group, Progress, Space } from '@mantine/core';

function StrategyWin() {
  return (
    <Card
      shadow="sm"
      p="xl"
      radius="md"
    
      
    >

      <Text weight={500} size="lg" mb="lg">
        Strategy Winrate
      </Text>

      <Group position="apart">
      <Text size="md" >
       Supply & Demand Method
      </Text>
      <Text size="sm"  color="gray">
       7/10
      </Text>
      </Group>
      <Progress my="xs" value={70} />
      <Space h="xs"/>

      <Group position="apart">
      <Text size="md" >
       Breakout Strategy
      </Text> 
      <Text size="sm"  color="gray">
       4/15
      </Text>
      </Group>
      <Progress my="xs" value={25} />
      <Space h="xs"/>
       

      <Group position="apart">
      <Text size="md" >
       News-based Trading
      </Text>
      <Text size="sm"  color="gray">
       2/20
      </Text>
      </Group>
      <Progress my="xs" value={5} />
      <Space h="xs"/>


      <Group position="apart">
      <Text size="md" >
       Support & Resistance
      </Text>
      <Text size="sm"  color="gray">
       5/10
      </Text>
      </Group>
      <Progress my="xs" value={50} />
      <Space h="xs"/>


      <Group position="apart">
      <Text size="md" >
       Price Action Trading
      </Text>
      <Text size="sm"  color="gray">
       9/12
      </Text>
      </Group>
      <Progress my="xs" value={75} />
      <Space h="xs"/>

    </Card>
  );
}

export default StrategyWin;