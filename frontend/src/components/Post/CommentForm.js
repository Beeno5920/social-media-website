import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    textfield: {
        width: "90%"
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function CommentForm({ postID }) {
    const classes = useStyles();

    const [text, setText] = useState("");
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let token = localStorage.getItem("token");
        if (text !== "") {
            let header = {headers: {"Authorization": `JWT ${token}`}};
            axios
                .post("createComment/", {"post_id": Number(postID), "content": text}, header=header)
                .then((res) => console.log(res))
                .catch(err => {
                    alert("Please login first");
                    setRedirectToReferrer(true);
                });
        } else {
            alert("Comment cannot be empty");
        }
    };

    if (redirectToReferrer === true)
        return (<Redirect to="/login" />);

    return (
        <Grid item sm={12}>
            <form noValidate autoComplete={false} onSubmit={handleSubmit}>
                <TextField
                    id="comment"
                    label="Comment"
                    variant="outlined"
                    value={text}
                    onChange={handleChange}
                    fullWidth={true}
                    className={classes.textfield}
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
    );
}

export default CommentForm;