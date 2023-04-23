import React from "react";
import { Skeleton as MUISkeleton, TableCell, TableRow } from "@mui/material";

const Skeleton = ({ limit }) => {
    return [...Array(limit)].map((item, i) => (
        <TableRow key={i} sx={{ cursor: "pointer" }}>
            <TableCell padding="checkbox">
                <MUISkeleton variant="rectangular" height={24} width={24} />
            </TableCell>
            {[...Array(5)].map((val, i) => (
                <TableCell key={i} padding={i === 0 ? "none" : "normal"}>
                    <MUISkeleton variant="rectangular" height={24} />
                </TableCell>
            ))}
        </TableRow>
    ));
};

export default Skeleton;
