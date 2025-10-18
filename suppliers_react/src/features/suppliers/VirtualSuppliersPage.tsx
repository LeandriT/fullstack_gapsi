import { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import VirtualSupplierList from './components/VirtualSupplierList';
import SupplierForm from './components/SupplierForm';
import { SupplierService } from '../../core/services/supplier.service';
import { useErrorHandler } from '../../core/hooks/useErrorHandler';
import type { SupplierResponse } from '../../core/models/supplier_response.model';
import type { SupplierRequest } from '../../core/models/supplier_request.model';
import type { AxiosError } from 'axios';

export default function VirtualSuppliersPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<SupplierResponse | null>(null);

  const { handleError, handleSuccess } = useErrorHandler();

  const handleEdit = (supplier: SupplierResponse) => {
    setEditingSupplier(supplier);
    setFormOpen(true);
  };

  const handleToggleStatus = async (supplier: SupplierResponse) => {
    try {
      const newStatus = supplier.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await SupplierService.partialUpdate(supplier.uuid, newStatus);
      handleSuccess(`Proveedor ${newStatus === 'ACTIVE' ? 'activado' : 'desactivado'} exitosamente`);
      
      // Recargar la página para reflejar los cambios
      window.location.reload();
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
      
      // Recargar la página para reflejar los cambios
      window.location.reload();
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
      
      // Recargar la página para reflejar los cambios
      window.location.reload();
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
        <VirtualSupplierList
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
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
              status: editingSupplier.status as 'ACTIVE' | 'INACTIVE'
            } : undefined}
            onSubmit={handleFormSubmit}
            loading={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea eliminar el proveedor "{supplierToDelete?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
