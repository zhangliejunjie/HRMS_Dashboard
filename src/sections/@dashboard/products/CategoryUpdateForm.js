import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';

// Kiet imported
import { useFormik } from 'formik';
import axios from 'axios';
// api import
import { success } from 'src/store/slice/notificationSlice';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function CategoryUpdateForm({ news, open, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Job name required'),
    description: Yup.string().required('Description required'),
    quantity: Yup.string().required('Quantity required'),
    salary: Yup.string().required('Salary required'),
  });

  const defaultValues = {
    name: '',
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

  const validate = values => {

    const errors = {};

    const formatedName = values.name;
    if (!formatedName.replaceAll(/\s/g, '') && values.name.length > 0) {
      errors.name = 'Form input not accepting only spaces';
    } else if (!isValid(formatedName.replaceAll(/\s/g, ''))) {
      errors.name = 'Please enter valid category name';
    }

    const formatedDescription = values.description;
    if (!formatedDescription.replaceAll(/\s/g, '') && values.description.length > 0) {
      errors.description = 'Form input not accepting only spaces';
    }

    return errors;
  };

  const formik = useFormik({

    initialValues: {
      name: news.name,
      description: news.description,
    },

    validate,

    validationSchema: Yup.object().shape({
      name: Yup
        .string()
        .max(40, () => 'Max length of category name is 40 characters')
        .required('Category name required'),
      description: Yup
        .string()
        .max(512, () => 'Max length of category description is 512 characters')
        .required('Description required'),
    }),

    onSubmit: async (value) => {

      await axios
        .patch('http://localhost:8000/api/category/update', {
          id: news.id,
          name: value.name,
          description: value.description,
          start_date: value.start_date,
          end_date: value.end_date,
          status: value.status,
        })
        .then((res) => {

          onClose();
          dispatch(success("Update successfully"));
        });
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>

        <Typography variant="h3"> {'Update Category'} </Typography>

        <RHFTextField
          name="name"
          label="Category Name"
          id="name"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <RHFTextField
          name="description"
          label="Description"
          id="description"
          type="description"
          multiline
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Update
        </LoadingButton>

      </Stack>
    </FormProvider>
  );
}
