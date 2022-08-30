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
const axios = require('axios').default;


export function OrderSupplier() {
  const [deals,setDeals]=useState([{id:1}])
  const [isLoading, setLoading] =useState(true);
  const [number,setNumber]=useState(0)
  const [deal,setDeal]=useState([])
  const options={
    headers:{
      "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
    }
  }
  async function Fetch(){
    const dealId= localStorage.getItem('id')
  await  axios.get(`${url.base}/order_supplier/?dealId=${dealId}&skip=0&limit=100`,options).then(
      function(response){
    setDeals(response.data.results)
    console.log(response.data)
      }
      
    );
    setLoading(false)
  }
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
  <div style={{display:"flex",flexDirection:"row",gap:20,width:200}}>
  <TextField id="outlined-basic" value={number} onChange={(e)=>setNumber(e.target.value)} label="Битрикс ID" style={inputStyle} variant="outlined" />

  <Button variant="text" href={`/deals/${number}`}>Перейти</Button>
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
    <Stack spacing={2}>
      <Pagination count={10} variant="outlined" />
      </Stack>
    </>
  );
}