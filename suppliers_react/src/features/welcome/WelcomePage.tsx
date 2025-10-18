import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { VersionResponse } from '../../core/models/version_response.model';
import { SupplierService } from '../../core/services/supplier.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import type { AxiosError } from 'axios';

export default function WelcomePage() {
  const [version, setVersion] = useState<VersionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    SupplierService.getVersion()
      .then(response => {
        setVersion(response.data);
      })
      .catch((error: AxiosError) => {
        console.error('Error loading version info:', error);
        
        // Solo mostrar error si no es un error de conexión común
        if (!ErrorHandlerService.isNetworkError(error)) {
          const errorMessage = ErrorHandlerService.extractErrorMessage(error);
          console.warn(`Error al cargar información de versión: ${errorMessage}`);
        }
        
        // Fallback data si la API falla
        setVersion({ 
          author: 'Sistema', 
          message: 'Bienvenido al Sistema de Gestión de Proveedores', 
          version: '1.0.0' 
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        padding: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card sx={{ 
        maxWidth: 800, 
        width: '100%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        borderRadius: 3
      }}>
        <CardContent sx={{ textAlign: 'center', p: 6 }}>
          <Box sx={{ mb: 4 }}>
            <img 
              src="/logo.png" 
              alt="Logo" 
              style={{ width: 250, height: 'auto' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </Box>
          
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: '#1976d2',
            mb: 2
          }}>
            {version?.message || 'Gestión de Proveedores'}
          </Typography>
          
          <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
            Autor: {version?.author || 'Sistema'}
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Versión: {version?.version || '1.0.0'}
          </Typography>
          
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/suppliers')}
            sx={{ 
              mt: 2,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            Continuar al Sistema
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
