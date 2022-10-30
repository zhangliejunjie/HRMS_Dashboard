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
import { submitReport } from 'src/store/slice/reportSlice';

// import { errorHelper } from 'src/utils/tool';

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

    const { reports_pending, reports_done } = useSelector(state => state.report)
    const notification = useSelector(state => state.notification)
    const res = reports_pending?.map(report => {
        return {
            id: report.id,
            interview_id: report.interview_id,
            mark: report.mark,
            comment: report.comment,
            status: report.status
        }
    })

    const { staff } = useSelector(state => state.staff)
    const [reportSubmitState, setReportSubmitState] = useState(res)

    const dispatch = useDispatch()
    function groupBy(arr, property) {
        return arr.reduce((acc, cur) => {
            acc[cur[property]] = [...acc[cur[property]] || [], cur];
            return acc;
        }, {});
    }
    const reportsGroupByWeek = Object.entries(groupBy(reports_pending, 'week'))


    useEffect(() => {
        dispatch(getReportByInterviewer(staff.id))
        console.log('re-render');
    }, [notification])


    const handleSetReportById = (type, values, id) => {
        if (type === 'mark') {
            let result = [...reportSubmitState]; //<- copy roomRent into result
            result.forEach((x) => { //<- use map on result to find element to update using id
                if (x.id === id) x.mark = Number(values);
            });
            // console.log(another);

            setReportSubmitState(result)

        } else {
            let result = [...reportSubmitState]; //<- copy roomRent into result
            result.forEach((x) => { //<- use map on result to find element to update using id
                if (x.id === id) {
                    x.comment = values
                }

            });

            setReportSubmitState(result)

        }
    }
    const handleSubmit = (id) => {
        const resRep = reportSubmitState.find(rp => rp.id === id)

        const interviewId = resRep.interview_id
        const interviewerId = staff.id
        const mark = resRep.mark
        const comment = resRep.comment

        dispatch(submitReport({ interviewId, interviewerId, mark, comment }))

    }
    return (
        <Box>
            <Box>
                <Typography component='h1' variant='h2'>Pending task</Typography>
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
                                            {
                                                report[1]?.map((rp) => (
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

                                                                <TextField placeholder={rp.mark} name='mark' type='number'
                                                                    key={rp.id}
                                                                    onChange={(e) => handleSetReportById('mark', e.target.value, rp.id)}
                                                                />
                                                                <TextField placeholder={rp.comment} name='comment' multiline rows={4} sx={{ width: '400px' }}
                                                                    onChange={(e) => handleSetReportById('comment', e.target.value, rp.id)}
                                                                />
                                                                <Button type='submit' onClick={() => handleSubmit(rp.id)}>Submit</Button>

                                                            </Stack>

                                                        </AccordionDetails>
                                                    </Accordion>
                                                ))
                                            }

                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            )
                        })}

                    </Stack>
                </Box>

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
