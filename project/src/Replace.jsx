import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import * as XLSX from 'xlsx';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
const axios = require('axios').default;


export default function Replace(){
    const[article,setArticle] = useState("")
    const[brand,setBrand] = useState("");
    const[articler,setArticler]= useState("")
    const[comment,setComment]=useState("");
    const articleChange = (event) => {
        setArticle(event.target.value);
      };
      const articlerChange = (event) => {
        setArticler(event.target.value);
      };
      const brandChange = (event) => {
        setBrand(event.target.value);
      };
      const commentChange = (event) => {
        setComment(event.target.value);
      };
    const data = {
        article:article,
        articler:articler,
        brand:brand,
        comment:comment
    };
    function replaceRequest(){
        axios.post("https://promspetsservice.f-app.ru/replacement/create",data)
        .then(
            function(response){
                alert(response)
            }
        )
    }
    const inputStyle={
        margin:15,
        width:'100%'
    }
        return (
    
           <div style={{display:"flex",justifyContent:'center'
        }}>
            <div style={{width:400}}>
            <TextField id="outlined-basic" onChange={articlerChange} value={articler} label="Старый артикул" style={inputStyle} variant="outlined" />
            <TextField id="outlined-basic" onChange={brandChange} value={brand} label="Новый артикул" style={inputStyle} variant="outlined" />
            <TextField id="outlined-basic" onChange={articleChange} value={article} label="Бренд товара" style={inputStyle} variant="outlined" />

            <TextField id="outlined-basic" onChange={commentChange} value={comment} label="Комментарий специалиста" style={inputStyle} variant="outlined" />
            
            <div style={{display:'flex',justifyContent:'center'}}><Button variant="contained" onClick={()=>replaceRequest()}>Заменить</Button></div>
    
           
            
            </div>
           </div>
          );
    }
