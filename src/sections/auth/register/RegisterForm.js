// import * as Yup from 'yup';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // form
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// // @mui
// import { Stack, IconButton, InputAdornment, Typography } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// // components
// import Iconify from '../../../components/Iconify';
// import { FormProvider, RHFTextField } from '../../../components/hook-form';
// import * as React from 'react';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// // ----------------------------------------------------------------------

// export default function RegisterForm() {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const RegisterSchema = Yup.object().shape({
//     title: Yup.string().required('Job title required'),
//     description: Yup.string().required('Description required'),
//     quantity: Yup.string().required('Quantity required'),
//     salary: Yup.string().required('Salary required'),
//     // email: Yup.string().required('Last name required'),
//     // password: Yup.string().required('Password is required'),
//   });

//   const defaultValues = {
//     title: '',
//     description: '',
//     email: '',
//     password: '',
//   };

//   const methods = useForm({
//     resolver: yupResolver(RegisterSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = async () => {
//     navigate('/dashboard', { replace: true });
//   };

//   return (
//     <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//       <Stack spacing={3}>
//       <Typography variant="h3"> Campaign name </Typography>
//           <RHFTextField name="title" label="Job Title" />
//           <RHFTextField name="description" label="Description" />

//           <RHFTextField name="quantity" label="Quantity" type="number"/>
//           <RHFTextField name="salary" label="Salary per month" type="number" />
//         {/* <RHFTextField name="email" label="Email address" />

//         <RHFTextField
//           name="password"
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
//                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         /> */}

//         <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
//          Create
//         </LoadingButton>
//       </Stack>
//     </FormProvider>
//   );
// }
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment/moment';
import { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));



export default function NewCampaignForm() {
  let date = Date.now();


  // useEffect(() => {
  //     console.log(moment(date).format("yyyy-MM-DD"));
  // }, [])




  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      salary: '',
      quantity: '',
      start_date: moment(date).format("yyyy-MM-DD"),
      end_date: moment(date).format("yyyy-MM-DD"),
      category: '',
      campaign: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('tên không được bỏ trống'),
      description: Yup.string().required('miêu tả không được bỏ trống'),
      salary: Yup.string().required('lương không được bỏ trống'),
      quantity: Yup.number().required('số lượng không được bỏ trống'),

    }),
    onSubmit: (value) => {
      console.log(value);
      axios.post('http://localhost:8000/api/job-add', {
        'name': value.name,
        'description': value.description,
        "salary": value.salary,
        'quantity': value.quantity,
        'start_date': value.start_date,
        'end_date': value.start_date,
        'experience': value.experience,
        'category': value.category,
        'campaign': value.campaign
      })
        .then(res => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
        })
        ;

    }
  })

  //gọi api campaign để add jobs
  const [campaigns, setCampaigns] = useState([]);
  React.useEffect(() => {
    async function fetchCampaign() {
      const data = await axios.get("http://localhost:8000/api/campaign");
      const { campaigns } = data.data;

      console.log(campaigns);
      setCampaigns(campaigns);
    }
    fetchCampaign();
  }, [])

  const renderCampaigns = () => {
    return campaigns.map((value) => {
      return <MenuItem value={value.id}>{value.title}</MenuItem>

    })
  }

  //gọi api categories để add jobs
  const [categories, setCategories] = useState([]);
  React.useEffect(() => {
    async function fetchCategory() {
      const data = await axios.get("http://localhost:8000/api/category");
      const { categories } = data.data;

      console.log(categories);
      setCategories(categories);
    }
    fetchCategory();
  }, [])

  const renderCategory = () => {
    return categories.map((value) => {
      return <MenuItem value={value.id}>{value.name}</MenuItem>
    })
  }


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1>CREATE JOB</h1>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          type="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          fullWidth
          id="standard-number"
          name="salary"
          label="Salary"
          type="salary"

          value={formik.values.salary}
          onChange={formik.handleChange}
          error={formik.touched.salary && Boolean(formik.errors.salary)}
          helperText={formik.touched.salary && formik.errors.salary}
        />
        <TextField
          fullWidth
          id="standard-number"
          name="quantity"
          label="Quantity"
          type="number"

          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
        />




        <InputLabel className="mt-3" id="demo-simple-select-label">Start date</InputLabel>

        <TextField fullWidth title='start date' type="date" name="start_date" onChange={formik.handleChange} defaultValue={moment(date).format("yyyy-MM-DD")} />
        <InputLabel className="mt-3" id="demo-simple-select-label">End date</InputLabel>

        <TextField fullWidth title='end date' type="date" name="end_date" onChange={formik.handleChange} defaultValue={moment(date).format("yyyy-MM-DD")} />


        <InputLabel className="mt-3" id="demo-simple-select-label">Choose 1 campaign</InputLabel>

        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={formik.handleChange}
          name='campaign'
        >
          {renderCampaigns()}
        </Select>
        <InputLabel className="mt-3" id="demo-simple-select-label">Choose 1 category</InputLabel>

        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={formik.handleChange}
          name='category'
        >
          {renderCategory()}
        </Select>



        <Button className='mt-3' color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

