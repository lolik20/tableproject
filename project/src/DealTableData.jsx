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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


const axios = require('axios').default;

export function DealTableData() {
  
    const { id } = useParams()
    const [deal,setDeal]=useState([])
    const [isOpen, setOpen] = useState(false);
    const [isReplaceOpen,setReplaceOpen]=useState(false);
    const handleReplaceOpen = () => setReplaceOpen(true);
    const handleReplaceClose = () => setReplaceOpen(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name,setName] = useState("")
    const [article,setArticle]= useState("")
    const [brand,setBrand]=useState("");
    const [brandReplace,setBrandReplace]=useState("");

    const [isChecked,setChecked]=useState(true)
    const[articler,setArticler]= useState("")
    const[comment,setComment]=useState("");
    const [isLoading, setLoading] =useState(true);


    const brandReplaceChange =(event)=>{
      setBrandReplace(event.target.value);
    }
    const articlerChange = (event) => {
      setArticler(event.target.value);
    };
    const commentChange = (event) => {
      setComment(event.target.value);
    };
    const handleChange = (event) => {

      setChecked(event.target.checked);
    };
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

    const style = {
      borderRadius:5,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '1px solid #000',
      boxShadow: 24,
      p: 4,
    };
    const options={
      headers:{
        "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
      }
    }
    async function AddReplacement(){
      await axios.post(`https://promspetsservice.f-app.ru/replacement/create`,{
      "article": article,
      "brand": brand,
      "article_replacement": articler,
      "brand_replacement": brandReplace,
      "comment":comment
    },options).then(
      function(response){
        console.log(response)
        if(response.status==200){
          setOpen(false)
          Update()
        }
      }
    ).catch(function(error){
      alert(error)
    })
    }
    
    async function Update(){
     await axios.get(`https://promspetsservice.f-app.ru/deal/pick_up/?dealId=${id}`)
     .then(function(response){
      window.reload();
     })
    }

async  function AddProduct(){
   await axios.post(`https://promspetsservice.f-app.ru/product/product_create`,{
      "name": name,
      "article": article,
      "brand": brand,
      "supply": isChecked
    },options).then(
      function(response){
        console.log(response)
        if(response.status==200){
          setOpen(false)
          Update()
        }
      }
    ).catch(function(error){
      alert(error)
    })
  }
  async function Update(){
    await axios.get(`https://promspetsservice.f-app.ru/deal/pick_up/?dealId=${id}`,options).then(function(response){
      window.location.reload()
    })
  }
  async function Fetch(){
    await  axios.get(`https://promspetsservice.f-app.ru/deal/table_selection/?dealId=${id}&skip=0&limit=50`,options).then(
  function(response){
    console.log(isLoading)
setDeal(response.data)
  }
);
setLoading(false)
  }
useEffect(() => {
   Fetch()

}, []);
const data = [
  ["ID сделки",id],
  ["Название","Бренд клиента","Имя клиента", "Код клиента"]
]
const excelOptions = {
  headers:{
    "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ"),
    "Content-Type":"multipart/form-data" 
  }
}

const importExcel = async (e) => {
  const [file] = e.target.files;
  var data = new FormData();
  data.append("file",file)
 await axios.post(`https://promspetsservice.f-app.ru/front/create_table_selection/?dealId=${id}`,data,excelOptions)
  .then(function(response){
  })
};
 function exportData(){
  deal.forEach(x=> {
    let array = new Array();
    array= Object.values(x);
    data.push(array);
  })
let worksheet = XLSX.utils.aoa_to_sheet(data);
let newWorkBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkBook,worksheet,'Test')
 XLSX.writeFile(newWorkBook,`${id}.xlsx`)
}
  return (
<>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={isLoading}
>
  <CircularProgress color="inherit" />
</Backdrop>
<Modal
        open={isReplaceOpen}
        onClose={handleReplaceClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
 <Box sx={style}>
        
 <TextField id="outlined-basic" onChange={articlerChange} value={articler} label="Старый артикул" style={inputStyle} variant="outlined" />
            <TextField id="outlined-basic" onChange={articleChange} value={article} label="Новый артикул" style={inputStyle} variant="outlined" />
            <TextField id="outlined-basic" onChange={brandReplaceChange} value={brandReplace} label="Старый бренд" style={inputStyle} variant="outlined" />

            <TextField id="outlined-basic" onChange={brandChange} value={brand} label="Новый бренд" style={inputStyle} variant="outlined" />

            <TextField id="outlined-basic" onChange={commentChange} value={comment} label="Комментарий специалиста" style={inputStyle} variant="outlined" />
            
            <div style={{display:'flex',justifyContent:'center'}}>
          <Button variant="contained" onClick={()=> AddReplacement()}>Заменить</Button></div>

       
        
        </Box>

      </Modal>

<Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
 <Box sx={style}>
        
        <TextField id="outlined-basic" onChange={nameChange} value={name} label="Наименование" style={inputStyle} variant="outlined" />
        <TextField id="outlined-basic" value={article} onChange={articleChange} label="Артикул" style={inputStyle} variant="outlined" />
        <TextField id="outlined-basic" value={brand} onChange={brandChange} label="Бренд" style={inputStyle} variant="outlined" />
        <FormControlLabel control={<Checkbox onChange={handleChange} checked={isChecked} />} label="Поставляем" style={{margin:10}} />
        <div style={{display:'flex',justifyContent:'center'}}>
          <Button variant="contained" onClick={()=> AddProduct()}>Добавить</Button></div>

       
        
        </Box>

      </Modal>
    <TableContainer component={Paper}>
      
            <h2 style={{marginLeft:10}}>Номер сделки в битрикс: {id}</h2>
            <h2 style={{marginLeft:10}}>Кол-во позиций: {deal.length}</h2>
            <div style={{display:'flex',flexDirection:"row",justifyContent:"start",alignContent:"start",gap:10,margin:15}}>
          <Button style={{height:30}}  variant="outlined" size="small">
          <a style={{textDecoration:'none'}} onClick={handleOpen}>Добавить товар</a>
        </Button>
        <Button style={{height:30}}  variant="outlined" size="small">
          <a style={{textDecoration:'none'}} onClick={()=>Update()}>Обновить</a>
        </Button>
        <Button variant="contained" style={{fontSize:10}} component="label">
  Создать
  <input hidden type="file" onChange={importExcel}/>
</Button>
    
            </div>
            <div style={{display:'flex',flexDirection:"row",justifyContent:"start",alignContent:"start",gap:10,margin:15}}>
            <h4>Тип файла</h4>

            </div>
            <div style={{display:'flex',flexDirection:"row",justifyContent:"start",alignContent:"start",gap:10,margin:15}}>
            <h4>Валюта</h4>

            </div>

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
           <TableCell>Название продукта</TableCell>
           <TableCell>Артикул продукта</TableCell>
           <TableCell></TableCell>
           <TableCell>Колличество</TableCell>
           <TableCell>Цена</TableCell>
           <TableCell>Сумма</TableCell>
           <TableCell>Срок поставки</TableCell>

          <TableCell></TableCell>
          <TableCell></TableCell>

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
              <TableCell>{row.products.length>0? row.products[0].name:""}</TableCell>
              <TableCell>{row.products.length>0?row.products[0].article:""}</TableCell>
              <TableCell>{row.products.length>0?(row.products[0].supply?"Поставляем":""):""}</TableCell>
              <TableCell>{row.quantity} шт.</TableCell>
              <TableCell>{row.price}$</TableCell>
              <TableCell>{row.quantity*row.price}$</TableCell>
              <TableCell>{row.delivery_date} дней</TableCell>

              <TableCell>{row.replacements.length>0?("Замена: "+row.replacements[0].article+" Comment: "+row.replacements[0].comment ):""}</TableCell>

              <TableCell>
                {row.products.length ==0  &&
                  <Button variant="outlined" size="small">
                  <a onClick={handleReplaceOpen} style={{textDecoration:'none'}}>заменить</a>
                </Button>
                }
            
              </TableCell>
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