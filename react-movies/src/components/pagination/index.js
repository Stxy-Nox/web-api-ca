import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({ currentPage, totalPages, onPageChange }) {
    const handleChage = (event, value) => {//not sure why there is a not used event, just followed the "Controlled pagination" from mui
        onPageChange(value); //for "action up", to switch pages on homepage
    }

    return (
    <Stack spacing={2} alignItems={"center"} >
    
      <Pagination 
      count={totalPages}
      page={currentPage}
      onChange={handleChage} 
      color="primary" 
      showFirstButton
      showLastButton
      />
      
    </Stack>
  );
}
