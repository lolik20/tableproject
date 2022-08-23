import React from "react";
import { styled } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useParams } from "react-router-dom";
import { setDefaultOptions } from "date-fns";
const axios = require('axios').default;


export default function Brands(){
   const {id} = useParams();
   const [brands,setBrands] = useState([])
   const [margin,setMargin] = useState(0);
   const marginChange =(event)=>{
      setMargin(event.target.value)
   }
   const options={
    headers:{
      "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
    }
  }
   function getMargin(obj){
      axios.get(`https://promspetsservice.f-app.ru/front/get_markup_brand/?dealId=${id}&brand=${obj}`,options).then(
      function(response){
        return  response.data
      }
      
    );
  }const inputStyle={
    margin:15,
    width:'100%'
}

  useEffect(() => {
  
    Fetch();
   }, []);
   async function Fetch(){
    await  axios.get(`https://promspetsservice.f-app.ru/front/get_table_brand/?dealId=${id}`,options).then(
  function(response){
setBrands(response.data)
  }
);
  }

  return(
  <div style={{width:200}}>
    <Grid item xs={12} md={6}>
     <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
      Brands
       </Typography>
       <List >
         {brands.map((x)=>(
           <ListItem>
           <ListItemText
             primary={x}
           />
         </ListItem>

         ))}
       
       </List>
   </Grid>
   <TextField id="outlined-basic" onChange={marginChange} value={margin} label="Наценка" style={inputStyle} variant="outlined" />

   </div>
   
   
 




);
}
