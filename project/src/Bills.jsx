import * as React from 'react';

import { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import url from './url.json'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const axios = require('axios').default;





export  function Bills() {
  const [invoices,setInvoices]=useState([])
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const[numbers,setNumbers] = useState([])
  const handleClose = () => setOpen(false);
  const [name,setName] = useState("")
  const [isOrder,setOrder]=useState(false)
  const [number,setNumber]= useState(1)
  const [date,setDate]=useState(new Date(Date.now()));
  const [tracker_previous,setTracker]=useState("")
  const [excelFile,setExcelFile]= useState("");
  const [isLoading, setLoading] =useState(true);
const token = localStorage.getItem('token')
  const nameChange = (event) => {
      setName(event.target.value);
    };
    const handleChange = (event) => {
      setNumber(event.target.value);
    };
    const numberChange = (event) => {
      setNumber(event.target.value);
    };
    const trackerChange = (event) => {
      setTracker(event.target.value);
    };
const inputStyle={
  marginTop:15,
  marginBottom:15,
  width:'100%'
}

  const style = {
    borderRadius:5,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const options={
    headers:{
      "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
    }
  }
 

  async  function AddBill(){
    const dealId = localStorage.getItem("id")
    await axios.post(`${url.base}/order_client/?dealId=${dealId}&number=${number}`,excelFile,options).then(
       function(response){
         console.log(response)
         if(response.status==200){
           setOpen(false)
         }
       }
     ).catch(function(error){
       alert(error)
     })
   }
   const onChange = (e) => {
    const [file] = e.target.files;
  var data = new FormData();
  data.append("file",file)
  setExcelFile(data)
  };

  
   async function Fetch(){
    const id  = localStorage.getItem("id")

  await  axios.get(`${url.base}/order_client/numbers?dealId=${id}`,options).then(
  function(response){
setNumbers(response.data)
  }
  
);
setLoading(false)
   }
useEffect(() => {
  Fetch()

}, []);


  return (
    <><Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
    
    <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
 <Box sx={style}>
        
        <TextField id="outlined-basic" value={number} onChange={numberChange} label="Номер" style={inputStyle} variant="outlined" />

        <Button variant="contained" style={{fontSize:10}} component="label">
  Загрузить excel
  <input hidden type="file" onChange={onChange}/>
</Button>
          <div style={{display:'flex',justifyContent:'center'}}>
          <Button variant="contained" style={{margin:10}} onClick={()=> AddBill()}>Добавить</Button></div>

       
        
        </Box>

      </Modal>
  
        <div style={{display:'flex',justifyContent:'center',flexDirection:"column",width:300}}>
        <h2>Номер сделки: {localStorage.getItem("id")}</h2>
        <Button variant="outlined" size="small">
          <a style={{textDecoration:'none'}} onClick={handleOpen}>Добавить</a>
        </Button>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Номер</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={number}
          onChange={handleChange}
          label="номер"
        >
                                <MenuItem >ddd</MenuItem>

          {numbers.forEach(x=>{
                      <MenuItem value={x}>{x}</MenuItem>

          })}
          
        </Select>
      </FormControl>
        </div>
        <TableContainer component={Paper}>
         
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Артикул</TableCell>
            <TableCell>Кол-во</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Сумма</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
         
              <TableCell>{row.id}</TableCell>
              
              <TableCell>{row.products.length>0?row.products[0].article:""}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.price}</TableCell>

              <TableCell>{row.amount} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
    </TableContainer>
    <Stack spacing={2}>
      <Pagination count={10} variant="outlined" />
      </Stack>
    </>
  );
}