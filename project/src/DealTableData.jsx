import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import * as XLSX from 'xlsx';

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
    const [deal,setDeal]=useState([])
useEffect(() => {
    axios.get(`https://promspetsservice.f-app.ru/deal/table_selection/?dealId=${id}&skip=0&limit=50`,{
}).then(
  function(response){
setDeal(response.data)
  }
);

}, []);
const data = [
  ["ID сделки",id],
  ["Название","Бренд клиента","Имя клиента", "Код клиента"],
  

]
 function exportData(){
  deal.forEach(x=> {
    let array = new Array();
    
  })
let worksheet = XLSX.utils.aoa_to_sheet(data);
let newWorkBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkBook,worksheet,'Test')
 XLSX.writeFile(newWorkBook,`${id}.xlsx`)
}
  return (
<>
    <TableContainer component={Paper}>
            <h2 style={{marginLeft:10}}>Номер сделки в битрикс: {id}</h2>
            <h2 style={{marginLeft:10}}>Кол-во позиций: {deal.length}</h2>
            

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell> <Button variant="outlined" size="small">
          <a style={{textDecoration:'none'}} href='../'>назад</a>
        </Button>
        </TableCell>

            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>

           <TableCell>Бренд клиента</TableCell>
           <TableCell>Имя клиента</TableCell>
           <TableCell>Код клиента</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {deal.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell></TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.brend_client}</TableCell>
              <TableCell>{row.name_client}</TableCell>

              <TableCell>{row.code_client}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{width:"100%",margin:10,justifyContent:'end',display:'flex'}}>  <Button  variant="outlined" onClick={()=>exportData()} size="small">
        Выгрузить таблицу в Excel
        </Button></div>
  
   </>
  );
}