import { Avatar, Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import React from "react";
import Skeleton from "./Skeleton";

const User = ({ user }) => {
    return (
        <Card sx={{ minWidth: 220, height: 180 }}>
            <CardHeader
                sx={{ pb: 0 }}
                avatar={<Avatar alt={user.name} src="/broken-image.jpg" />}
                title={user.name}
                subheader={user.group}
            />
            <CardContent>
                <Typography sx={{ fontSize: 12, wordBreak: "break-word" }} color="text.secondary">
                    Email
                    <br />
                    <strong>{user.email}</strong>
                </Typography>
                <Typography sx={{ mt: 1, fontSize: 12 }} color="text.secondary">
                    Phone
                    <br />
                    <strong>{user.phone}</strong>
                </Typography>
            </CardContent>
        </Card>
    );
};

const CardView = ({ limit, loading, renderedUsers, filteredUsers }) => {
    return (
        <Box sx={{ backgroundColor: "secondary.main", p: 2, my: 2 }}>
            <Grid container spacing={2}>
                {!renderedUsers.length ? (
                    <Grid item>No users found</Grid>
                ) : loading ? (
                    <Skeleton limit={limit} />
                ) : (
                    renderedUsers.map(user => (
                        <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
                            <User user={user} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default CardView;
