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
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import url from './url.json'

const axios = require('axios').default;


export default function Brands(){
   const {id} = useParams();
   const [brands,setBrands] = useState([])
   const [brand,setBrand]= useState("");
   const [margin,setMargin] = useState(0);

   const marginChange =(event)=>{
      setMargin(event.target.value)
   }
   const brandChange =(event)=>{
    setBrand(event.target.value)
 }
   const options={
    headers:{
      "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
    }
  }
   function getMargin(obj){
      axios.get(`${url.base}/front/get_markup_brand/?dealId=${id}&brand=${obj}`,options).then(
      function(response){
        return  response.data
      }
      
    );
  }const inputStyle={
    width:'100%',
    margin:10
}
const updateOptions={
  headers:{
    "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
  },
  url:`${url.base}/brand/update_markup/`,
  body:{
dealId:parseFloat( id),
brand:brand,
markup:parseFloat(margin)
  }
}
 async function Update(){
  await  axios.post(updateOptions.url,updateOptions.body,updateOptions).then(
  function(response){
  })

 }
  useEffect(() => {
  
    Fetch();
   }, []);
   async function Fetch(){
    await  axios.get(`${url.base}/brand/get_table/?dealId=${id}`,options).then(
  function(response){
setBrands(response.data)
  }
);
  }

  return(
  <div style={{width:200}}>
    <Grid item xs={12} md={6}>
     <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
      Бренды
       </Typography>
       <List >
         {brands.map((x)=>(
           <ListItem>
           <ListItemText
             primary={x.title}
             secondary={x.markup+"%"}
           />
         </ListItem>

         ))}
       
       </List>
       <FormControl fullWidth sx={{ }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={margin}
            type="number"
            onChange={(e)=>marginChange(e)}
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
            label="Amount"
          />
        </FormControl>
       <TextField id="outlined-basic" onChange={brandChange} value={brand} label="Бренд" style={inputStyle} variant="outlined" />
   <Button variant="contained" style={{fontSize:10,margin:10}} onClick={()=>Update()} component="label">
Обновить
</Button>
   </Grid>
   
   </div>
   
   
 




);
}
