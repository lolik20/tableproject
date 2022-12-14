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
import { TablePagination } from '@mui/material';

const axios = require('axios').default;





export  function Bills() {
  const [invoices,setInvoices]=useState([])
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [numbers,setNumbers] = useState([])
  const handleClose = () => setOpen(false);
  const [name,setName] = useState("")
  const [isOrder,setOrder]=useState(false)
  const [number,setNumber]= useState(1)
  const [date,setDate]=useState(new Date(Date.now()));
  const [tracker_previous,setTracker]=useState("")
  const [excelFile,setExcelFile]= useState("");
  const [isLoading, setLoading] =useState(true);
  const [count,setCount] = useState(0)
const token = localStorage.getItem('token')
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};
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
 
useEffect(()=>{
Fetch()
},[page,rowsPerPage])
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

  useEffect(()=>{

    getRows()
  },[number])
   async function getRows(){
    const id  = localStorage.getItem("id")

    await  axios.get(`${url.base}/order_client/?number=${number}&dealId=${id}`,options).then(
    function(response){
  setInvoices(response.data.results)
    })
   }
   async function Fetch(){
    const id  = localStorage.getItem("id")

  await  axios.get(`${url.base}/order_client/numbers?dealId=${id}&skip=${page*rowsPerPage}&limit=${rowsPerPage}`,options).then(
  function(response){
setNumbers(response.data)
setCount(response.data.count)
  }

  
);

setLoading(false)
   }

  useEffect(() => {
  }, [numbers]);
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
    key="dddawdwadwad"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
 <Box sx={style}>
        <TextField id="outlined-basic" value={number} onChange={numberChange} label="??????????" style={inputStyle} variant="outlined" />

        <Button variant="contained" style={{fontSize:10}} component="label">
  ?????????????????? excel
  <input hidden type="file" onChange={onChange}/>
</Button>
          <Button variant="contained" style={{margin:10}} onClick={()=> AddBill()}>????????????????</Button>

       
        
        </Box>

      </Modal>
  
        <div style={{display:'flex',justifyContent:'center',flexDirection:"column",width:300}}>
        <h2>?????????? ????????????: {localStorage.getItem("id")}</h2>
        <Button variant="outlined" size="small">
          <a style={{textDecoration:'none'}} onClick={handleOpen}>????????????????</a>
        </Button>
      
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">??????????</InputLabel>

        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={number}
          onChange={handleChange}
          label="??????????"
        >
{numbers.map((x,i)=>{
return(
  <MenuItem key={i} value={x}>{x}</MenuItem>
)
})}      
        </Select>
      </FormControl>
        </div>
        <TableContainer component={Paper}>
         
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>??????????????</TableCell>
            <TableCell>??????-????</TableCell>
            <TableCell>????????</TableCell>
            <TableCell>??????????</TableCell>

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
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </>
  );
}