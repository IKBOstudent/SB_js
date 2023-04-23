import { Grid, Skeleton as MUISkeleton } from "@mui/material";
import React from "react";

const Skeleton = ({ limit }) => {
    return [...Array(limit)].map((val, i) => (
        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <MUISkeleton variant="rounded" sx={{ minWidth: 220, height: 180 }} />
        </Grid>
    ));
};

export default Skeleton;
