import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextField,
  Button,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from '@mui/material';
import { SupplierStatus, StatusLabels } from '../../../core/enums/status.enum';

const schema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  business_name: z.string().min(1, 'La razón social es obligatoria'),
  address: z.string().min(1, 'La dirección es obligatoria'),
  email: z.string().email('Formato de correo no válido').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  status: z.nativeEnum(SupplierStatus),
});

type FormData = z.infer<typeof schema>;

interface SupplierFormProps {
  initialValues?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

export default function SupplierForm({ 
  initialValues, 
  onSubmit, 
  loading = false 
}: SupplierFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { 
      status: SupplierStatus.ACTIVE, 
      ...initialValues 
    }
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
            )}
          />
          
          <Controller
            name="business_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Razón Social"
                fullWidth
                error={!!errors.business_name}
                helperText={errors.business_name?.message}
                required
              />
            )}
          />
        </Box>
        
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dirección"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              required
            />
          )}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo Electrónico"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Teléfono"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </Box>
        
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                {...field}
                label="Estado"
                error={!!errors.status}
              >
                {Object.values(SupplierStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {StatusLabels[status]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            size="large"
          >
            {loading ? 'Guardando...' : 'Guardar Proveedor'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
