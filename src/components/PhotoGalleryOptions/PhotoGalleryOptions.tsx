import { Grid, FormControl, Select, MenuItem, ButtonGroup, Button, InputLabel } from '@mui/material';
import { Order } from '../../types/Order';
import { useAppContext } from '../../contexts/AppContext';
import { ThemeProvider } from '@mui/material/styles';
import './galleryOptions.scss';
import { customTheme } from '../../themes/customTheme';
import { Screen } from '../../types/Screen';

export const PhotoGalleryOptions = () => {
  const { 
    columns, 
    setColumns, 
    photosPerPage, 
    setPhotosPerPage, 
    sortOrder, 
    setSortOrder,
    screen,
  } = useAppContext();

  return (
    <ThemeProvider theme={customTheme}>
      <div className='settings'>
        <Grid 
          container 
          spacing={0.5} 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          maxWidth="1200px"
          marginLeft={1}
          padding={1}
        >
          <Grid 
            container 
            spacing={1} 
            justifyContent="start"
            alignItems="center" 
            xs={8}
          >
            {screen === Screen.DESKTOP && (
              <Grid item xs={3}>
                <FormControl component="fieldset" sx={{ m: 1, minWidth: 150 }}>
                  <ButtonGroup 
                    variant="text" 
                    size="small" 
                    aria-label="small button group"
                  >
                    <Button
                      onClick={() => setColumns(3)}
                      variant={columns === 3 ? 'contained' : 'text'}
                      fullWidth
                    >
                      Three columns
                    </Button>
                    <Button
                      onClick={() => setColumns(5)}
                      variant={columns === 5 ? 'contained' : 'text'}
                      fullWidth
                    >
                      Five columns
                    </Button>
                  </ButtonGroup>
                </FormControl>
              </Grid>
            )}
            
            <Grid item xs={2} width="100%">
              <FormControl sx={{ m: 1, minWidth: 100, height: 30 }}>
                <InputLabel id="demo-simple-select-label">Photo per page</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select" 
                  label="Photo per page"
                  size="small"
                  value={photosPerPage} 
                  onChange={(e) => setPhotosPerPage(e.target.value as number)} 
                  autoWidth  
                  color='secondary'
                >
                  {[24,48,56,72].map(perPage =>(
                    <MenuItem value={perPage} placeholder='Photo per page'>
                      {`${perPage}`} 
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={2}>
              <FormControl sx={{ m: 1, minWidth: 100, height: 30}}>
                <InputLabel id="demo-simple-select-label">Order</InputLabel>
                <Select 
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Order" 
                  size="small"
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(e.target.value as Order)} 
                >
                  {Object.values(Order).map((value) => (
                    <MenuItem key={value} value={value} placeholder='Photo per page'>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};
