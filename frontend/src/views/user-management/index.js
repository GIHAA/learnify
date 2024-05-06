// material-ui
import { Typography  } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// const TypographyStyle = styled(Typography)(
//   ({ /*theme*/ }) => ({

//   })
// );

//kamesh call user service here

// ==============================|| SAMPLE PAGE ||============================== //


import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const CourseManagementPage = () =>{
 const [rows,setrows] = useState(['']);
 const [name,setname] = useState('')
 const [hidde,sethidde] = useState(true)
 //  const [email,setemail] = useState()
//  const [role,setrole] = useState()

  const userdata = ()=>{
    
     axios.get( 'http://localhost:3001/auth-service/api/users/').then((res)=>{

      const data = res.data.data;
      setrows(data);
     }).catch()
     
  }

  const userDelete =(id)=>{
    console.log(id)

     axios.delete( `http://localhost:3001/auth-service/api/users/${id}`).then(res=>{
       console.log(res.data.data)
      
       userdata()
     
     }).catch((error)=>{
      console.log(error)
     })
  }

 const settoclick = ()=>{

   sethidde(!hidde)
 }
  const userUpdate = (id)=>{
    console.log(id)
   


    axios.patch(`http://localhost:3001/auth-service/api/users/${id}`, { name })
    .then((res) => {
      console.log(res.data);
      sethidde(true)
      setname('')
      userdata();
       
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(()=>{

    userdata()
  },[])

  console.log(rows)
  return(
   
    <MainCard title="User Management">
    <Typography variant="body2" >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert</TableCell>
            <TableCell align="left">Calories</TableCell>
            <TableCell align="left">Calories</TableCell>
       
           
          </TableRow>
        </TableHead>
        <TableBody>
          { Array.isArray(rows) && rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left"  >
                {row.name  }   <input type='text'  className={` py-2 px-3 outline-none border border-blue-700 ${hidde && 'hidden'}`}  placeholder='Update data'  onChange={(e)=>{
                        
                         setname( e.target.value)
                }}/> 
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.role}</TableCell>
              <TableCell align="center" ><button className=' py-2 px-6  bg-red-600 hover:text-red-400 hover:bg-white text-white outline-none border border-red-500 ' onClick={()=>{
                userDelete(row._id)
              }}>Delete</button> <button className={`py-2 px-5  max-lg:mt-2  bg-blue-600 hover:text-blue-500 hover:bg-white text-white outline-none border  border-blue-500  ${hidde && 'hidden'}`} onClick={()=>{
                userUpdate(row._id)
              }}>Update</button>
               <AddCircleOutlineIcon onClick={settoclick}  className=' ml-2  text-purple-500'></AddCircleOutlineIcon>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Typography>
  </MainCard>
  )
}

export default CourseManagementPage;

