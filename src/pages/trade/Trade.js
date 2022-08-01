import {  Table, Tag } from 'antd';
import { Plus } from 'tabler-icons-react';
import React, {useContext,useEffect, useState} from 'react';
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
import { DatePicker } from '@mantine/dates';
import SearchBar from './components/SearchBar';
import {db} from '../../firebase';
import { collection, query, limit, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";


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
    ₹{(record.sell-record.buy)*record.quantity}
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
    dataIndex: 'learning',
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
    render: (text, record, index) =>{
        return (
          text.map((item)=>{
            return <Text>{item}</Text>
          }

          )
        )
    }

    },
    
  
  
  
];

 

const Trade = () => {


  const [opened, setOpened] = useState(false);
  const [data, setData] = useState(['React', 'Angular', 'Svelte', 'Vue']);
  const theme = useMantineTheme();
  const [date, setDate] = useState();
  const [symbol, setSymbol] = useState('');
  const [buy, setBuy] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sell, setSell] = useState(''); 
  const [charge, setCharge] = useState('');
  const [strategy, setStrategy] = useState('');
  const [learning, setLearning] = useState([]);

  const {currentUser} = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const da =[];

 const getData = async () =>{
    const q = query(collection(db, currentUser.uid), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
      da.push(doc.data())
    })
    setDatas(da);
  }

  useEffect(() => {
   

    return () => {
      getData();
    }
  },[])

    
  const handleTradeEntry = async (e)=>{
    e.preventDefault();
    const created = Timestamp.now()
    const status = ((sell*quantity) - (buy*quantity) - charge) >0 ? 'WIN' : 'LOSS';
    setOpened(!opened);
    try{
        await addDoc(collection(db, currentUser.uid), {date,
            symbol,
            buy,
            quantity,
            sell,
            charge,
            strategy,
            learning,
            status,
            created,

        });
        
    } catch (err){
        console.log(err)
    }
    
    
}


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
        <form >
            <Group >
                <DatePicker
                        style={{width:'190px'}}
                        my="xs"
                        placeholder="Date"
                        label="Trade date"
                        
                        
                        onChange={(e)=> {
                            const d = `${e.getDate()}/${ e.getMonth() + 1}/${e.getFullYear()}`;
                            setDate(d);
                        }}
                        required
                />
                <TextInput
                style={{width:'190px'}}
                my="xs"
                label="Symbol"
                placeholder="Enter Symbol"
                onChange={(e)=>setSymbol(e.target.value)}
                required
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
                onChange={(e)=>setBuy(e)}
                required
            />
             <NumberInput
                style={{width:'190px'}}
                my="xs"
                label="Quntity"
                min="1"
                defaultValue={1}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={(e)=>setQuantity(e)}
                required
                
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
                onChange={(e)=>setSell(e)}
                required
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
                onChange={(e)=>setCharge(e)}
                required
            />
            </Group>
            <Select
               
                my="xs"
                label="Trading Strategy or Method"
                clearable
                allowDeselect 
                data={data}
                placeholder="Select items"
                nothingFound="Nothing found"
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => setData((current) => [...current, query])}
                onChange={(e)=>setStrategy(e)}
                
            />
            <MultiSelect
                my="xs"
                label="Learnings or Mistakes"
                data={data}
                placeholder="Select items"
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => setData((current) => [...current, query])}
                onChange={ (e)=>{
                    const l = e;
                    setLearning(l)
                    
                }}
                
            />
            <Group position='right'>
                <Button my="sm" onClick={handleTradeEntry} >Add </Button>
            </Group>

        </form>
        
  
  
  
      </Modal>
            <Container fluid={true} mx="xs" my="md">
                <Paper shadow="sm" p="md" radius="md">
                    <Group position="apart" mb="md">
                        <Button onClick={() => setOpened(true) }>Add New<Space w="md"/> <Plus size={24}/></Button>
                        <SearchBar/>
                    </Group>
                    <Table columns={columns} dataSource={datas}  scroll={{x: 1700,}}/>

                </Paper>
            </Container>
        </>
    )


};

export default Trade;