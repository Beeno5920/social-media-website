import React, {useState} from 'react';
import axios from 'axios';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {Redirect, useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    textfield: {
        width: "90%"
    },
    button: {
        margin: theme.spacing(1),
    },
    card: {
        display: 'block',
        width: '50vw',
        transitionDuration: '0.3s',
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}));

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

function CreatePostDialog() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("");
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const history = useHistory();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let token = localStorage.getItem("token")
        if (!token) {
            alert("Please login to create a new post");
            setRedirectToReferrer(true);
            return;
        }

        let header = {headers: {"Authorization": `JWT ${token}`}};

        axios
            .post("createPost/", {"content": text}, header=header)
            .then(res => window.location.reload())
            .catch(err => alert(err));

        handleClose();
    };

    if (redirectToReferrer === true)
        return (<Redirect to="/login" />);

    return (
        <div>
            <Button color="inherit" onClick={handleOpen}>
                New Post
            </Button>
            <Dialog
                maxWidth="80%"
                fullWidth={true}
                onClose={handleClose}
                scroll="paper"
                open={open}
            >
                <DialogContent dividers>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Grid item sm={12}>
                        <form noValidate autoComplete={false} onSubmit={handleSubmit}>
                            <TextField
                                id="content"
                                label="Content"
                                variant="outlined"
                                value={text}
                                onChange={handleChange}
                                fullWidth={true}
                                className={classes.textfield}
                                multiline
                                rows={5}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<SendIcon />}
                                size="large"
                            >
                                Send
                            </Button>
                        </form>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreatePostDialog;