import { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import url from './url.json'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { TablePagination } from '@mui/material';
const axios = require('axios').default;


export function Feedback() {
  const [deals,setDeals]=useState([{id:1}])
  const [isLoading, setLoading] =useState(true);
  const {id}=useParams()
  const [count,setCount]=useState(0)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [deal,setDeal]=useState({
    id:1,
    b24_deal_id:122,
    festC_deal_id:1,
    title:"title",
    stage_id:1,
    prrp:"",
    wamargin:"",
    client_rows:[
      {
        title:"11",
        brend_client:"",
        code_client:"",
        article_client:"",
        name_client:"",
        quantity:10,
        price:1,
        amount:2,
        delivery_date:1,
        id:1,
        b24_productrows_id:1,
        festC_productrows_id:1,
        created_date:"2022-07-28T18:10:29.463080"
      }
    ]
  })
  const options={
    headers:{
      "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
    }
  }
  async function Fetch(){
    setLoading(true)
  await  axios.get(`${url.base}/supplier_rows/get_all?productID=${id}&skip=${page*rowsPerPage}&limit=${rowsPerPage}`,options).then(
      function(response){
    setDeals(response.data)
    console.log(response.data[0])
    setCount(response.data.count)
      }
      
    );
    setLoading(false)
  }
  const inputStyle={
    marginTop:15,
    marginBottom:15,
    width:'100%'
  }
useEffect(() => {

 Fetch()

}, []);

useEffect(()=>{
  
},[page,rowsPerPage])
  return (
    <><Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  <div style={{display:"flex",flexDirection:"row",gap:20,width:200}}>

  </div>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Стоимость</TableCell>
            <TableCell>Срок поставки</TableCell>
            <TableCell>Дата создания</TableCell>
            <TableCell></TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {deals.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.total_price}</TableCell>
              <TableCell>{row.delivery_date==null?"":row.delivery_date+" дней"}</TableCell>
              <TableCell>{row.created_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </>
  );
}