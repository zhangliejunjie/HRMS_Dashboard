import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
// New form Kiet
import { useFormik } from 'formik';
import axios from 'axios';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { success } from 'src/store/slice/notificationSlice';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function NewJobForm() {

  const navigate = useNavigate();

  const params = useParams();
  const meow = params.choosedCampaign;

  const dispatch = useDispatch();

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required('Job title required'),
    description: Yup.string().required('Description required'),
    quantity: Yup.string().required('Quantity required'),
    salary: Yup.string().required('Salary required'),
    email: Yup.string().required('Last name required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    title: 'Mùa thu',
    description: 'Mùa thu',
    email: 'Mùa thu',
    password: 'Mùa thu',
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
    navigate('/blog', { replace: true });
  };
  // New form Kiet
  let date = Date.now();
  const formik = useFormik({
    initialValues: {
      // name: '',
      // description: '',
      // salary: '',
      // quantity: '',
      // start_date: moment(date).format('yyyy-MM-DD'),
      // end_date: moment(date).format('yyyy-MM-DD'),
      "name": "ReactJS Intern",
      "description": "dont have any idea what is going on",
      "salary": "900",
      "quantity": "3",
      "start_date": "2022-12-28",
      "end_date": "2022-12-29",
      "status": "Hiring",
      "experience": "Intern",
      "categoryId": "CA-001",
      "campaignId": "CP-001"
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('Job name required'),
      description: Yup.string().required('Description required'),
      salary: Yup.string().required('Salary required'),
      quantity: Yup.number().required('Quantity required'),
    }),
    onSubmit: (value) => {
      console.log("Ngũ cung")
      console.log(value);
      axios
        .post('http://localhost:8000/api/job/add', {
          // name: "value.name",
          // description: "value.description",
          // salary: "value.salary",
          // quantity: "value.quantity",
          // start_date: "2022-12-28",
          // end_date: "2022-12-29",
          // status: "Hiring",
          // experience: "Intern",
          // categoryId: "CA-001",
          // campaignId: "CP-001"
          "name": "ReactJS Intern",
          "description": "dont have any idea what is going on",
          "salary": "900",
          "quantity": "3",
          "start_date": "2022-12-28",
          "end_date": "2022-12-29",
          "status": "Hiring",
          "experience": "Intern",
          "categoryId": "CA-001",
          "campaignId": "CP-001"
        })
        .then((res) => {
          dispatch(success("Create job successfully"));
        })
        .catch((error) => console.log(error));
    },
  });

  //gọi api categories để add jobs
  const [categories, setCategories] = useState([]);
  React.useEffect(() => {
    async function fetchCategory() {
      const data = await axios.get('http://localhost:8000/api/category');
      const { categories } = data.data;
      console.log(params);
      console.log(categories);
      setCategories(categories);
    }
    fetchCategory();
  }, []);

  const renderCategory = () => {
    return categories.map((value) => {
      return <MenuItem value={value.id}>{value.name}</MenuItem>;
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h3"> Campaign name </Typography>
        <RHFTextField
          name="name"
          label="Job Title"
          id="name"
          //   id, name, description, salary, quantity, start_date, end_date, status, experience, isRemote, Category_id, Campaign_id
          // label="Name"
          type="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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

        <RHFTextField
          name="salary"
          label="Salary per month"
          id="salary"
          type="salary"
          value={formik.values.salary}
          onChange={formik.handleChange}
          error={formik.touched.salary && Boolean(formik.errors.salary)}
          helperText={formik.touched.salary && formik.errors.salary}
        />

        <RHFTextField
          name="quantity"
          label="Quantity"
          id="standard-number"
          // type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
        />

        {/* <RHFTextField name="email" label="Email address" />

        <RHFTextField
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
