import {  Table, Tag } from 'antd';
import { Plus } from 'tabler-icons-react';
import React from 'react';
import { 
    Button, 
    Modal, 
    useMantineTheme, 
    Group, 
    TextInput,
    NumberInput, 
    Select,  
    MultiSelect, 
    Paper,
    Container,
    Space,
    Text,
} from '@mantine/core';
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import SearchBar from './components/SearchBar';



const columns = [
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        fixed: 'left',
        width: 100,
        
        sorter: (a, b) =>  a.status.localeCompare(b.status),
        render: (status) => 
         
                <Tag color={status==="WIN" ? 'green' : 'red'}>
                  {status}
                </Tag>      
            
    },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
    width: 150,
   
    sorter: (a, b) =>  a.symbol.localeCompare(b.symbol),
  },
  {
    title: 'Buy Price',
    dataIndex: 'buy',
    key: 'buy',
    width: 150,
   
    sorter: (a, b) => a.buy - b.buy,
    render:(text)=><Text>₹{text}</Text>
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    
    sorter: (a, b) => a.quanitity - b.quanitity,
  },
  {
    title: 'Buy Value',
    dataIndex: 'buyvalue',
    key: 'buyvalue',
    width: 150,
    
    sorter: (a, b) => a.buyvalue - b.buyvalue,
    render:(text,record,index)=><Text>₹{record.quantity*record.buy}</Text>
  },
  {
    title: 'Sell Price',
    dataIndex: 'sell',
    key: 'sell',
    
    sorter: (a, b) => a.sell - b.sell,
    render:(text)=><Text>₹{text}</Text>
  },
  {
    title: 'Sell Value',
    dataIndex: 'sellvalue',
    key: 'sellvalue',
    
    sorter: (a, b) => a.sellvalue - b.sellvalue,
    render:(text,record,index)=><Text>₹{record.quantity*record.sell}</Text>
  },
  {
    title: 'Charges',
    dataIndex: 'charge',
    key: 'charge',
   
    sorter: (a, b) => a.charge - b.charge,
    render:(text)=><Text>₹{text}</Text>
  },
  {
    title: 'Profit/Loss',
    dataIndex: 'gain',
    key: 'gain',
    
    sorter: (a, b) => a.gain - b.gain,
    render :(text, record, index)=>
    <Text color={record.status==="WIN" ? "green" : "red"}>
    ₹{record.sellvalue-record.buyvalue}
  </Text>  
    

  },
  {
    title: 'Strategy/Method',
    dataIndex: 'strategy',
    key: 'strategy',
    width: 170,
    filters: [
        {
          text: 'Learning',
          value: 'Learning',
        },
        {
          text: 'Mistake',
          value: 'Mistake',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Learnigs/Mistakes',
    dataIndex: 'learnings',
    key: 'learnings',
    width: 170,
    filters: [
        {
          text: 'Learning',
          value: 'Learning',
        },
        {
          text: 'Mistake',
          value: 'Mistake',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  
  
];
const data = [
  {
    key: '1',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425', 
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '2',
    status: 'LOSS',
    date: '13/07/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '3',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '4',
    status: 'LOSS',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '5',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '6',
    status: 'LOSS',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '7',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '8',
    status: 'LOSS',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '9',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '10',
    status: 'LOSS',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '11',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
  {
    key: '12',
    status: 'LOSS',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '3400',
    quantity: '100',
    buyvalue: '240000',
    sell: '425',
    sellvalue: '42500',
    charge: '200',
    gain: '₹3000',
    strategy: 'Supply & Demand',
    learnings: 'learning1',
  },
];

const Trade = () => {
    const [opened, setOpened] = useState(false);
    const [datas, setDatas] = useState(['React', 'Angular', 'Svelte', 'Vue']);
    const theme = useMantineTheme();
    return(
        <>
        <Modal
        size="md"
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        
        title="Add Your Trade."
      >
        <form>
            <Group >
                <DatePicker
                        style={{width:'190px'}}
                        my="xs"
                        placeholder="Date"
                        label="Trade date"
                        inputFormat="DD/MM/YYYY"
                        labelFormat="MM/YYYY"
                        defaultValue={new Date()}
                />
                <TextInput
                style={{width:'190px'}}
                my="xs"
                label="Symbol"
                placeholder="Enter Symbol"
                />
            </Group>
            <Group>
            <NumberInput
                style={{width:'190px'}}
                my="xs"
                label="Buy Price"
                defaultValue={0}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                    ? `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '₹ '
                }
            />
             <NumberInput
                style={{width:'190px'}}
                my="xs"
                label="Quntity"
                min="1"
                defaultValue={1}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                
            />
            </Group>
            <Group>
            <NumberInput
                style={{width:'190px'}}
                my="xs"
                label="Sell Price"
                defaultValue={0}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                    ? `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '₹ '
                }
            />
             <NumberInput
                style={{width:'190px'}}
                my="xs"
                label="Charges"
                defaultValue={0}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                    ? `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '₹ '
                }
            />
            </Group>
            <Select
               
                my="xs"
                label="Trading Strategy or Method"
                clearable
                allowDeselect 
                data={datas}
                placeholder="Select items"
                nothingFound="Nothing found"
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => setDatas((current) => [...current, query])}
            />
            <MultiSelect
                my="xs"
                label="Learnings or Mistakes"
                data={datas}
                placeholder="Select items"
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => setDatas((current) => [...current, query])}
            />
            <Group position='right'>
                <Button my="sm" variant="outline" >clear </Button>
                <Button my="sm" >Add </Button>
            </Group>

        </form>
        
  
  
  
      </Modal>
            <Container fluid={true} mx="xs" my="md">
                <Paper shadow="sm" p="md" radius="md">
                    <Group position="apart" mb="md">
                        <Button onClick={() => setOpened(true) }>Add New<Space w="md"/> <Plus size={24}/></Button>
                        <SearchBar/>
                    </Group>
                    <Table columns={columns} dataSource={data}  scroll={{x: 1700,}}/>

                </Paper>
            </Container>
        </>
    )


};

export default Trade;