import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#1e88e5' }, // Purple and green play nicely together.
        secondary: { main: '#ffd54f' }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true },
});

export default theme;