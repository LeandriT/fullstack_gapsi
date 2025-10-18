import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import SupplierList from './components/SupplierList';
import SupplierForm from './components/SupplierForm';
import { SupplierService } from '../../core/services/supplier.service';
import { useErrorHandler } from '../../core/hooks/useErrorHandler';
import type { SupplierResponse } from '../../core/models/supplier_response.model';
import type { SupplierRequest } from '../../core/models/supplier_request.model';
import { SupplierStatus } from '../../core/enums/status.enum';
import type { AxiosError } from 'axios';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<SupplierResponse | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const { handleError, handleSuccess } = useErrorHandler();

  // Load suppliers
  const loadSuppliers = async (pageNum = page, pageSize = size) => {
    setLoading(true);
    try {
      const response = await SupplierService.list(pageNum, pageSize);
      setSuppliers(response.data.content);
      setTotalElements(response.data.total_elements);
    } catch (error: any) {
      handleError(error as AxiosError, 'Error al cargar proveedores');
    } finally {
      setLoading(false);
    }
  };

  // Load suppliers on mount and when page/size changes
  useEffect(() => {
    loadSuppliers();
  }, [page, size]);

  // Handle URL params
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const sizeParam = searchParams.get('size');
    if (pageParam) setPage(parseInt(pageParam));
    if (sizeParam) setSize(parseInt(sizeParam));
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ page: newPage.toString(), size: size.toString() });
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(0);
    setSearchParams({ page: '0', size: newSize.toString() });
  };

  const handleCreateNew = () => {
    setEditingSupplier(null);
    setFormOpen(true);
  };

  const handleEdit = (supplier: SupplierResponse) => {
    setEditingSupplier(supplier);
    setFormOpen(true);
  };

  const handleToggleStatus = async (supplier: SupplierResponse) => {
    try {
      const newStatus = supplier.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await SupplierService.partialUpdate(supplier.uuid, newStatus);
      handleSuccess(`Proveedor ${newStatus === 'ACTIVE' ? 'activado' : 'desactivado'} exitosamente`);
      loadSuppliers();
    } catch (error: any) {
      handleError(error as AxiosError, 'Error al cambiar estado del proveedor');
    }
  };

  const handleDelete = (supplier: SupplierResponse) => {
    setSupplierToDelete(supplier);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!supplierToDelete) return;

    try {
      await SupplierService.delete(supplierToDelete.uuid);
      handleSuccess('Proveedor eliminado exitosamente');
      loadSuppliers();
    } catch (error: any) {
      handleError(error as AxiosError, 'Error al eliminar proveedor');
    } finally {
      setDeleteDialogOpen(false);
      setSupplierToDelete(null);
    }
  };

  const handleFormSubmit = async (data: SupplierRequest) => {
    try {
      if (editingSupplier) {
        await SupplierService.update(editingSupplier.uuid, data);
        handleSuccess('Proveedor actualizado exitosamente');
      } else {
        await SupplierService.create(data);
        handleSuccess('Proveedor creado exitosamente');
      }
      setFormOpen(false);
      setEditingSupplier(null);
      loadSuppliers();
    } catch (error: any) {
      const action = editingSupplier ? 'actualizar' : 'crear';
      handleError(error as AxiosError, `Error al ${action} proveedor`, {
        showValidationDetails: true,
        autoHideDuration: 8000
      });
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box sx={{ 
        width: '100%', 
        backgroundColor: 'white', 
        minHeight: 'calc(100vh - 128px)', // Full height minus header and footer
        padding: 3 
      }}>
        <SupplierList
          suppliers={suppliers}
          totalElements={totalElements}
          page={page}
          size={size}
          loading={loading}
          onPageChange={handlePageChange}
          onSizeChange={handleSizeChange}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          onCreateNew={handleCreateNew}
        />
      </Box>

      {/* Form Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSupplier ? 'Editar Proveedor' : 'Crear Nuevo Proveedor'}
        </DialogTitle>
        <DialogContent>
          <SupplierForm
            initialValues={editingSupplier ? {
              name: editingSupplier.name,
              business_name: editingSupplier.business_name,
              address: editingSupplier.address,
              email: editingSupplier.email || '',
              phone: editingSupplier.phone || '',
              status: editingSupplier.status as SupplierStatus,
            } : undefined}
            onSubmit={handleFormSubmit}
            loading={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el proveedor "{supplierToDelete?.name}"?
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
