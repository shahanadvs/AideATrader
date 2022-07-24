import { Text, Paper, Group, Stack, RingProgress } from '@mantine/core';
import { ArrowUpRight } from 'tabler-icons-react';
function TotalReturn() {
  return (
    <Paper shadow="sm" p="md" radius="md">
      <Group position='apart' py="0">
            <Stack>
                <Text color="gray">Total Return</Text>
                <Group spacing="xs">
                <Text  size="xl" weight="500" >₹36,447</Text>
                <Text size="md" color="green">36% <ArrowUpRight size={12} strokeWidth={2} color={'#4cbf40'}/></Text>
                
                </Group>
            </Stack>
            <RingProgress 
    
                size={95}
                thickness={5}
                roundCaps
                sections={[{ value: 75, color: 'green' }]} 
                label={
                    <Text color="green" weight={450} align="center" size="xl">
                      75%
                    </Text>
                  }
            />
      </Group>
    </Paper>
  );
}

export default TotalReturn;