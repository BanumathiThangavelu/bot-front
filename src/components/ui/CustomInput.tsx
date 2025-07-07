import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  type TextFieldProps,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type CustomInputProps = TextFieldProps & {
  sx?: TextFieldProps['sx'];
  label?: string;
  secureText?: boolean;
};

const CustomInput: React.FC<CustomInputProps> = ({
  sx,
  label,
  secureText,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const getInputType = () => {
    if (secureText) return showPassword ? 'text' : 'password';
    return type || 'text';
  };

  return (
    <>
      {label && (
        <div
          style={{
            fontSize: 13,
            marginBottom: 4,
            color: '#333',
            textTransform: 'capitalize',
          }}
        >
          {label}
        </div>
      )}

      <TextField
        {...props}
        type={getInputType()}
        fullWidth
        placeholder={props.placeholder || `Enter ${props?.name || ''}`}
        variant="outlined"
        label=""
        sx={{
          '& .MuiInputBase-root': {
            width: '100%',
            boxSizing: 'border-box',
          },
          '& textarea': {
            width: '100% !important',
            boxSizing: 'border-box',
          },
          '& input': {
            width: '100% !important',
            boxSizing: 'border-box',
          },
          ...sx,
        }}
        InputProps={{
          ...props.InputProps,
          endAdornment: secureText ? (
            <InputAdornment position="end">
              <IconButton onClick={handleToggleVisibility} edge="end">
                {showPassword ? (
                  <VisibilityOffIcon style={{ fontSize: 18 }} />
                ) : (
                  <VisibilityIcon style={{ fontSize: 18 }} />
                )}
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </>
  );
};

export default CustomInput;
