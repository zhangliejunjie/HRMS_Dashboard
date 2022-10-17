import * as Yup from 'yup';
import { useState, useEffect } from 'react';
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
import { add } from 'lodash';
// ----------------------------------------------------------------------

export default function CampaignUpdateForm({ news }) {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState();

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

  // custome date constraint
  const validate = values => {
    const errors = {};
    console.log(values.start_date);
    // Start date must be from today and before end_date at least 7 days ago
    if (!values.start_date) {
      errors.start_date = 'Start date required';
    } else if (moment(values.start_date).diff(moment(), 'days') < 0) {
      errors.start_date = 'Start date must be from today';
    } else if (moment(values.start_date).diff(moment(values.end_date).subtract(7, 'days'), 'days') > 0) {
      errors.start_date = 'Start date must be before end date at least 7 days ago\nAvalable end date: '
        + moment(values.start_date).add(7, 'days').format('yyyy-MM-DD');
    }

    if (!values.end_date) {
      errors.end_date = 'End date required';
    } else if (moment(values.end_date).diff(moment(), 'days') < 0) {
      errors.end_date = 'End date must be from today';
    } else if (moment(values.end_date).diff(moment(values.start_date).add(7, 'days'), 'days') < 0) {
      errors.end_date = 'End date must be after start date 7 at least';
    }

    return errors;
  };
  // console.log(new Date(today));
  const formik = useFormik({
    initialValues: {
      title: news.title,
      description: news.description,
      status: news.status,
    },
    validate,
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Job title required'),
      description: Yup.string().required('Description required'),
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

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h3"> Update Campaign </Typography>

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
          multiline
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

        <TextField
          fullWidth
          title="start date"
          type="date"
          value={formik.values.start_date}
          name="start_date"
          validate
          onChange={formik.handleChange}
          defaultValue={moment(news.start_date).format('yyyy-MM-DD')}
          error={formik.touched.start_date && Boolean(formik.errors.start_date)}
          helperText={formik.touched.start_date && formik.errors.start_date}
        />
        <TextField
          fullWidth
          title="end date"
          type="date"
          validate
          value={formik.values.end_date}
          name="end_date"
          onChange={formik.handleChange}
          defaultValue={moment(news.end_date).format('yyyy-MM-DD')}
          error={formik.touched.end_date && Boolean(formik.errors.end_date)}
          helperText={formik.touched.end_date && formik.errors.end_date}
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
          // The campaign has finish
          {/* <MenuItem value={'Finished'}>Finished</MenuItem> */}
        </Select>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Update
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}