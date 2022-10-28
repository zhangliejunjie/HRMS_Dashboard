import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    DialogActions,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'identityNumber', label: 'ID Number', alignRight: false },
    { id: 'jobName', label: 'Job Name', alignRight: false },
    { id: 'mark', label: 'Mark', alignRight: false },
    { id: 'isVerified', label: 'Verify', alignRight: false },
    { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function Interview() {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = React.useState(false);
    const [decide, setDecide] = React.useState('');
    const [idDecide, setIdDecide] = React.useState('')


    const handleChange = (event) => {
        setDecide(Number(event.target.value) || '');
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const [candidates, setCandidates] = useState([]);
    React.useEffect(() => {
        async function fetchCandidate() {
            const { data } = await axios.get('http://localhost:8000/api/report');
            const candidates = data;
            setCandidates(candidates);
        }
        fetchCandidate();
    }, []);

    const users = [...Array(24)].map((_, index) => ({
        id: candidates[index]?.id,
        avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
        fullname: candidates[index]?.fullname,
        identityNumber: candidates[index]?.identity_number,
        jobName: candidates[index]?.job_name,
        mark: candidates[index]?.avg_mark,
        comment: candidates[index]?.comment,
    }));

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, fullname) => {
        const selectedIndex = selected.indexOf(fullname);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, fullname);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;
    const handleOpenDecide = (id) => {
        setOpen(true)
        setIdDecide(id)
    }


    const handleApprove = (id, data) => {
        console.log(data)
        const approved = async () => {

        }
        setOpen(false)
        approved()

    }
    const handleReject = (id, data) => {
        console.log(data)
        const rejected = async () => {

        }
        setOpen(false)
        rejected()
    }

    return (
        <Page title="Interview">

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Round 3: FINAL RESULT
                    </Typography>
                    {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New User
                    </Button> */}
                </Stack>

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>


                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={users.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, fullname, jobName, mark, identityNumber, avatarUrl, comment } = row;
                                        const isItemSelected = selected.indexOf(fullname) !== -1;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, fullname)} />
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={fullname} src={avatarUrl} />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {fullname}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">{identityNumber}</TableCell>
                                                <TableCell align="left">{jobName}</TableCell>
                                                <TableCell align="left">{mark}</TableCell>
                                                <TableCell variant="contained" align="left">
                                                    <Button variant="contained" onClick={() => handleOpenDecide(id)}>
                                                        Click to decide
                                                    </Button>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <UserMoreMenu />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={USERLIST.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose} sx={{
                width: '100%',
                height: '100%',
            }}>
                <DialogTitle>DECISION</DialogTitle>
                <DialogContent>
                    Do you want to approve {idDecide}
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                        backgroundColor: "red", color: "white",
                        "&:hover": {
                            color: 'red',
                        },
                    }} onClick={() => handleReject(idDecide, "Reject")}>Reject</Button>


                    <Button sx={{
                        backgroundColor: "green", color: "white",
                        "&:hover": {
                            color: 'green',
                        },
                    }} onClick={() => handleApprove(idDecide, "Approve")} >Approve</Button>
                </DialogActions>
            </Dialog>

        </Page >
    );
}


