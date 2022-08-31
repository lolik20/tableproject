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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import url from './url.json'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TablePagination } from '@mui/material';

const axios = require('axios').default;

export default function Trackers(){
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
  const inputStyle={
    marginTop:15,
    marginBottom:15,
    width:'100%'
  }
  const [tracker,setTracker] =useState();
  const [to_where,setTo] =useState();
  const[tracker_previous,setTrackerPrevious]=useState()
  const [from_where,setFrom]= useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[isOpen,setOpen] = useState(false)
  const[date_dispatch,setDateDispatch] = useState(new Date())

  const[date_planned_delivery,setDatePlanned] = useState(new Date())
  const [isLoading,setLoading] =useState(true)
  const[count,setCount]=useState(0)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
    const options={
        headers:{
          "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
        }
      }
      const [trackers,setTrackers]= useState([])
      async function AddTracker(){
        await  axios.post(`${url.base}/delivery`,{
            tracking_number:tracker,
            from_where:from_where,
            to_where:to_where,
            tracker_previous,
            date_dispatch:date_dispatch.toISOString().slice(0,10),
            date_planned_delivery:date_planned_delivery.toISOString().slice(0,10),
        },options).then(
          function(response){
        alert(response.status)
          }
          
        );
      }
      
    async function Fetch(){
      setLoading(true)
        await  axios.get(`${url.base}/delivery/?skip=${page*rowsPerPage}&limit=${rowsPerPage}`,options).then(
            function(response){
          setTrackers(response.data.results)
          setCount(response.data.count)
            }
            
          );
          setLoading(false)
        }

    useEffect(()=>{
        Fetch()
    },[])
    useEffect(()=>{
        Fetch()
    },[rowsPerPage,page])
    return(
        <><Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={isOpen}
        onClose={handleClose}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
 <Box sx={style}>
 <TextField id="outlined-basic" onChange={(e)=>setTracker(e.target.value)} value={tracker} label="Номер трекера" style={inputStyle} variant="outlined" />
 <TextField id="outlined-basic" onChange={(e)=>setFrom(e.target.value)} value={from_where} label="Откуда" style={inputStyle} variant="outlined" />
 <TextField id="outlined-basic" onChange={(e)=>setTo(e.target.value)} value={to_where} label="Куда" style={inputStyle} variant="outlined" />
 <TextField id="outlined-basic" onChange={(e)=>setTrackerPrevious(e.target.value)} value={tracker_previous} label="Предыдущий трекер" style={inputStyle} variant="outlined" />

 <div style={{display:'flex',gap:10}}>
 <LocalizationProvider dateAdapter={AdapterDateFns}>


<DatePicker

label="Дата отгрузки"
value={date_dispatch}
onChange={(newValue) => {
  setDateDispatch(newValue);
}}
renderInput={(params) => <TextField {...params} />}
/>            </LocalizationProvider>
<LocalizationProvider dateAdapter={AdapterDateFns}>

<DatePicker
label="Планируемая дата доставки"
value={date_planned_delivery}
onChange={(newValue) => {
  setDatePlanned(newValue);
}}
renderInput={(params) => <TextField {...params} />}
/>            </LocalizationProvider>
</div>
<Button style={{margin:10}} variant="outlined" size="small">
          <a style={{textDecoration:'none'}} onClick={()=>AddTracker()}>Создать</a>
        </Button>
        </Box>

      </Modal>
      <Button variant="outlined" size="small">
          <a style={{textDecoration:'none'}} onClick={handleOpen}>Добавить</a>
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Номер</TableCell>
                <TableCell>Откуда</TableCell>
                <TableCell>Куда</TableCell>
                <TableCell>Предыдущий трекер</TableCell>
                <TableCell>Дата отгрузки</TableCell>
                <TableCell>Планируемая дата доставки</TableCell>

    
              </TableRow>
            </TableHead>
            <TableBody>
              {trackers.map((row) => (
                <TableRow
                  
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  
                  <TableCell>{row.tracking_number}</TableCell>
                  <TableCell>{row.from_where}</TableCell>
                  <TableCell>{row.to_where}</TableCell>

                  <TableCell>{row.tracker_previous}</TableCell>

                  <TableCell>{row.date_dispatch}</TableCell>

                  <TableCell>{row.date_planned_delivery}</TableCell>

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
    )
}
