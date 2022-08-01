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
import { useContext } from 'react';
import { Plus } from 'tabler-icons-react';
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import {db} from '../../../firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { AuthContext } from "../../../context/AuthContext";


function AddTrade({handleUpdate}) {

    const {currentUser} = useContext(AuthContext);

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
        
       handleUpdate();
        
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

