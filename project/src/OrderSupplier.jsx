import { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import url from './url.json'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TablePagination } from '@mui/material';
const axios = require('axios').default;


export function OrderSupplier() {
  const id = localStorage.getItem('id')
  const [isOpen,setOpen]=useState(false)
  const [deals,setDeals]=useState([{id:1}])
  const [isLoading, setLoading] =useState(true);
  const [number,setNumber]=useState(0)
  const [deal,setDeal]=useState([])
  const [numbers,setNumbers]=useState([])
  const [count,setCount]=useState(0)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChange = (event) => {
    setNumber(event.target.value);
  };
  const options={
    headers:{
      "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
    }
  }
  useEffect(()=>{
    Fetch()
  },[rowsPerPage,page])
  async function Fetch(){
    setLoading(true)
    const dealId= localStorage.getItem('id')
  await  axios.get(`${url.base}/order_supplier/?dealId=${dealId}&skip=${page*rowsPerPage}&limit=${rowsPerPage}`,options).then(
      function(response){
    setDeals(response.data.results)
    console.log(response.data)
    setCount(response.data.count)
      }
      
    );
  
    setLoading(false)
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
  const inputStyle={
    marginTop:15,
    marginBottom:15,
    width:'100%'
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
    key="dddawdwadwad"
        open={isOpen}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
 <Box sx={style}>
        
       

       
        
        </Box>

      </Modal>
<div style={{display:'flex',justifyContent:'center',flexDirection:"column",width:300}}>
        <h2>Номер сделки: {localStorage.getItem("id")}</h2>
        <Button variant="outlined" size="small">
          <a style={{textDecoration:'none'}} onClick={()=>setOpen(true)}>Добавить</a>
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
            <TableCell>Номер</TableCell>
            


          </TableRow>
        </TableHead>
        <TableBody>
          {deals.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
            <TableCell>
              {row.number}
            </TableCell>
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