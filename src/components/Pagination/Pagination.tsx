import { ChangeEvent, useContext } from 'react';
import { Grid, ThemeProvider } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { AppContext } from "../../contexts/AppContext";
import { customTheme } from '../../themes/customTheme';

export const PaginationBar = () => {
  const { page, setPage } = useContext(AppContext);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <ThemeProvider theme={customTheme}>
       <Grid 
        container 
        direction="row" 
        justifyContent="center" 
        alignItems="center" 
        width="100%"
        marginBottom={5}
        marginTop={5}
      >
        <Pagination
          size="small"
          count={10}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Grid>
    </ThemeProvider>  
  )
}