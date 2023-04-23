import React from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import { Virtuoso } from "react-virtuoso";

const groups = ["Finance", "Management", "Development", "Testing", "Design"];

const User = ({ user }) => {
    return (
        <ListItem alignItems="flex-start" sx={{ mt: 1, border: 2, borderColor: "divider" }}>
            <ListItemAvatar>
                <Avatar alt={user.name} src="/broken-image.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={user.name}
                secondary={
                    <Typography component="span" variant="body2" color="text.primary">
                        {user.email}
                    </Typography>
                }
            />
        </ListItem>
    );
};

const TilesView = ({ loading, filteredUsers }) => {
    return (
        <Box sx={{ backgroundColor: "secondary.main", p: 2, my: 2 }}>
            <Grid container spacing={2}>
                {!filteredUsers.length ? (
                    <Grid item>No users found</Grid>
                ) : (
                    groups.map((title, i) => {
                        const cardUsers = filteredUsers.filter(user => user.group === title);
                        if (cardUsers.length > 0) {
                            return (
                                <Grid key={i} item xs={12} sm={6} md={4}>
                                    <Card sx={{ minWidth: 220 }}>
                                        <CardContent sx={{ mb: 0 }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {title}
                                            </Typography>
                                            <Box>
                                                <Virtuoso
                                                    style={{ height: 300, minWidth: 220 }}
                                                    data={cardUsers}
                                                    itemContent={(index, user) => <User user={user} />}
                                                />
                                            </Box>
                                            <CardActions sx={{ pt: 4 }}>
                                                <Button variant="contained">Add user</Button>
                                            </CardActions>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        }
                        return null;
                    })
                )}
            </Grid>
        </Box>
    );
};

export default TilesView;
