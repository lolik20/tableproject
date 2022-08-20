import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import * as XLSX from 'xlsx';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';

export default function Add(){
    const [name,setName] = useState("")
    const [article,setArticle]= useState("")
    const [brand,setBrand]=useState("");
    const nameChange = (event) => {
        setName(event.target.value);
      };
      const articleChange = (event) => {
        setArticle(event.target.value);
      };
      const brandChange = (event) => {
        setBrand(event.target.value);
      };
const inputStyle={
    margin:15,
    width:'100%'
}
    return (

       <div style={{display:"flex",justifyContent:'center'}}>
        <div style={{width:400}}>
        <TextField id="outlined-basic" onChange={nameChange} value={name} label="Наименование" style={inputStyle} variant="outlined" />
        <TextField id="outlined-basic" value={article} onChange={articleChange} label="Артикул" style={inputStyle} variant="outlined" />
        <TextField id="outlined-basic" value={brand} onChange={brandChange} label="Бренд" style={inputStyle} variant="outlined" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Поставляем" style={{margin:10}} />
        <div style={{display:'flex',justifyContent:'center'}}><Button variant="contained">Добавить</Button></div>

       
        
        </div>
       </div>
      );
}