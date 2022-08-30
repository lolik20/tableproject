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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[isOpen,setOpen] = useState(false)
    const [isLoading,setLoading] =useState(true)
    const options={
        headers:{
          "Authorization":"Basic "+ btoa("admin:sQwYySD1B8vVsqGcndiXtrumfQ")
        }
      }
      const [trackers,setTrackers]= useState([])
    async function Fetch(){
        await  axios.get(`${url.base}/delivery/?skip=0&limit=100`,options).then(
            function(response){
          setTrackers(response.data.results)
            }
            
          );
          setLoading(false)
        }
        useEffect(()=>{
        Fetch()
    },[])

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
        

<h2>не мог найти запрос в swagger</h2>
       
        
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
        <Stack spacing={2}>
      <Pagination count={10} variant="outlined" />
      </Stack>
        </>
    )
}
