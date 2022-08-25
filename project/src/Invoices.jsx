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

const axios = require('axios').default;





export  function Invoices() {
  const [invoices,setInvoices]=useState([])
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name,setName] = useState("")
  const [number,setNumber]= useState()
  const [date,setDate]=useState(new Date(Date.now()));
  const [tracker_previous,setTracker]=useState("")
  const [isLoading, setLoading] =useState(true);

  const nameChange = (event) => {
      setName(event.target.value);
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
 
  async  function AddInvoice(){
    await axios.post(`https://promspetsservice.f-app.ru/invoice/create_oun`,{
       name: name,
       number: number,
       date: `${date.getUTCMonth()}-${date.get()}-${date.getFullYear()}`,
       tracker_previous: tracker_previous
     },options).then(
       function(response){
         console.log(response)
         if(response.status==200){
           setOpen(false)
         }
       }
     ).catch(function(error){
       alert(error)
     })
     window.location.href="./invoices"
   }
   async function Fetch(){

  await  axios.post('https://promspetsservice.f-app.ru/invoice/get_all',{
},options).then(
  function(response){
setInvoices(response.data)
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
        
        <TextField id="outlined-basic" onChange={nameChange} value={name} label="Наименование" style={inputStyle} variant="outlined" />
        <TextField id="outlined-basic" value={number} onChange={numberChange} label="Номер" style={inputStyle} variant="outlined" />
        <TextField id="outlined-basic" value={tracker_previous} onChange={trackerChange} label="Трекер" style={inputStyle} variant="outlined" />
        <LocalizationProvider dateAdapter={AdapterDateFns}>

        <DatePicker
        
        label="Дата"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />            </LocalizationProvider>

          <div style={{display:'flex',justifyContent:'center'}}>
          <Button variant="contained" style={{margin:10}} onClick={()=> AddInvoice()}>Добавить</Button></div>

       
        
        </Box>

      </Modal>
  
        
        <TableContainer component={Paper}>
        <Button variant="outlined" size="small">
          <a style={{textDecoration:'none'}} onClick={handleOpen}>Добавить счёт</a>
        </Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Номер</TableCell>
            <TableCell>Предыдущий трекер</TableCell>
            <TableCell>Дата</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
         
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.number}</TableCell>
              <TableCell>{row.tracker_previous}</TableCell>
              <TableCell>{row.date}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}