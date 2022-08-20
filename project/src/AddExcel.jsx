import React from "react";
import * as XLSX from "xlsx";
import { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function AddExcel(){
    const [deals,setDeals]= useState([
        
    ])
    const onChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();
    
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const json = XLSX.utils.sheet_to_json(ws);
          console.log(json)
          setDeals(json)
        };
        reader.readAsBinaryString(file);
      };
      const handleChange = (event) => {
       event.checked=0;
      };
    return(
        <>
        
        <Button variant="contained" style={{fontSize:10,margin:20}} component="label">
  Загрузить excel
  <input hidden type="file" onChange={onChange}/>
</Button>
        
        <TableContainer component={Paper}>
        
                
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
         

            <TableCell>№</TableCell>
            <TableCell>Код товара</TableCell>

           <TableCell>Наименование</TableCell>
           <TableCell>Бренд</TableCell>
           <TableCell>Количество</TableCell>
           <TableCell>Поставки</TableCell>

           <TableCell>Замена Наименование</TableCell>
           <TableCell>Замена Бренд</TableCell>
           <TableCell>Комментарий</TableCell>
           <TableCell>Артикул</TableCell>
           <TableCell>Каталог Наименование</TableCell>
           <TableCell>Каталог Бренд</TableCell>
           <TableCell>Добавить</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
        {deals.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell component="th" scope="row">
                {row['№']}
              </TableCell>
            
              <TableCell>
              <TextField id="standard-basic" variant="standard"   value={row["Код товара"]}/></TableCell>
              <TableCell>
              <TextField id="standard-basic" variant="standard"   value={row["Наименование"]}/></TableCell>
              <TableCell>
              <TextField id="standard-basic" variant="standard"   value={row["Бренд"]}/>
                </TableCell>
              <TableCell>
              <TextField id="standard-basic" variant="standard"   value={row["Количество"]}/></TableCell>
              
              <TableCell><Checkbox checked={row.Поставки} {...label} /></TableCell>
              <TableCell>
              <TextField id="standard-basic" variant="standard"   value={row["Замена Наименование"]}/></TableCell>
              <TableCell>
              <TextField id="standard-basic" variant="standard"   value={row["Замена Бренд"]}/></TableCell>
              <TableCell>
                <TextField id="standard-basic" variant="standard"   value={row["Комментарий"]}/></TableCell>
              <TableCell>
              <TextField id="standard-basic" variant="standard"   value={row["Артикул"]}/></TableCell>
              <TableCell>
              <TextField id="standard-basic" variant="standard"   value={row["Каталог Наименование"]}/></TableCell>
              <TableCell>
              <TextField id="standard-basic"  variant="standard"   value={row["Бренд Наименование"]}/></TableCell>
              <TableCell><Checkbox 
              checked={row.Добавить} 
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }} {...label}  /></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
    <div style={{width:'100%',justifyContent:'end',display:'flex'}}>
    <Button variant="outlined" style={{height:30,margin:15}}  size="small">
        Добавить в базу
        </Button>
    </div>
  
    </>
     
    );
}