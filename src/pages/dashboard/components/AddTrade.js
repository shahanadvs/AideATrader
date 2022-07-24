import { 
    Affix, 
    Avatar, 
    Button,  
    Modal, 
    useMantineTheme, 
    Group, 
    TextInput,
    NumberInput, 
    Select,  
    MultiSelect, 
} from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';


function AddTrade() {
    const [opened, setOpened] = useState(false);
    const [data, setData] = useState(['React', 'Angular', 'Svelte', 'Vue']);
    const theme = useMantineTheme();
    const [date, setDate] = useState(new Date());
    const [symbol, setSymbol] = useState('');
    const [buy, setBuy] = useState('');
    const [quantity, setQuantity] = useState('');
    const [sell, setSell] = useState(''); 
    const [charge, setCharge] = useState('');
    const [strategy, setStrategy] = useState('');
    const [learning, setLearning] = useState([]);
    const [tradeData, setTradeData] = useState({date: '',
        symbol: '',
        buy: '',
        quantity: '',
        sell: '',
        charge: '',
        strategy: '',
        learning: '',})

    const handleTradeEntry=(e)=>{
        e.preventDefault();
        setTradeData({
            date : date,
            symbol : symbol,
            buy : buy,
            quantity : quantity,
            sell: sell,
            charge: charge,
            strategy: strategy,
            learning: learning,
        })
        console.log(tradeData)
        clearTradeEntry()
    }

    const clearTradeEntry=()=>{
        
        setDate('')
        setSymbol('')
        setCharge(1)
        setBuy(0)
        setQuantity(1)
        setSell(0)
        setStrategy('')
        setLearning([])
    }
  
    return (
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
                        inputFormat="DD/MM/YYYY"
                        labelFormat="MM/YYYY"
                        defaultValue={new Date()}
                        onChange={(e)=>setDate(e.target.value)}
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
                onChange={(e)=>setLearning(e)}
                
            />
            <Group position='right'>
                {/* <Button my="sm" variant="outline" onClick={clearTradeEntry}>clear </Button> */}
                <Button my="sm" onClick={handleTradeEntry} >Add </Button>
            </Group>

        </form>
        
  
  
  
      </Modal>
      <Affix position={{ bottom: 45, right: 45 }}>

            <Avatar size="lg" radius="xl" color='blue' >
                <Button  size="xl" onClick={() => setOpened(true) }>
                <Plus size={40} color="white" />
                </Button>
            </Avatar>
        </Affix>
      
      </>
    );
  }




export default AddTrade;

