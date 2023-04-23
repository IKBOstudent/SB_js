import React, { useContext, useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import {
    Box,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
} from "@mui/material";
import { SortContext } from "..";

const User = ({ user, selected, handleSelect }) => {
    const labelId = `enhanced-table-checkbox-${user.id}`;

    return (
        <TableRow
            hover
            onClick={() => handleSelect(user.id)}
            selected={selected}
            role="checkbox"
            key={user.name}
            sx={{ cursor: "pointer" }}
        >
            <TableCell padding="checkbox">
                <Checkbox color="primary" checked={selected} />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                {user.name}
            </TableCell>
            <TableCell align="right">{user.group}</TableCell>
            <TableCell align="right">{user.account}</TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right">{user.phone}</TableCell>
        </TableRow>
    );
};

const headCells = ["Name", "Group", "Account", "Email", "Phone"];

function EnhancedTableHead({ totalCount, selectedCount, handleSelectAll }) {
    const { sort, setSort } = useContext(SortContext);

    const handleChangeSort = i => {
        if (sort.type === i) {
            const newOrder = sort.order === "asc" ? "desc" : "asc";
            setSort(prev => ({ ...prev, order: newOrder }));
        } else {
            setSort(prev => ({ ...prev, type: i }));
        }
    };

    return (
        <TableRow
            sx={{
                backgroundColor: "background.paper",
            }}
        >
            <TableCell padding="checkbox">
                <Checkbox color="primary" onChange={handleSelectAll} checked={totalCount === selectedCount} />
            </TableCell>
            {headCells.map((headCell, i) => (
                <TableCell key={i} align={i === 0 ? "left" : "right"} padding={i === 0 ? "none" : "normal"}>
                    <TableSortLabel active={i === sort.type} direction={sort.order} onClick={() => handleChangeSort(i)}>
                        {headCell}
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    );
}

const TableView = ({ limit, loading, renderedUsers, filteredUsers }) => {
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setSelected([]);
    }, [filteredUsers]);

    const handleSelectAll = e => {
        if (e.target.checked) {
            setSelected(filteredUsers.map(user => user.id));
            return;
        }
        setSelected([]);
    };

    const handleSelect = id => {
        const index = selected.indexOf(id);
        let newSelected = [];

        if (index >= 0) {
            newSelected = selected.filter(val => val !== id);
        } else {
            newSelected = [...selected, id];
        }

        setSelected(newSelected);
    };

    return (
        <Box sx={{ my: 2, border: 1, borderColor: "divider" }}>
            <Toolbar>
                {selected.length ? (
                    <Typography varinat="h6" component="div">
                        {selected.length} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" component="div">
                        Users
                    </Typography>
                )}
            </Toolbar>

            <TableContainer sx={{ backgroundColor: "white", pb: 2 }}>
                <Table stickyHeader sx={{ minWidth: 1000 }} size="small">
                    <TableHead sx={{ backgroundColor: "secondary.main" }}>
                        <EnhancedTableHead
                            totalCount={filteredUsers.length}
                            selectedCount={selected.length}
                            handleSelectAll={handleSelectAll}
                        />
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <Skeleton limit={limit} />
                        ) : (
                            renderedUsers.map((user, index) => (
                                <User
                                    key={user.id}
                                    user={user}
                                    selected={selected.includes(user.id)}
                                    handleSelect={handleSelect}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TableView;
