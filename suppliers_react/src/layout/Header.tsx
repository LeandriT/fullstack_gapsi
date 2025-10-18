import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Business as BusinessIcon, List as ListIcon } from '@mui/icons-material';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#1976d2',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}
        >
          Gestión de Proveedores
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/')}
            startIcon={<HomeIcon />}
            sx={{
              backgroundColor: isActive('/') ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              },
              fontWeight: isActive('/') ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            Inicio
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/suppliers')}
            startIcon={<BusinessIcon />}
            sx={{
              backgroundColor: isActive('/suppliers') ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              },
              fontWeight: isActive('/suppliers') ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            Proveedores
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/suppliers-virtual')}
            startIcon={<ListIcon />}
            sx={{
              backgroundColor: isActive('/suppliers-virtual') ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              },
              fontWeight: isActive('/suppliers-virtual') ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            Lista Virtual
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
