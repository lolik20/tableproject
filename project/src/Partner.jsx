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
import _, { min, some } from 'underscore'
import FormControlLabel from '@mui/material/FormControlLabel';
import url from './url.json'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Partner(){
    const [deals,setDeals]= useState([])
    const colors = ["#9D8DF1","#95F2D9","#6383ea","#3c979e"]
  const [isLoading,setLoading]= useState(true)
    const [id,setId] = useState(0)
    const [course,setCourse]=useState({})
    const [blocks,setBlocks]=useState([
      {isBlock:false},
      {isBlock:false},
      {isBlock:false},
      {isBlock:false},
      {isBlock:false},
      {isBlock:false},
      {isBlock:false},
      {isBlock:false},
      {isBlock:false},
      {isBlock:false},
      {isBlock:false},
      {isBlock:false},
      {isBlock:false}])
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
        `${url.base}/supplier_rows/get/?dealId=${id}`,
        options
      ).then(function(response){
        
      
        let count = Math.max(...response.data.map(x=>x.supplier_rows.length))
        console.log(count)
        setCount(count)
        let arr =[];

        for(let i = 0; i<count;i++){
         arr.push({
            id:i,
            isBlock:false
          })
        }
        setBlocks(arr)
        setDeals(response.data)

      })
     
      setLoading(false)
    }
    function minimalPrice(){
      let some_array = [...deals];
      let filtered = []
      let checks = [

      ]
        some_array.filter(x=>x.products.length>0).forEach((x,dealIndex)=>{
          const supplies =[]
          blocks.filter(bl=>bl.isBlock==false).forEach((blockObj)=>{
            
           supplies.push(x.supplier_rows[blockObj.id])
          })
          const minPrice= Math.min(...supplies.map(f=>f.total_price))
            filtered.push(supplies.find(p=>p.total_price==minPrice) )
          let supplyIndex = x.supplier_rows.findIndex(obj=>obj.total_price==minPrice)
          checks.push({
            dealIndex:dealIndex,
            supplyIndex:supplyIndex
          })
        })
      setChecks(some_array,checks)
      }
      function setChecks(arr,indexArray){
        arr.forEach((x)=>{
          x.supplier_rows.forEach((t)=>{
            t.calculation=false;
          })
        })
        indexArray.forEach((x)=>
        {
          arr[x.dealIndex].supplier_rows[x.supplyIndex].calculation=true
        })
       
        setDeals(arr)
      }
   async function dealRequest(){
    await axios.get(`${url.base}/selectProvider`,options)
      .then(function(response){
        alert(response)
      })
   }
   async function proccessing(){
    await axios.get(`${url.base}/processingCustomerAnswer`,options)
      .then(function(response){
        alert(response)
      })
   }
   async function getCourse(){
      await axios.get(`${url.base}/front/get_course/`,options)
      .then(function(response){
        setCourse(response.data)
      })
    }
    useEffect(()=>{
getCourse()
      Fetch()
    },[]);
    const onChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();

      
      };
      function checkAll(index,event){
        setLoading(true)
        let some_array = [...deals];
        some_array.forEach((x)=>{
          if(x.supplier_rows.length>0){
            x.supplier_rows[index].calculation=event.target.checked;

          }

          
          
        })  
        
        setDeals(some_array)
        setLoading(false)
      }
      function block(index,event){
        let some_array = [...blocks]
        some_array[index].isBlock=event.target.checked
        setBlocks(some_array)
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
  <div style={{display:'flex',justifyContent:'space-between'}}>
  <div style={{display:"flex",justifyContent:'start',gap:10,flexDirection:'column',width:270}}>
        <h2>Поставщики сделки №{id}</h2>

        <Button variant="contained" style={{fontSize:10}} component="label">
  Загрузить excel
  <input hidden type="file" onChange={onChange}/>
</Button>
<Button variant="contained" style={{fontSize:10}} onClick={()=>minimalPrice()} component="label">
  Подобрать минимальную стоимость

</Button>
        </div>
  <div style={{display:"flex",flexDirection:"column",alignContent:'end',justifyContent:'end',height:'100%',padding:0,gap:10}}>
   <span>$ {course?.USD? course.USD.toFixed(2):""}₽</span>
        <span>€ {course?.EUR? course.EUR.toFixed(2):""}₽</span>
        <Button variant="contained" onClick={()=>dealRequest()} style={{fontSize:10}} component="label">
  Запросить
</Button>
<Button variant="contained" style={{fontSize:10}} onClick={()=>proccessing()} component="label">
Обработать ответы
</Button>
      </div>
        
        </div>
        
        <TableContainer component={Paper}>
        
                
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow style={{padding:3}}>
            <TableCell  style={{padding:3}}>
            </TableCell>
            <TableCell  style={{padding:3}}>
              </TableCell>
              <TableCell style={{padding:3}}>
              </TableCell>
              <TableCell style={{padding:3}}>
              </TableCell>
              <TableCell style={{padding:3}}>
              </TableCell>
     
              {
              _.times(supplyCount,function(e){

                
                return( 
                  <React.Fragment key={"head_"+e}>
                    <TableCell  style={{padding:5,borderLeft:"1px solid #D2CECD"}}>Поставщик №{e+1}</TableCell>
                    <TableCell style={{padding:5}}></TableCell>

                    <TableCell style={{padding:5}}></TableCell>

                    <TableCell style={{padding:5}} >
                <FormControlLabel label="Блокировать" onChange={(event)=>block(e,event)} checked={blocks[e].isBlock} control={<Checkbox  color="default" />}style={{margin:10,fontSize:10}} />
                </TableCell>
                    </React.Fragment>)
                  })
                }
                  
          </TableRow>
          <TableRow  style={{padding:5}}>
         

            <TableCell style={{padding:5}}>ID</TableCell>
            <TableCell style={{padding:5}}>Артикул</TableCell>

           <TableCell style={{padding:5}}>Наименование</TableCell>
           <TableCell style={{padding:5}}>Бренд</TableCell>
           <TableCell style={{padding:5}}>Колво</TableCell>
            {
              _.times(supplyCount,function(e){

                
                return( 
                  <React.Fragment key={"head_"+e}>


                <TableCell  style={{padding:5,borderLeft:"1px solid #D2CECD"}}>Цена</TableCell>
                <TableCell  style={{padding:5}}>
                <FormControlLabel onChange={(event)=>checkAll(e,event)} control={<Checkbox   color="default" />}style={{margin:10}} />
                </TableCell >
                <TableCell style={{padding:5}} >Колво</TableCell>
                <TableCell  style={{padding:5}}>Срок</TableCell>
                  
                </React.Fragment>
                );
              })
              
            }
        


          </TableRow>
          
        </TableHead>
        <TableBody>
        {deals.map((row,dealIndex) => (
            row.products.length>0 &&
              <TableRow
              style={{padding:0}}
                key={"deal_"+dealIndex}
               
              >
                <TableCell style={{padding:5}}>{row.id}</TableCell>
                <TableCell style={{padding:5}}>{row.products.length > 0 ? row.products[0].article:""}</TableCell>
                <TableCell style={{padding:5}}>{row.products.length>0?row.products[0].name:""}</TableCell>
                <TableCell style={{padding:5}}>{row.products[0]?.brands.length>0?row.products[0]?.brands[0].title:""}</TableCell>
                <TableCell style={{padding:5}}>{row.quantity}шт.</TableCell>
                {
                  row.supplier_rows.map((supply,index)=>(
                    <React.Fragment key={"supply_"+index}>
                    
                      <TableCell style={{padding:5,borderLeft:"1px solid #D2CECD"}} >
                        {supply.total_price.toFixed(2)}$
                      </TableCell>
                      <TableCell style={{padding:5}}>
                      {        <FormControlLabel control={<Checkbox  color="default" onChange={(event)=>check(dealIndex,index,event)}  checked={deals[dealIndex].supplier_rows[index].calculation} />}style={{margin:10,fontSize:10}} />
  }
  
                      </TableCell>
                      <TableCell style={{padding:5}}>
                      {supply.quentity_calculation}
  
                      </TableCell>
                      <TableCell style={{padding:5}}>
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