import { createMuiTheme } from '@material-ui/core/styles';

export function createTheme(color, secondaryColor, themeLight){
    return createMuiTheme({
        palette: {
            primary: color,
            secondary: secondaryColor,
            type: themeLight
        },
        typography: { useNextVariants: true },
    });
}