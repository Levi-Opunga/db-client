import * as React from "react";
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {allUsers, editUser} from "../api/client";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {deleteUsers} from "../api/client";
import Router from "next/router";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));


export default function CustomizedTables(props) {
    const [theid, settheid] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [rows, setRows] = useState([]);
    const [unFiltered, setUnFiltered] = useState([]);
    const [phrase, setphrase] = useState("");
    let [currentUser, setcurrentUser] = useState("");
    const [deletions, setdeletions] = useState();
    const [update, setUpdate] = useState(false);
    const [editname, seteditname] = useState("")

    const handSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let searchPhrase = data.get("word");
        console.log(searchPhrase);
        setRows(rows.filter((rows) => rows.name.includes(searchPhrase)));
    };

    function handleClick(event) {
        let id = event.target.id;
        deleteUsers(id).then(r => console.log(r));
        setdeletions(true);
    }

    useState(() => update, [update])

    const handleChange = (event) => {
        event.preventDefault();
        setphrase(event.target.value);
        setRows(unFiltered);
        if (phrase !== "") {
            setRows(rows.filter((rows) => rows.name.toLowerCase().includes(phrase.toLowerCase())));
            if (rows.length === 0) {
                setRows(unFiltered);
            }
        } else {
            setRows(unFiltered);
        }
    };
    useEffect(() => setcurrentUser(JSON.parse(localStorage.getItem("ApplicationUser"))), [])

    useEffect(() => {
        allUsers().then((data) => {
            setRows(data);
            setcurrentUser(JSON.parse(localStorage.getItem("ApplicationUser")));
            setUnFiltered(data);
            setdeletions(false)
        });

        setFetching(false);
    }, [deletions]);

    useEffect(() => {
        allUsers().then((data) => {
            setRows(data);
            setcurrentUser(JSON.parse(localStorage.getItem("ApplicationUser")));
            setUnFiltered(data);
        });
    }, [update])

    if (fetching) {
        return <h1>Fetching .... </h1>;
    }

    function handleUpdate(event) {
        settheid(event.target.id);
        setUpdate(true);
        console.log(update);
        // localStorage.setItem("updateUser", JSON.stringify({id: theid}));
        // Router.push("/updateuser")

    }

    function handleSave(event) {
        event.preventDefault();
        setUpdate(false);

    }


    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log("tryuiop", data.get("uname"))
        let user = {name: data.get("uname"), admin: Boolean(data.get("admin")), id: theid};
        console.log(user);
        editUser(user);
        setUpdate(false)
        Router.push("/users");
        //  editUser({name: data.get("uname"),})
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={handSubmit}
                sx={{
                    "& > :not(style)": {m: 1, width: "62ch"},
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="filled-basic"
                    fullWidth
                    value={phrase}
                    onChange={handleChange}
                    label="Search by Name"
                    variant="filled"
                    name="word"
                />
                <Button
                    type="submit"
                    size="small"
                    style={{
                        maxWidth: "90px",
                        maxHeight: "90px",
                        minWidth: "30px",
                        minHeight: "30px",
                    }}
                    variant="contained"
                    sx={{mb: 0, mt: 0}}
                    endIcon={<SearchIcon/>}
                >
                    Search
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <form onSubmit={handleSubmit}>
                    <Table sx={{minWidth: 1100}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>UserName</StyledTableCell>
                                <StyledTableCell>Privillege</StyledTableCell>
                                {currentUser.admin ? (
                                    <StyledTableCell align="right">
                                        {currentUser.admin}
                                    </StyledTableCell>
                                ) : null}
                            </TableRow>
                        </TableHead>
                        {/*{update ? (<TableBody>*/}
                        {/*    {rows.map((row) => (*/}
                        {/*        <StyledTableRow key={row.name}>*/}
                        {/*            <StyledTableCell component="th" scope="row">*/}
                        {/*                <input type="text" value={editname} onChange={nameChange}></input>*/}
                        {/*            </StyledTableCell>*/}
                        {/*            <StyledTableCell component="th" scope="row">*/}
                        {/*                {row.admin ? "Admin" : "Normal User"}*/}
                        {/*            </StyledTableCell>*/}
                        {/*            /!*<h1>{JSON.stringify(currentUser)}</h1>*!/*/}
                        {/*            {currentUser.admin ? (*/}
                        {/*                <StyledTableCell align="right">*/}
                        {/*                    <ul style={{margin: -11, padding: 0}}>*/}
                        {/*                        <ul style={{margin: 0, padding: 0}}>*/}
                        {/*                            <Button*/}
                        {/*                                id={row.id}*/}
                        {/*                                onClick={handleSave}*/}
                        {/*                                size="small"*/}
                        {/*                                type="submit"*/}
                        {/*                                width="auto"*/}
                        {/*                                variant="contained"*/}
                        {/*                                sx={{mt: 0, mb: 1, pt: 0, pb: 0}}*/}
                        {/*                            >save*/}
                        {/*                            </Button>*/}
                        {/*                        </ul>*/}
                        {/*                        /!*<ul style={{margin: 0, padding: 0}}>*!/*/}
                        {/*                        /!*    <Button*!/*/}
                        {/*                        /!*        id={row.id}*!/*/}
                        {/*                        /!*        size="small"*!/*/}
                        {/*                        /!*        color="error"*!/*/}
                        {/*                        /!*        onClick={handleClick}*!/*/}
                        {/*                        /!*        variant="contained"*!/*/}
                        {/*                        /!*        sx={{mt: 0, mb: 0, pt: 0, pb: 0}}*!/*/}
                        {/*                        /!*    >*!/*/}
                        {/*                        /!*        Delete*!/*/}
                        {/*                        /!*    </Button>*!/*/}
                        {/*                        /!*</ul>*!/*/}
                        {/*                    </ul>*/}
                        {/*                </StyledTableCell>*/}
                        {/*            ) : null}*/}
                        {/*        </StyledTableRow>*/}
                        {/*    ))}*/}
                        {/*</TableBody>) : */}
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.firstName}>
                                    <StyledTableCell component="th" scope="row">
                                        {update ? <input type="text" name="uname"
                                                         placeholder={row.name}></input> : (row.name)}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {update ? <input type="text" name="admin"
                                                         placeholder={row.admin.toString()}></input> : (row.admin ? "Admin" : "Normal User")}
                                    </StyledTableCell>
                                    {/*<h1>{JSON.stringify(currentUser)}</h1>*/}
                                    {currentUser.admin ? (
                                        <StyledTableCell align="right">
                                            {update ?
                                                (<ul style={{margin: 0, padding: 0}}>
                                                    <Button
                                                        id={row.id}
                                                        size="small"
                                                        type="submit"
                                                        width="auto"
                                                        variant="contained"
                                                        sx={{mt: 0, mb: 1, pt: 0, pb: 0}}
                                                    >save
                                                    </Button>
                                                </ul>)
                                                : <ul style={{margin: -11, padding: 0}}>
                                                    <ul style={{margin: 0, padding: 0}}>
                                                        <Button
                                                            id={row.id}
                                                            onClick={handleUpdate}
                                                            size="small"
                                                            type="submit"
                                                            width="auto"
                                                            variant="contained"
                                                            sx={{mt: 0, mb: 1, pt: 0, pb: 0}}
                                                        >Update
                                                        </Button>
                                                    </ul>
                                                    <ul style={{margin: 0, padding: 0}}>
                                                        <Button
                                                            id={row.id}
                                                            size="small"
                                                            color="error"
                                                            onClick={handleClick}
                                                            variant="contained"
                                                            sx={{mt: 0, mb: 0, pt: 0, pb: 0}}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </ul>
                                                </ul>}
                                        </StyledTableCell>
                                    ) : null}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                        {/*}*/}
                    </Table>
                </form>
            </TableContainer>
        </>
    );
}
