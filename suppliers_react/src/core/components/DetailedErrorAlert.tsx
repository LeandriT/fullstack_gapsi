import { Alert, AlertTitle, Collapse, IconButton, Box, Typography } from '@mui/material';
import { Close as CloseIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { useState } from 'react';

interface DetailedErrorAlertProps {
  title: string;
  message: string;
  details?: string;
  onClose?: () => void;
  severity?: 'error' | 'warning' | 'info';
}

export default function DetailedErrorAlert({ 
  title, 
  message, 
  details, 
  onClose, 
  severity = 'error' 
}: DetailedErrorAlertProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Alert 
      severity={severity}
      action={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {details && (
            <IconButton
              aria-label="expand"
              size="small"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
          {onClose && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      }
      sx={{ mb: 2 }}
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
      
      {details && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 1, p: 1, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: 1 }}>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontSize: '0.75rem' }}>
              {details}
            </Typography>
          </Box>
        </Collapse>
      )}
    </Alert>
  );
}
