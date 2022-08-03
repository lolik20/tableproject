import { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const axios = require('axios').default;





export function TableData() {
  const [deals,setDeals]=useState([{id:1}])

  const [deal,setDeal]=useState({
    id:1,
    b24_deal_id:122,
    festC_deal_id:1,
    title:"title",
    stage_id:1,
    prrp:"",
    wamargin:"",
    client_rows:[
      {
        title:"11",
        brend_client:"",
        code_client:"",
        article_client:"",
        name_client:"",
        quantity:10,
        price:1,
        amount:2,
        delivery_date:1,
        id:1,
        b24_productrows_id:1,
        festC_productrows_id:1,
        created_date:"2022-07-28T18:10:29.463080"
      }
    ]
  })
useEffect(() => {
  
    axios.post('https://promspetsservice.f-app.ru/deal/get__all',{


}).then(
  function(response){
setDeals(response.data)
console.log(response.data[0])
  }
  
);

}, []);


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>B24 ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Клиент</TableCell>
            <TableCell></TableCell>


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
              <TableCell>{row.b24_deal_id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.client}</TableCell>
              <TableCell><Button variant="text" href={`/deals/${row.b24_deal_id}`}>Подробнее</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}