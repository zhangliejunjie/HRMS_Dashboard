import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, Divider, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { getReportByInterviewer } from 'src/store/slice/reportSlice';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { useFormik } from 'formik';
import * as Yup from 'yup'

// import { errorHelper } from 'src/utils/tool';

import { useForm, useFieldArray } from 'react-hook-form'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// function createData(id, mark, comment, status, room, slot, week, job_name, phone, resume_url, fullname) {
//     return { id, mark, comment, status, room, slot, week, job_name, phone, resume_url, fullname }
// }

const InterviewerTask = () => {
    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            reportField: [{ mark: 0, comment: "" }]
        }
    });
    const { fields } = useFieldArray({
        control,
        name: 'reportField'
    })
    const { reports_pending, reports_done } = useSelector(state => state.report)
    // const formik = useFormik({
    //     initialValues: {
    //         mark: 0,
    //         comment: ''
    //     },
    //     validationSchema: Yup.object().shape({
    //         mark: Yup.number().min(0, 'Minium mark is 0').max(10, 'Maximum mark is 10'),
    //         comment: Yup.string().max(500, 'Maximum character is 500')
    //     }),
    //     onSubmit: (values) => {
    //         console.log(values);
    //         alert(formInterviewId)
    //     }

    // })
    const { staff } = useSelector(state => state.staff)
    const [formInterviewId, setFormInterviewId] = useState('')
    const dispatch = useDispatch()
    function groupBy(arr, property) {
        return arr.reduce((acc, cur) => {
            acc[cur[property]] = [...acc[cur[property]] || [], cur];
            return acc;
        }, {});
    }
    const reportsGroupByWeek = Object.entries(groupBy(reports_pending, 'week'))
    let reportsGroupByWeek1 = groupBy(reports_pending, 'week')
    console.log(reportsGroupByWeek1);
    // console.log(reportsGroupByWeek);

    useEffect(() => {
        dispatch(getReportByInterviewer(staff.id))
    }, [])
    const onSubmit = (data) => console.log("data", data);
    return (
        <Box>
            <Box>
                <Typography component='h1' variant='h2'>Pending task</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <Stack>
                            {reportsGroupByWeek.map((report, id) => {
                                return (
                                    <Box key={id}>
                                        <Accordion defaultExpanded={true} key={id}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography variant='h3' bgcolor='blueviolet'>WEEK: {report[0]}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>

                                                {/* ===real */}
                                                {/* <form > */}
                                                {/* {
                                                        report[1]?.map((rp, index) => (
                                                            <Accordion defaultExpanded={true} key={rp.id}>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >
                                                                    <Typography fontWeight='bold'>SLOT: {rp.slot}</Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Stack direction='row' justifyContent='space-around'>
                                                                        <div>{rp.id}</div>
                                                                        <Typography>
                                                                            NAME: {rp.fullname}
                                                                        </Typography>
                                                                        <Divider orientation='verticial' variant='middle' />
                                                                        <Typography>
                                                                            ROOM: {rp.room}
                                                                        </Typography>
                                                                        <Divider orientation='verticial' variant='middle' />
                                                                     
                                                                        <TextField placeholder='mark' name='mark' type='number' value={rp.mark}
                                                                            key={rp.id}

                                                                        />
                                                                        <TextField placeholder='comment' name='comment' multiline value={rp.comment} rows={4} sx={{ width: '400px' }} />
                                                                        <Button onClick={() => setFormInterviewId(rp.interviewId)} type='submit'>Submit</Button>
                                                                        
                                                                    </Stack>

                                                                </AccordionDetails>
                                                            </Accordion>
                                                        ))
                                                    } */}
                                                {/* </form> */}
                                                {/* ==== test */}
                                                <form >
                                                    {
                                                        report[1]?.map((rp, index) => (
                                                            <Accordion defaultExpanded={true} key={rp.id}>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >
                                                                    <Typography fontWeight='bold'>SLOT: {rp.slot}</Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Stack direction='row' justifyContent='space-around'>
                                                                        <div>{rp.id}</div>
                                                                        <Typography>
                                                                            NAME: {rp.fullname}
                                                                        </Typography>
                                                                        <Divider orientation='verticial' variant='middle' />
                                                                        <Typography>
                                                                            ROOM: {rp.room}
                                                                        </Typography>
                                                                        <Divider orientation='verticial' variant='middle' />
                                                                        {/* <form  key={rp.id}> */}
                                                                        <TextField placeholder='mark' name='mark' type='number' value={rp.mark}
                                                                            key={rp.id}

                                                                        />
                                                                        <TextField placeholder='comment' name='comment' multiline value={rp.comment} rows={4} sx={{ width: '400px' }} />
                                                                        <Button onClick={() => setFormInterviewId(rp.interviewId)} type='submit'>Submit</Button>
                                                                        {/* </form> */}
                                                                    </Stack>

                                                                </AccordionDetails>
                                                            </Accordion>
                                                        ))
                                                    }
                                                </form>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                )
                            })}

                            {/* {reports_pending.map(rp => (
                            <Box>
                                <Accordion defaultExpanded={true} key={rp.id}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography fontWeight='bold'>SLOT: {rp.slot} - WEEK: {rp.week}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack direction='row' justifyContent='space-around'>
                                            <div>{rp.id}</div>
                                            <Typography>
                                                NAME: {rp.fullname}
                                            </Typography>
                                            <Divider orientation='verticial' variant='middle' />
                                            <Typography>
                                                ROOM: {rp.room}
                                            </Typography>
                                            <Divider orientation='verticial' variant='middle' />
                                            <form onSubmit={formik.handleSubmit} key={rp.id}>
                                                <TextField placeholder='mark' name='mark' type='number' value={rp.mark}
                                                    onChange={(e) => console.log(e.target.value)}
                                                />
                                                <TextField placeholder='comment' name='comment' multiline value={rp.comment} rows={4} sx={{ width: '400px' }}
                                                    onChange={(e) => console.log(e.target.value)}
                                                />
                                                <Button onClick={() => setFormInterviewId(rp.interviewId)} type='submit'>Submit</Button>
                                            </form>
                                        </Stack>

                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        ))} */}



                        </Stack>
                    </Box>
                </form>
            </Box >
            <Divider />
            <Box mt={3}>
                <Typography component='h1' variant='h2'>Result</Typography>
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Resume Url</StyledTableCell>
                                    <StyledTableCell align="right">Week</StyledTableCell>
                                    <StyledTableCell align="right">Slot</StyledTableCell>
                                    <StyledTableCell align="right">Mark</StyledTableCell>
                                    <StyledTableCell align="right">Comment</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reports_done?.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.fullname}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button>
                                                <a href={row.resume_url}>Resume</a>
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.week}</StyledTableCell>
                                        <StyledTableCell align="right">{row.slot}</StyledTableCell>
                                        <StyledTableCell align="right">{row.mark}</StyledTableCell>
                                        <StyledTableCell align="right">{row.comment}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box >
    );
};

export default InterviewerTask;
