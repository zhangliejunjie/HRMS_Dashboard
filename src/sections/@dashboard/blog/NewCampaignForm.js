import React from 'react';
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
            title: "",
            description: '',
            start_date: moment(date).format("yyyy-MM-DD"),
            end_date: moment(date).format("yyyy-MM-DD"),
            status: 'Processing',
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('tên không được bỏ trống'),
            description: Yup.string().required('miêu tả không được bỏ trống'),

        }),
        onSubmit: (value) => {
            console.log(value);
            axios.post('http://localhost:8000/api/campaign-add', {
                'title': value.title,
                'description': value.description,
                'start_date': value.start_date,
                'end_date': value.start_date,
                'status': value.status
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    window.location.reload();
                })
                ;

        }
    })


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h1>CREATE CAMPAIGN</h1>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
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
                <InputLabel className="mt-3" id="demo-simple-select-label">Start date</InputLabel>

                <TextField fullWidth title='start date' type="date" name="start_date" onChange={formik.handleChange} defaultValue={moment(date).format("yyyy-MM-DD")} />
                <InputLabel className="mt-3" id="demo-simple-select-label">End date</InputLabel>

                <TextField fullWidth title='end date' type="date" name="end_date" onChange={formik.handleChange} defaultValue={moment(date).format("yyyy-MM-DD")} />

                <InputLabel className="mt-3" id="demo-simple-select-label">Status</InputLabel>
                <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={formik.handleChange}
                    defaultValue="Processing"
                    name='status'

                >
                    <MenuItem value={"Not started"}>Not started</MenuItem>
                    <MenuItem value={'Processing'}>Processing</MenuItem>
                    <MenuItem value={"Finished"}>Finished</MenuItem>
                </Select>

                <Button className='mt-3' color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}
