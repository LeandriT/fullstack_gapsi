import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  Stack,
  List,
  ListItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import type { SupplierResponse } from '../../../core/models/supplier_response.model';
import { SupplierStatus, StatusLabels } from '../../../core/enums/status.enum';
import { SupplierService } from '../../../core/services/supplier.service';
import { useErrorHandler } from '../../../core/hooks/useErrorHandler';
import type { AxiosError } from 'axios';

interface VirtualSupplierListProps {
  onEdit: (supplier: SupplierResponse) => void;
  onToggleStatus: (supplier: SupplierResponse) => void;
  onDelete: (supplier: SupplierResponse) => void;
}

const PAGE_SIZE = 10; // Tamaño de página fijo

/**
 * Compound Component Pattern Implementation
 * 
 * Este componente implementa el patrón Compound Component que combina múltiples
 * responsabilidades en una interfaz cohesiva: lista virtual, scroll infinito,
 * acciones de usuario y manejo de estado.
 * 
 * Beneficios:
 * - Componente autocontenido con múltiples funcionalidades
 * - Interfaz cohesiva y fácil de usar
 * - Encapsulación de lógica compleja
 * - Reutilización de componentes internos
 */
export default function VirtualSupplierList({
  onEdit,
  onToggleStatus,
  onDelete,
}: VirtualSupplierListProps) {
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { handleError } = useErrorHandler();

  // Cargar datos iniciales
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await SupplierService.list(0, PAGE_SIZE);
      setSuppliers(response.data.content);
      setHasNextPage(!response.data.last);
      setCurrentPage(0);
    } catch (err) {
      const errorMessage = 'Error al cargar proveedores';
      handleError(err as AxiosError, errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  // Cargar más datos (para scroll infinito)
  const loadMoreData = useCallback(async () => {
    if (!hasNextPage || loading) return;

    try {
      const nextPage = currentPage + 1;
      const response = await SupplierService.list(nextPage, PAGE_SIZE);
      
      setSuppliers(prev => [...prev, ...response.data.content]);
      setHasNextPage(!response.data.last);
      setCurrentPage(nextPage);
    } catch (err) {
      handleError(err as AxiosError, 'Error al cargar más proveedores');
    }
  }, [currentPage, hasNextPage, loading, handleError]);

  // Manejar scroll para cargar más datos
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const threshold = 100; // Cargar cuando queden 100px para el final
    
    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, supplier: SupplierResponse) => {
    setAnchorEl(event.currentTarget);
    setSelectedSupplier(supplier);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSupplier(null);
  };

  const handleMenuAction = (action: () => void) => {
    action();
    handleMenuClose();
  };

  if (loading && suppliers.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando proveedores...</Typography>
      </Box>
    );
  }

  if (error && suppliers.length === 0) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (suppliers.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No hay proveedores registrados
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        paddingBottom: 2,
        borderBottom: '2px solid #e0e0e0'
      }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 'bold', 
            color: '#1976d2',
            fontSize: '1.8rem',
            mb: 0.5
          }}>
            Lista Virtual de Proveedores
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
            Gestión eficiente con scroll infinito • Carga automática de datos
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold',
            color: '#1976d2',
            fontSize: '1.2rem'
          }}>
            {suppliers.length}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            proveedores cargados
          </Typography>
        </Box>
      </Box>

      {/* Headers de la tabla */}
      <Paper sx={{ 
        mb: 1, 
        p: 2, 
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ minWidth: 140, flex: 1 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 'bold', 
              fontSize: '0.9rem',
              color: '#424242'
            }}>
              Nombre
            </Typography>
          </Box>
          <Box sx={{ minWidth: 200, flex: 1 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 'bold', 
              fontSize: '0.9rem',
              color: '#424242'
            }}>
              Dirección
            </Typography>
          </Box>
          <Box sx={{ minWidth: 180, flex: 1 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 'bold', 
              fontSize: '0.9rem',
              color: '#424242'
            }}>
              Contacto
            </Typography>
          </Box>
          <Box sx={{ minWidth: 100, flex: 0.5 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 'bold', 
              fontSize: '0.9rem',
              color: '#424242'
            }}>
              Estado
            </Typography>
          </Box>
          <Box sx={{ minWidth: 60, flex: 0.3 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 'bold', 
              fontSize: '0.9rem',
              color: '#424242'
            }}>
              Acciones
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Lista con scroll infinito */}
      <Box 
        sx={{ 
          height: '65vh', 
          border: '1px solid #e0e0e0', 
          borderRadius: 2,
          overflow: 'auto',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c1c1c1',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#a8a8a8',
            },
          },
        }}
        onScroll={handleScroll}
      >
        <List sx={{ padding: 0 }}>
          {suppliers.map((supplier) => (
            <React.Fragment key={supplier.uuid}>
              <ListItem
                sx={{
                  backgroundColor: '#ffffff',
                  borderBottom: '1px solid #e0e0e0',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                  py: 2.5,
                  px: 2,
                  borderRadius: 0,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                  <Box sx={{ minWidth: 140, flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      color: '#212121',
                      lineHeight: 1.3
                    }}>
                      {supplier.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontSize: '0.8rem',
                      color: '#757575',
                      mt: 0.5,
                      lineHeight: 1.2
                    }}>
                      {supplier.business_name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ minWidth: 200, flex: 1 }}>
                    <Typography variant="body2" sx={{ 
                      fontSize: '0.875rem',
                      color: '#424242',
                      lineHeight: 1.4
                    }}>
                      {supplier.address}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ minWidth: 180, flex: 1 }}>
                    <Typography variant="body2" sx={{ 
                      fontSize: '0.875rem',
                      color: '#424242',
                      lineHeight: 1.3
                    }}>
                      {supplier.email || '-'}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontSize: '0.875rem',
                      color: '#424242',
                      lineHeight: 1.3
                    }}>
                      {supplier.phone || '-'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ minWidth: 100, flex: 0.5, display: 'flex', justifyContent: 'center' }}>
                    <Chip
                      label={StatusLabels[supplier.status as SupplierStatus]}
                      color={supplier.status === 'ACTIVE' ? 'success' : 'default'}
                      size="small"
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        borderRadius: '16px',
                        backgroundColor: supplier.status === 'ACTIVE' ? '#4caf50' : '#f44336',
                        color: 'white',
                        '& .MuiChip-label': {
                          px: 1.5,
                          py: 0.5
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ minWidth: 60, flex: 0.3, display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, supplier)}
                      size="small"
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: '#e3f2fd',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease-in-out',
                        color: '#757575'
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Indicador de carga */}
      {loading && suppliers.length > 0 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          p: 3,
          backgroundColor: '#f8f9fa',
          borderRadius: 2,
          mt: 2,
          border: '1px solid #e0e0e0'
        }}>
          <CircularProgress size={28} sx={{ color: '#1976d2' }} />
          <Typography sx={{ ml: 2, fontWeight: 'medium', color: '#424242' }}>
            Cargando más proveedores...
          </Typography>
        </Box>
      )}

      {/* Información de paginación */}
      <Box sx={{ 
        mt: 3, 
        p: 3, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
              Total cargados: {suppliers.length} proveedores
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Carga automática de 10 elementos por página
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 'bold',
              color: hasNextPage ? '#1976d2' : '#4caf50'
            }}>
              {hasNextPage ? 'Más datos disponibles' : 'Todos los datos cargados'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {hasNextPage ? 'Desplázate hacia abajo para cargar más' : 'Lista completa'}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Menú de acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            border: '1px solid #e0e0e0',
            minWidth: 180
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
          onClick={() => handleMenuAction(() => onEdit(selectedSupplier!))}
          sx={{ 
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: '#e3f2fd'
            }
          }}
        >
          <EditIcon sx={{ mr: 1.5, color: '#1976d2' }} />
          <Typography sx={{ fontWeight: 'medium' }}>Editar</Typography>
        </MenuItem>
        <MenuItem 
          onClick={() => handleMenuAction(() => onToggleStatus(selectedSupplier!))}
          sx={{ 
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: selectedSupplier?.status === 'ACTIVE' ? '#fff3e0' : '#e8f5e8'
            }
          }}
        >
          {selectedSupplier?.status === 'ACTIVE' ? (
            <PauseIcon sx={{ mr: 1.5, color: '#ff9800' }} />
          ) : (
            <PlayArrowIcon sx={{ mr: 1.5, color: '#4caf50' }} />
          )}
          <Typography sx={{ fontWeight: 'medium' }}>
            {selectedSupplier?.status === 'ACTIVE' ? 'Desactivar' : 'Activar'}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuAction(() => onDelete(selectedSupplier!))}
          sx={{ 
            py: 1.5,
            px: 2,
            color: '#f44336',
            '&:hover': {
              backgroundColor: '#ffebee'
            }
          }}
        >
          <DeleteIcon sx={{ mr: 1.5 }} />
          <Typography sx={{ fontWeight: 'medium' }}>Eliminar</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
