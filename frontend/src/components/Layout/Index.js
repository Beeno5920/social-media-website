import React from 'react';

import Grid from "@material-ui/core/Grid";

import Header from './Header';
import PostList from "../Post/PostList";

function Layout() {
    return (
        <div>
            <div>
            <Header />
            </div>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
                style={{
                marginTop: "5%"
                }}
            >
                <PostList />
            </Grid>
        </div>
    );
}

export default Layout;