import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { Box, Container, IconButton, Tab, TablePagination, Tabs, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardView from "./CardView";
import TableView from "./TableView";
import TilesView from "./TilesView";
import { debounce } from "lodash";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

const viewComponents = [
    { view: TableView, name: "Table View" },
    { view: CardView, name: "Card View" },
    { view: TilesView, name: "Tiles View" },
];

const ViewComponentMatch = props => {
    const Component = viewComponents[props.type].view;
    return <Component {...props} />;
};

const TablePaginationActions = props => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = event => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = event => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
};

const limitOptions = [12, 48];

export const SortContext = createContext();

const Users = () => {
    const [viewType, setViewType] = useState(0);

    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [renderedUsers, setRenderedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // page limits
    const [limit, setLimit] = useState(limitOptions[0]);
    const [page, setPage] = useState(0);
    const [pageUpdate, setPageUpdate] = useState(0);

    // item search
    const [searchValue, setSearchValue] = useState("");
    const [searchValueUpdate, setSearchValueUpdate] = useState(false);

    // items sort (for table view)
    const [sort, setSort] = useState({ type: 0, order: "asc" });
    const sortValues = ["name", "group", "account", "email", "phone"];

    const fetchUsers = async () => {
        try {
            setLoading(true);
            let url = `/users`;
            const response = await axios.get(url);
            if (response.data) {
                setAllUsers(response.data);
                setFilteredUsers(response.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(
            [...filteredUsers].sort(
                (a, b) =>
                    (sort.order === "asc" ? -1 : 1) * a[sortValues[sort.type]].localeCompare(b[sortValues[sort.type]])
            )
        );
    }, [sort]);

    useEffect(() => {
        setPage(0);
        setLimit(limitOptions[0]);
        setSearchValue("");
        setSort({ type: 0, order: "asc" });
        setSearchValueUpdate(prev => !prev);
    }, [viewType]);

    useEffect(() => {
        setRenderedUsers(filteredUsers.slice(page * limit, (page + 1) * limit));
    }, [filteredUsers, pageUpdate, limit]);

    useEffect(() => {
        setPage(0);
        setLimit(limitOptions[0]);
        setFilteredUsers(allUsers.filter(item => String(item.name).toLowerCase().includes(searchValue.toLowerCase())));
    }, [searchValueUpdate]);

    const debounceSearch = useMemo(
        () =>
            debounce(() => {
                setSearchValueUpdate(prev => !prev);
            }, 300),
        []
    );

    const debounceChangePage = useMemo(
        () =>
            debounce(() => {
                setPageUpdate(prev => !prev);
            }, 200),
        []
    );

    return (
        <Container>
            <Box>
                <Tabs
                    value={viewType}
                    onChange={(e, val) => setViewType(val)}
                    sx={{ my: 2, borderBottom: 1, borderColor: "divider" }}
                >
                    {viewComponents.map(item => (
                        <Tab key={item.name} label={item.name} />
                    ))}
                </Tabs>

                <Box sx={{ display: "flex", pt: 2, justifyContent: "flex-end" }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchValue}
                        onChange={e => {
                            setSearchValue(e.target.value);
                            debounceSearch();
                        }}
                    />
                </Box>

                <SortContext.Provider value={{ sort, setSort }}>
                    {viewComponents.map((item, i) =>
                        i === viewType ? (
                            <Box key={item.name} sx={{ width: "100%" }}>
                                <ViewComponentMatch
                                    type={i}
                                    virtualized={limit === -1}
                                    limit={limit}
                                    loading={loading}
                                    renderedUsers={renderedUsers}
                                    filteredUsers={filteredUsers}
                                />
                            </Box>
                        ) : null
                    )}
                </SortContext.Provider>

                <Box
                    sx={{
                        display: "flex",
                        backgroundColor: "secondary.main",
                        justifyContent: "flex-end",
                        my: 2,
                        pr: 1,
                    }}
                >
                    {viewType === 2 ? null : (
                        <TablePagination
                            component="div"
                            count={filteredUsers.length}
                            rowsPerPageOptions={limitOptions}
                            page={page}
                            onPageChange={(e, val) => {
                                setPage(val);
                                debounceChangePage();
                            }}
                            rowsPerPage={limit}
                            onRowsPerPageChange={e => {
                                setLimit(e.target.value);
                                setPage(0);
                            }}
                            ActionsComponent={TablePaginationActions}
                        />
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default Users;
