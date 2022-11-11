import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';

// Kiet imported
import { useFormik } from 'formik';
import axios from 'axios';
import moment from 'moment/moment';
import { success } from 'src/store/slice/notificationSlice';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function CampaignUpdateForm({ news, open, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }

  function isValid(string) {
    var re = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{2,}$/g // regex here
    return re.test(removeAscent(string))
  }

  // custome date constraint
  const validate = values => {

    const errors = {};

    const formatedName = values.title;
    if (!formatedName.replaceAll(/\s/g, '') && values.title.length > 0) {
      errors.title = 'Form input not accepting only spaces';
    } else if (!isValid(formatedName.replaceAll(/\s/g, ''))) {
      errors.title = 'Please enter valid campaign title';
    }

    const formatedDescription = values.description;
    if (!formatedDescription.replaceAll(/\s/g, '') && values.description.length > 0) {
      errors.description = 'Form input not accepting only spaces';
    }

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
      start_date: news.start_date,
      end_date: news.end_date,
    },

    validate,

    validationSchema: Yup.object().shape({
      title: Yup
        .string()
        .max(40, () => 'Max length of campaign title is 40 characters')
        .required('Campaign title required'),
      description: Yup
        .string()
        .max(512, () => 'Max length of campaign description is 512 characters')
        .required('Description required'),
    }),

    onSubmit: async (value) => {
      console.log(value);
      await axios
        .patch('http://localhost:8000/api/campaign/update', {
          id: news.id,
          title: value.title,
          description: value.description,
          start_date: value.start_date,
          end_date: value.end_date,
          status: value.status,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          onClose();
          dispatch(success('Update successfully'));
        });
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h3"> {'Update Campaign'} </Typography>
        <RHFTextField
          name="title"
          label="Campaign Name"
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <RHFTextField
          fullWidth
          label="End date"
          title="end date"
          type="date"
          validate
          value={formik.values.end_date}
          name="end_date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          defaultValue={moment(news.end_date).format('yyyy-MM-DD')}
          error={formik.touched.end_date && Boolean(formik.errors.end_date)}
          helperText={formik.touched.end_date && formik.errors.end_date}
        />

        <FormControl>
          <InputLabel
            id="demo-simple-select-label">Status</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue="Processing"
            name="status"
          >
            <MenuItem value={'Not started'}>Not started</MenuItem>
            <MenuItem value={'Processing'}>Processing</MenuItem>
          </Select>
        </FormControl>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Update
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
