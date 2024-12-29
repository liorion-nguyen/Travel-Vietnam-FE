import React from 'react';
import { Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, onClose, imageSrc }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
        <img src={imageSrc} alt="Enlarged" style={{ width: '90vw', height: '90vh' }} />
      </Box>
    </Modal>
  );
};

export default ImageModal; 