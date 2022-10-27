import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, Select, MenuItem, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

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

export default function KietNewInterviewForm({ id, open, onClose }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [value1, setValue1] = React.useState(null);
    const [value2, setValue2] = React.useState(null);
    // 


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
    let endDateBoundary = moment().add(7, 'days').toString();
    let yesterday = moment().subtract(1, 'days').toString();
    // custome date constraint
    const validate = values => {
        const errors = {};
        console.log(values.date);
        // Date must be from today and before end_date at least 7 days ago
        if (!values.date) {
            errors.date = 'Date required';
        } else if (moment(values.date).diff(moment(), 'days') < 0) {
            errors.date = 'Date must be from today';
        }

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            room: '',
            note: '',
            date: moment().format('yyyy-MM-DD'),
            slot: '',
            candidateId: id,
        },
        validate,
        validationSchema: Yup.object().shape({
            note: Yup
                .string()
                .max(512, () => 'Max length of campaign note is 512 characters')
                .required('Note required'),
            slot: Yup.number().required('Slot required'),
            room: Yup.number().required('Room required'),
        }),

        onSubmit: (value) => {
            console.log(value);
            axios
                .post('http://localhost:8000/api/interview', {
                    candidateId: id,
                    room: value.room,
                    week: moment(value.day).week() - 1,
                    slot: (moment(value.day).day() - 1) * 4 + value.slot,
                })
                .then((res) => {
                    onClose();
                    dispatch(success("Booking interview successfully"));
                });
        },
    });

    return (
        <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
                <Typography variant="h3">Schedule Interview</Typography>
                {id}
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
                <InputLabel sx={{ m: "0px", p: "0px" }} id="demo-simple-select-label">Slot</InputLabel>
                <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.slot}
                    onChange={formik.handleChange}
                    name="slot"
                >
                    {slotArr.map((value) => (
                        <MenuItem value={value + 1}>{value + 1}</MenuItem>
                    ))}
                </Select>

                <InputLabel sx={{ m: "0px", p: "0px" }} id="demo-simple-select-label">Room</InputLabel>
                <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.room}
                    onChange={formik.handleChange}
                    name="room"
                >
                    {roomArr.map((value) => (
                        <MenuItem value={value + 1}>{value + 1}</MenuItem>
                    ))}
                </Select>

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
