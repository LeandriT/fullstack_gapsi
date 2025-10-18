import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
  Pagination,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import type { SupplierResponse } from '../../../core/models/supplier_response.model';
import { SupplierStatus, StatusLabels } from '../../../core/enums/status.enum';

interface SupplierListProps {
  suppliers: SupplierResponse[];
  totalElements: number;
  page: number;
  size: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
  onEdit: (supplier: SupplierResponse) => void;
  onToggleStatus: (supplier: SupplierResponse) => void;
  onDelete: (supplier: SupplierResponse) => void;
  onCreateNew: () => void;
}

export default function SupplierList({
  suppliers,
  totalElements,
  page,
  size,
  loading = false,
  onPageChange,
  onSizeChange,
  onEdit,
  onToggleStatus,
  onDelete,
  onCreateNew,
}: SupplierListProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierResponse | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, supplier: SupplierResponse) => {
    setAnchorEl(event.currentTarget);
    setSelectedSupplier(supplier);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSupplier(null);
  };

  const handleSizeChange = (event: SelectChangeEvent) => {
    onSizeChange(Number(event.target.value));
  };

  const totalPages = Math.ceil(totalElements / size);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>Cargando proveedores...</Typography>
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
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Gestión de Proveedores
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateNew}
          size="large"
          sx={{ 
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          Nuevo Proveedor
        </Button>
      </Box>

      {suppliers.length === 0 ? (
        <Paper sx={{ 
          p: 6, 
          textAlign: 'center', 
          mt: 4,
          backgroundColor: '#fafafa',
          borderRadius: 2
        }}>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No hay proveedores registrados
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Comience agregando su primer proveedor al sistema
          </Typography>
          <Button
            variant="contained"
            onClick={onCreateNew}
            size="large"
            sx={{ 
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            Crear Primer Proveedor
          </Button>
        </Paper>
      ) : (
        <>
          <TableContainer 
            component={Paper} 
            sx={{ 
              width: '100%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Razón Social</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Dirección</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Teléfono</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Estado</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow 
                    key={supplier.uuid}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                      '&:hover': { backgroundColor: '#f0f0f0' }
                    }}
                  >
                    <TableCell sx={{ fontWeight: 'medium' }}>{supplier.name}</TableCell>
                    <TableCell>{supplier.business_name}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                    <TableCell>{supplier.email || '-'}</TableCell>
                    <TableCell>{supplier.phone || '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={StatusLabels[supplier.status as SupplierStatus]}
                        color={supplier.status === 'ACTIVE' ? 'success' : 'default'}
                        size="small"
                        sx={{ 
                          fontWeight: 'medium',
                          borderRadius: '12px'
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, supplier)}
                        size="small"
                        sx={{ 
                          '&:hover': { 
                            backgroundColor: '#e3f2fd' 
                          } 
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mt: 3,
            p: 2,
            backgroundColor: '#f8f9fa',
            borderRadius: 1
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                Elementos por página:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <InputLabel>Tamaño</InputLabel>
                <Select
                  value={size.toString()}
                  label="Tamaño"
                  onChange={handleSizeChange}
                  sx={{ backgroundColor: 'white' }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(_, newPage) => onPageChange(newPage - 1)}
              color="primary"
              showFirstButton
              showLastButton
              size="large"
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
            Mostrando {page * size + 1} - {Math.min((page + 1) * size, totalElements)} de {totalElements} proveedores
          </Typography>
        </>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        
        <MenuItem onClick={() => {
          if (selectedSupplier) onEdit(selectedSupplier);
          handleMenuClose();
        }}>
          <EditIcon sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedSupplier) onToggleStatus(selectedSupplier);
          handleMenuClose();
        }}>
          {selectedSupplier?.status === 'ACTIVE' ? (
            <PauseIcon sx={{ mr: 1 }} />
          ) : (
            <PlayArrowIcon sx={{ mr: 1 }} />
          )}
          {selectedSupplier?.status === 'ACTIVE' ? 'Desactivar' : 'Activar'}
        </MenuItem>
        <MenuItem 
          onClick={() => {
            if (selectedSupplier) onDelete(selectedSupplier);
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Menu>
    </Box>
  );
}
