import React, {useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


function LikeButton({ postID }) {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        try {
            let token = localStorage.getItem("token");
            let header = {headers: {"Authorization": `JWT ${token}`}};
            axios
                .post("like/", {"post_id": postID}, header=header)
                .then((res) => console.log(res))
                .catch((res) => console.log(res));
            setLiked(!liked);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Button onClick={handleLike}>
            {!liked ? <FavoriteBorder color={"primary"} /> : <FavoriteIcon color={"primary"} />}
        </Button>
    )
}

export default LikeButton;