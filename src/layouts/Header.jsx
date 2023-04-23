import { AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <AppBar position="static" color="primary">
            <Container>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        <Link to="/">
                            <Button sx={{ my: 2, color: "white" }}>HOME</Button>
                        </Link>
                        <Link to="/users">
                            <Button sx={{ my: 2, color: "white" }}>USERS</Button>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton>
                            <Avatar alt="Admin" src="/broken-image.jpg" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
