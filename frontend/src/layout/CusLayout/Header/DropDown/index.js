import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropDown =() => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box className=' min-w-[120px]' >
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label"  >Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={10}>UI / UX</MenuItem>
          <MenuItem value={20}>Python</MenuItem>
          <MenuItem value={30}>Web Development</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropDown;