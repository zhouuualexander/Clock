import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Copyright from '../Copyright/Copyright';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#000000",
        height: "100vh",
    },
});
let date = new Date();
let originalHour = date.getHours();
let originalMinute = date.getMinutes();
let originalSecond = date.getSeconds();

const Clock = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const typographyProps = {
        variant: isSmallScreen ? "h4" : isMediumScreen ? "h2" : "h1"

    };
    const [isUpdate, setIsUpdate] = useState(0);
    const [hour, setHour] = useState(originalHour);
    const [minute, setMinute] = useState(originalMinute);
    const [second, setSecond] = useState(originalSecond);
    let leadingSecondZero = null;
    let leadingMinuteZero = null;
    let leadingHourZero = null;
    if (second < 10) {
        leadingSecondZero = "0";
    }
    if (minute < 10) {
        leadingMinuteZero = "0";
    }
    if (hour < 10) {
        leadingHourZero = "0";
    }
    useEffect(() => {
        date = new Date();
        setInterval(() => {
            setHour(() => date.getHours());
            setMinute(() => date.getMinutes());
            setSecond(() => date.getSeconds());
            setIsUpdate((isUpdate) => isUpdate + 1);
        }, 500);
    }, [isUpdate, hour, minute, second]);

    const classes = useStyles();
    return (<React.Fragment>
        <Container disableGutters={true} maxWidth={false}>
            <Typography className={classes.root} component="div"
                align="center" style={{ paddingTop: "40vh" }}
            >
                <Typography component="div">
                    <Typography {...typographyProps} component="h1" style={{
                        fontFamily: "pressStart2P", color: "#19c5ec"
                    }}>
                        {leadingHourZero + hour}:{leadingMinuteZero + minute}:{leadingSecondZero + second}
                    </Typography>
                </Typography>
                <Copyright />
            </Typography>
        </Container>

    </React.Fragment >);
};


export default Clock;