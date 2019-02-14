import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1e88e5',
        },
        secondary: {
            main: '#ffd54f',
        },
    },
    status: {
        danger: 'orange',
    },
});
