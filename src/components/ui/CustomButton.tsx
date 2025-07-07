// CustomButton.tsx
import React from 'react';
import { Button, type ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  label?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  children,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        width: props?.fullWidth ? '100%' : '150px',
        backgroundColor: 'Green',
        textTransform: 'capitalize',
        ...props.sx,
      }}
      {...props}
    >
      {label || children}
    </Button>
  );
};

export default CustomButton;
