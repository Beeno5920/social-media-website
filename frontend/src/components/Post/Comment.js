import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    // ...theme,
    commentImage: {
        maxWidth: '100%',
        width: 30,
        height: 30,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        width: '85vw',
        padding: 25,
        margin: 10,
    }
}));

function Comments({ commentData }) {
    const classes = useStyles();

    return (
        <Grid Container>
            {commentData.map((comment) => {
                return(
                    <Fragment key={comment.timestamp}>
                        <Grid sm={12}>
                            <Grid Container>
                                <Grid item sm={9}>
                                    <Card className={classes.commentData}>
                                        <div style={{ display: "flex", alignItems: 'baseline' }}>
                                            <img
                                                src={"https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg"}
                                                alt="comment"
                                                className={classes.commentImage}
                                            />
                                            &nbsp;
                                            &nbsp;
                                            <Typography
                                                variant="body1"
                                                component={Link}
                                                to={`/users/${comment.owner}`}
                                                color="primary"
                                            >
                                                {comment.owner}
                                            </Typography>
                                            &nbsp;
                                            <Typography variant="caption" color="textSecondary">
                                                {comment.timestamp.substr(0, 10)}
                                                &nbsp;
                                                {comment.timestamp.substr(11, 5)}
                                            </Typography>
                                        </div>
                                        <Typography variabnt="body1">
                                            {comment.content}
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fragment>
                );
            })}
        </Grid>
    );
}

export default Comments;