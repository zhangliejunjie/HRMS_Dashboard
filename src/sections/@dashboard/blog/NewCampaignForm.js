import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, Select, MenuItem } from '@mui/material';
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
import { useFormik } from 'formik';
import axios from 'axios';
// import { injectIntl, FormattedMessage } from 'react-intl';
// api import
import moment from 'moment/moment';
// ----------------------------------------------------------------------

export default function CampaignCreateForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required('Job title required'),
    description: Yup.string().required('Description required'),
    quantity: Yup.string().required('Quantity required'),
    salary: Yup.string().required('Salary required'),
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
  // use forkmik
  let date = Date.now();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      start_date: moment(date).format('yyyy-MM-DD'),
      end_date: moment(date).format('yyyy-MM-DD'),
      status: 'Processing',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Tên không được bỏ trống'),
      description: Yup.string().required('Miêu tả không được bỏ trống'),
      // start_date: Yup.date().min(new Date('2019-01-01')).max(new Date('2019-01-01')).required(),
      start_date: Yup.date().max(new Date(), 'Chi Kieu da ra sao'),
      // end_date: Yup.date()
      //   .min(Date().now(), 'No Implementations')
      //   .max(new Date(), 'Chi Kieu da ra sao')
      //   .required(),
    }),

  
    onSubmit: (value) => {
      console.log(value);
      axios
        .post('http://localhost:8000/api/campaign-add', {
          title: value.title,
          description: value.description,
          start_date: value.start_date,
          end_date: value.end_date,
          status: value.status,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
        });
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h3"> New Campaign </Typography>

        <RHFTextField
          name="title"
          label="Campaign Name"
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <RHFTextField
          name="description"
          label="Description"
          id="description"
          type="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start date"
                        value={value1}
                        onChange={(newValue) => {
                            setValue1(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        type="date"
                        name="start_date"
                        {...formik.getFieldProps('start_date')}
                    />
                    <DatePicker
                        label="End date"
                        value={value2}

                        renderInput={(params) => <TextField {...params} />}
                        type="date"
                        name="end_date"
                        onChange={formik.handleChange}

                    />
                </LocalizationProvider> */}

        <RHFTextField
          fullWidth
          title="start date"
          type="date"
          name="start_date"
          onChange={formik.handleChange}
          defaultValue={moment(date).format('yyyy-MM-DD')}
        />
        <TextField
          fullWidth
          title="end date"
          type="date"
          name="end_date"
          onChange={formik.handleChange}
          defaultValue={moment(date).format('yyyy-MM-DD')}
        />

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
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={formik.handleChange}
          defaultValue="Processing"
          name="status"
        >
          <MenuItem value={'Not started'}>Not started</MenuItem>
          <MenuItem value={'Processing'}>Processing</MenuItem>
          <MenuItem value={'Finished'}>Finished</MenuItem>
        </Select>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Create
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
