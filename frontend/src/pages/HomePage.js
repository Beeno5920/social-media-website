import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import PostList from '../components/Post/PostList'


class HomePage extends Component {

    render() {
        return (
            <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                <PostList />
            </Grid>
        )
    }
}

export default HomePage;