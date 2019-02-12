import React from 'react';
import firebase from "firebase";

import {
    Paper,
    Button
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/DeleteOutline';

const DeleteMovie = (id, uid) => {
    if (window.confirm("Confirm Delete?")) {
        const db = firebase.firestore();

        db.settings({timestampsInSnapshots: true});
        db.collection(uid).doc('movies').collection('movieList').doc(id).delete();
    }
}

const MovieItems = (props) => {
    const moviess = props.movies || [];
    if (moviess.length > 0) {
        return moviess.map((movie, i) => {
            const dbId = Object.keys(movie)[0];
            return (
                <li id={dbId} key={dbId}>
                    <Paper
                        style={{
                            margin: '0',
                            padding: '.5rem .5rem .5rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#222',
                            borderRadius: '0'
                        }}
                    >
                        <span style={{flexGrow: 1}}>{movie[dbId].title}</span>
                        {
                            props.type === 'all' &&
                            <Button onClick={()=>{ DeleteMovie(dbId, props.userInfo.uid)}} style={{minWidth: 'initial'}}><DeleteIcon /></Button>
                        }
                    </Paper>
                </li>
            )
        });
    } else {
        return (<span>...</span>)
    }
}

const MovieList = (props) => {
    return (
        <ol id='movie-list'>
            <MovieItems movies={props.movies} type={props.type} userInfo={props.userInfo} />
        </ol>
    )
}

export default MovieList;
