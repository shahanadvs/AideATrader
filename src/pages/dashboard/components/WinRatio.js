import { Text, Paper, Group, Stack, RingProgress } from '@mantine/core';
import { ArrowUpRight } from 'tabler-icons-react';
function WinRatio() {
  return (
    <Paper shadow="sm" p="md" radius="md">
      <Group position='left' py="xs">
            <Stack>
                <Text color="gray">Win Ratio</Text>
                <Group spacing="xs">
                <Text  size="xl" weight="500" >75%</Text>
                <Text size="md" color="green">11% <ArrowUpRight size={12} strokeWidth={2} color={'#4cbf40'}/></Text>
                
                </Group>
            </Stack>
            <RingProgress 
    
                size={80}
                thickness={5}
                roundCaps
                my="-2px"
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

export default WinRatio;