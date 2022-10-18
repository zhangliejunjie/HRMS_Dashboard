import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

// Kiet imported
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// ----------------------------------------------------------------------

export default function CampaignCreateModal() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [value1, setValue1] = React.useState(null);
    const [value2, setValue2] = React.useState(null);


    const RegisterSchema = Yup.object().shape({
        title: Yup.string().required('Job title required'),
        description: Yup.string().required('Description required'),
        quantity: Yup.string().required('Quantity required'),
        salary: Yup.string().required('Salary required'),
        // email: Yup.string().required('Last name required'),
        // password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        title: '',
        description: '',
        email: '',
        password: '',
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async () => {
        navigate('/dashboard', { replace: true });
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Typography variant="h3"> Campaign name </Typography>

                <RHFTextField name="title" label="Job Title" />
                <RHFTextField name="description" label="Description" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start date"
                        value={value1}
                        onChange={(newValue) => {
                            setValue1(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        label="End date"
                        value={value2}
                        onChange={(newValue) => {
                            setValue2(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>


                {/* <RHFTextField name="title" label="Job Title" />
                <RHFTextField name="description" label="Description" />

                <RHFTextField name="quantity" label="Quantity" type="number" />
                <RHFTextField name="salary" label="Salary per month" type="number" /> */}
                {/* <RHFTextField name="email" label="Email address" /> */}

        {/* <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Create
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
