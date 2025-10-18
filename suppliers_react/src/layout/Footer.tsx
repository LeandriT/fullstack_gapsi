import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
        © 2025 Gestión de Proveedores - Todos los derechos reservados
      </Typography>
    </Box>
  );
}
