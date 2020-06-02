import React, { Component } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import PostDialog from "./PostDialog";


const styles = {
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
  };

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        this.getAllPostsData();
    }

    getAllPostsData = () => {
        axios
        .get("allPosts")
        .then((res) => this.setState({posts: res.data}))
        .catch(err => console.log(err));
        console.log(this.state.posts);
    }

    render() {
        return (
                this.state.posts.map(
                    (post) =>
                    <Grid item xs={12}>
                        <PostDialog postData={post} />
                    </Grid>
                )
        );
    }
}

export default PostList;