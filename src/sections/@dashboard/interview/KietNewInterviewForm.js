import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Chip,
  FormControl,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
// import DoneIcon from '@mui/icons-material/Done';
// import DeleteIcon from '@mui/icons-material/Delete';

// Kiet imported
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import axios from 'axios';
// import { injectIntl, FormattedMessage } from 'react-intl';
// api import
import moment from 'moment/moment';
import { add, set } from 'lodash';
import { useDispatch } from 'react-redux';
import { success } from 'src/store/slice/notificationSlice';
// ----------------------------------------------------------------------

export default function KietNewInterviewForm({ candidate, open, onClose, reloadData }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);

  const styles = (muiBaseTheme) => ({
    card: {
      maxWidth: 300,
      margin: 'auto',
      transition: '0.3s',
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      '&:hover': {
        boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
      },
    },
    media: {
      paddingTop: '56.25%',
    },
    content: {
      textAlign: 'left',
      padding: muiBaseTheme.spacing.unit * 3,
    },
    divider: {
      margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
    },
    heading: {
      fontWeight: 'bold',
    },
    subheading: {
      lineHeight: 1.8,
    },
    avatar: {
      display: 'inline-block',
      border: '2px solid white',
      '&:not(:first-of-type)': {
        marginLeft: -muiBaseTheme.spacing.unit,
      },
    },
  });

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required('Job title required'),
    note: Yup.string().required('Note required'),
    quantity: Yup.string().required('Quantity required'),
    salary: Yup.string().required('Salary required'),
  });

  const defaultValues = {
    title: '',
    note: '',
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
  const slotArr = [...Array(4).keys()];
  const roomArr = [...Array(9).keys()];
  let today = Date.now();
  // custome date constraint
  const validate = (values) => {
    const errors = {};
    console.log(values.date);
    // Date must be from today and before end_date at least 7 days ago
    if (!values.date) {
      errors.date = 'Date required';
    } else if (moment(values.date).diff(moment(), 'days') < 0) {
      errors.date = 'Date must be from today';
    } else if (moment(values.date).day() === 0) {
      errors.date = 'Date can not be Sunday';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      room: '',
      note: '',
      date: moment().format('yyyy-MM-DD'),
      slot: '',
      candidateId: candidate?.id,
    },
    validate,
    validationSchema: Yup.object().shape({
      note: Yup.string()
        .max(512, () => 'Max length of campaign note is 512 characters')
        .required('Note required'),
      slot: Yup.string().required('Slot required'),
      room: Yup.string().required('Room required'),
    }),

    onSubmit: (value) => {
      axios
        .post('http://localhost:8000/api/interview', {
          candidateId: candidate?.id,
          room: value.room,
          week: moment(value.date).week() - 1,
          slot: (moment(value.date).day() - 1) * 4 + value.slot,
        })
        .then((res) => {
          reloadData();
          onClose();
          dispatch(success('Booking interview successfully'));
        });
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h6">Schedule Interview</Typography>
        <Stack spacing={1}>
          <Chip
            sx={{
              fontWeight: 'bold',
            }}
            color="primary"
            variant="outlined"
            label={candidate?.name}
          />
          <Chip
            sx={{
              fontWeight: 'bold',
            }}
            color="primary"
            label={candidate?.role}
            variant="outlined"
          />
        </Stack>

        <Typography variant="caption" pb={2}>
          Please pick a date and choose suitable slot and room for interview meeting
        </Typography>
        <TextField
          label="Date"
          fullWidth
          title="date"
          type="date"
          value={formik.values.date}
          name="date"
          validate
          onChange={formik.handleChange}
          defaultValue={moment(today).format('yyyy-MM-DD')}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Slot</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.slot}
            onChange={formik.handleChange}
            name="slot"
            error={formik.touched.slot && Boolean(formik.errors.slot)}
            helperText={formik.touched.slot && formik.errors.slot}
          >
            {slotArr.map((value) => (
              <MenuItem value={value + 1}>{value + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Room</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.room}
            onChange={formik.handleChange}
            name="room"
            error={formik.touched.room && Boolean(formik.errors.room)}
            helperText={formik.touched.room && formik.errors.room}
          >
            {roomArr.map((value) => (
              <MenuItem value={value + 1}>{value + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <RHFTextField
          name="note"
          label="Note"
          id="note"
          type="note"
          multiline
          value={formik.values.note}
          onChange={formik.handleChange}
          error={formik.touched.note && Boolean(formik.errors.note)}
          helperText={formik.touched.note && formik.errors.note}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
