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
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import axios from "axios";
import _ from 'underscore'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Partner(){
    const [deals,setDeals]= useState([])
    const colors = ["#9D8DF1","#95F2D9","#6383ea","#3c979e"]
  const [isLoading,setLoading]= useState(true)
    const [id,setId] = useState(0)
    const [supplyCount, setCount] =useState(0);
    const options = {
      headers:{
        "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
      }
    }
    async function Fetch(){
      const id  = localStorage.getItem("id")
      setId(id)
      await axios.get(
        `https://promspetsservice.f-app.ru/supplier_rows/get/?dealId=${id}`,
        options
      ).then(function(response){
        setDeals(response.data)
        let count = Math.max(...response.data.map(x=>x.supplier_rows.length))
        console.log(count)
        setCount(count)

      })
     
      setLoading(false)
    }
  
    useEffect(()=>{

      Fetch()
    },[]);
    const onChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();

      
      };
    
    return(
        <>
        <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
        <h2>Поставщики сделки №{id}</h2>
        <Button variant="contained" style={{fontSize:10,margin:20}} component="label">
  Загрузить excel
  <input hidden type="file" onChange={onChange}/>
</Button>
        
        <TableContainer component={Paper}>
        
                
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
         

            <TableCell>ID</TableCell>
            <TableCell>Артикул</TableCell>

           <TableCell>Наименование</TableCell>
           <TableCell>Бренд</TableCell>
           <TableCell>Количество</TableCell>
            {
              _.times(supplyCount,function(e){

                
                return( 
                  <React.Fragment >

                <TableCell  style={{backgroundColor:colors[e]}}>Поставщик {e+1}</TableCell>
                <TableCell  style={{backgroundColor:colors[e]}}>Битрикс ID</TableCell>

                <TableCell style={{backgroundColor:colors[e]}}>Цена</TableCell>
                <TableCell style={{backgroundColor:colors[e]}}>Учавствует в расчёте</TableCell>
                <TableCell style={{backgroundColor:colors[e]}}>Кол-во</TableCell>
                <TableCell style={{backgroundColor:colors[e]}}>Срок поставки</TableCell>

                </React.Fragment>
                );
              })
              
            }
        


          </TableRow>
        </TableHead>
        <TableBody>
        {deals.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.id}</TableCell>
              <TableCell>{row.products.length > 0 ? row.products[0].article:""}</TableCell>
              <TableCell>{row.products.length>0?row.products[0].name:""}</TableCell>
              <TableCell>{row.products[0]?.brands.length>0?row.products[0]?.brands[0].title:""}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              {
                row.supplier_rows.map((supply,index)=>(
                  <React.Fragment>
                    <TableCell  style={{backgroundColor:colors[index]}}>
                      {supply.suppliers[0]?.id}
                    </TableCell>
                    <TableCell  style={{backgroundColor:colors[index]}}>
                      {supply.suppliers[0]?.b24_company_id}
                    </TableCell>
                    <TableCell  style={{backgroundColor:colors[index]}}>
                      {supply.total_price.toFixed(2)}$
                    </TableCell>
                    <TableCell style={{backgroundColor:colors[index]}}>
                    {        <FormControlLabel control={<Checkbox   checked={supply.calculation} />} label="Поставляем" style={{margin:10}} />
}

                    </TableCell>
                    <TableCell style={{backgroundColor:colors[index]}}>
                    {supply.quentity_calculation}

                    </TableCell>
                    <TableCell style={{backgroundColor:colors[index]}}>
                      {supply.delivery_date} дней
                    </TableCell>
                  </React.Fragment>

                ))
              }
            </TableRow>
            
          ))}
        </TableBody>
      </Table>

    </TableContainer>

  
    </>
     
    );
    
}