import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container>
            <Typography variant="h6" sx={{ my: 2, color: "primary.main" }}>
                Admin Panel.
                <br /> Data views presented on page
                <Link to="/users">
                    <Button sx={{ ml: 1 }}>Users</Button>
                </Link>
            </Typography>
        </Container>
    );
};

export default Home;
