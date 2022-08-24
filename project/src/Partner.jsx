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
import FormControlLabel from '@mui/material/FormControlLabel';

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
    function minimalPrice(){
      
    }
    useEffect(()=>{

      Fetch()
    },[]);
    const onChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();

      
      };
      function checkAll(index,event){
        let some_array = [...deals];
        some_array.forEach((x)=>{
          if(x.supplier_rows.length>0){
            x.supplier_rows[index].calculation=event.target.checked;

          }

          
          
        })  
        
        setDeals(some_array)
      }
    function check(dealIndex,supplyIndex,event){
      let some_array = [...deals];
    some_array[dealIndex].supplier_rows[supplyIndex].calculation=event.target.checked
    setDeals(some_array)
    console.log(event.target.checked)

    }
    return(
        <>
        <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
        <h2>Поставщики сделки №{id}</h2>
        <div style={{display:"flex",justifyContent:'start',gap:10,flexDirection:'column',width:270}}>
        <Button variant="contained" style={{fontSize:10}} component="label">
  Загрузить excel
  <input hidden type="file" onChange={onChange}/>
</Button>
<Button variant="contained" style={{fontSize:10}} component="label">
  Подобрать минимальную стоимость
  <input hidden type="file" />
</Button>
        </div>
        
        
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
                  <React.Fragment key={"head_"+e}>

                <TableCell  style={{backgroundColor:colors[e]}}>Поставщик {e+1}</TableCell>
                <TableCell  style={{backgroundColor:colors[e]}}>Битрикс ID</TableCell>

                <TableCell style={{backgroundColor:colors[e]}}>Цена</TableCell>
                <TableCell style={{backgroundColor:colors[e]}}>
                <FormControlLabel label="Учавствует в расчёте"  onChange={(event)=>checkAll(e,event)} control={<Checkbox   color="default" />}style={{margin:10}} />
                </TableCell>
                <TableCell style={{backgroundColor:colors[e]}}>Кол-во</TableCell>
                <TableCell style={{backgroundColor:colors[e]}}>Срок поставки</TableCell>
                <TableCell style={{backgroundColor:colors[e]}}>
                <FormControlLabel label="Блокировать"  control={<Checkbox  color="default" />}style={{margin:10}} />
                </TableCell>
                </React.Fragment>
                );
              })
              
            }
        


          </TableRow>
        </TableHead>
        <TableBody>
        {deals.map((row,dealIndex) => (
            <TableRow
              key={"deal_"+dealIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.id}</TableCell>
              <TableCell>{row.products.length > 0 ? row.products[0].article:""}</TableCell>
              <TableCell>{row.products.length>0?row.products[0].name:""}</TableCell>
              <TableCell>{row.products[0]?.brands.length>0?row.products[0]?.brands[0].title:""}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              {
                row.supplier_rows.map((supply,index)=>(
                  <React.Fragment key={"supply_"+index}>
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
                    {        <FormControlLabel control={<Checkbox  color="default" onChange={(event)=>check(dealIndex,index,event)}  checked={deals[dealIndex].supplier_rows[index].calculation} />}style={{margin:10}} />
}

                    </TableCell>
                    <TableCell style={{backgroundColor:colors[index]}}>
                    {supply.quentity_calculation}

                    </TableCell>
                    <TableCell style={{backgroundColor:colors[index]}}>
                      {supply.delivery_date} дней
                    </TableCell>
                    <TableCell  style={{backgroundColor:colors[index]}}>
                      
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