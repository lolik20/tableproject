import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const axios = require('axios').default;

export function DealTableData() {
    const { id } = useParams()

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
  
    axios.post(`https://promspetsservice.f-app.ru/front/get_table_selection/?dealId=${id}`,{


}).then(
  function(response){
setDeal(response.data[0])
console.log(response.data[0])
  }
  
);

}, []);


  return (

    <TableContainer component={Paper}>
            <h2>Номер сделки в битрикс: {id}</h2>
            <h2>Название сделки: {deal.title}</h2>
            <h2>Кол-во позиций: {deal.client_rows.length}</h2>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell> <Button variant="outlined" size="small">
          <a href='../'>назад</a>
        </Button>
        </TableCell>

            <TableCell>ID</TableCell>
           <TableCell>Бренд</TableCell>
           <TableCell>Код</TableCell>
           <TableCell>Имя</TableCell>
           <TableCell>Кол-во</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {deal.client_rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell></TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.brend_client}</TableCell>
              <TableCell>{row.code_client}</TableCell>
              <TableCell>{row.name_client}</TableCell>
              <TableCell>{row.quantity}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
  );
}