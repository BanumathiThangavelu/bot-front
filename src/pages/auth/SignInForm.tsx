import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as z from 'zod';
import CustomInput from '../../components/ui/CustomInput';
import CustomButton from '../../components/ui/CustomButton';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { CHATBOT, SIGN_IN } from '../../constant/navigation';

// Zod validation schema
const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // api
  const [signin, { loading }] = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' }); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = SignInSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        const fieldName = err.path[0] as 'email' | 'password';
        fieldErrors[fieldName] = err.message;
      });
      setFormErrors(fieldErrors);
      return;
    }

    await signin(formData);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate(SIGN_IN);
    } else if (token) {
      navigate(CHATBOT);
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: '#fff',
        }}
      >
        <Typography variant="h5" component="h1">
          Sign in with email
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} mt={4}>
          <CustomInput
            required
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />

          <Box mt={3}>
            <CustomInput
              secureText
              required
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
          </Box>

          <CustomButton
            disabled={loading}
            type="submit"
            fullWidth
            style={{ marginTop: '30px' }}
          >
            Get Started
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInForm;
