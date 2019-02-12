import React, { Component } from 'react';
import firebase from "firebase";

import {
    Button,
    Dialog,
    DialogTitle,
    Grid,
    Paper
} from '@material-ui/core';

import Input from './subcmp/input.js';

const SearchResult = (props) => {
    if (props.results.length > 0) {
        return (
            props.results.map((result, i) => {
                return (
                    <li key={i}>
                        <Paper
                            style={{
                                fontSize: '1.2rem',
                                color: '#222',
                                padding: '.5rem',
                                borderRadius: '0',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                props.selectMovie(result);
                            }}
                        >
                            {result.title} {result.release_date.substr(0,4)}
                        </Paper>
                    </li>
                )
            })
        )
    } else {
        return (' ');
    }
}

const SearchResults = (props) => {
    return (
        <div style={{maxHeight: '200px', overflow: 'scroll'}}>
            <ul style={{
                    listStyleType: 'none',
                    margin: '.25rem',
                    padding: '0'
                }}>
                <SearchResult
                    results={props.results || []}
                    selectMovie={props.selectMovie}
                />
            </ul>
        </div>
    )
}


class AddMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movieTitle: '',
            notes: '',
            results: []
        }
    }
    handleClose(props) {
    }
    selectMovie(movie) {
        this.setState({
            selectedMovie: movie,
            results: []
        })
    }
    addMovie() {
        const db = firebase.firestore();

        db.settings({timestampsInSnapshots: true});

        db.collection(this.props.userInfo.uid).doc('movies').collection('movieList').add({
            title: this.state.movieTitle,
            metaData: this.state.selectedMovie,
            notes: this.state.notes
        });

        this.props.toggleAddMovie();
    }
    handleInputChange(e, key) {
        let state = {};
        state[key] = e.target.value;

        if (key === 'movieTitle') {
            fetch('https://api.themoviedb.org/3/search/movie?query=' + encodeURI(e.target.value) + '&api_key=856ceac5ed160110ed0a75afeaa9f023')
            .then(data => data.json())
            .then((response) => {
                if (response.results && response.results.length) {
                    this.setState({
                        results: response.results
                    })
                } else {
                    this.setState({
                        results: []
                    })
                }

            });
        }

        this.setState(state);
    }
    render() {
        return (
            <Dialog
                open={true}
                onClose={() => { this.handleClose(this.props)}}
            >
                <Grid container direction="column"
                    style={{
                        padding: '1rem',
                        width: '60vw'
                    }}>
                    <Grid item>
                        <DialogTitle
                            style={{paddingLeft: '0'}}
                        >
                            Add Movie
                        </DialogTitle>
                        {
                            this.state.selectedMovie &&
                            <img style={{width: '100px'}} src={'https://image.tmdb.org/t/p/w260_and_h390_bestv2/' + this.state.selectedMovie.poster_path} />
                        }
                    </Grid>
                    <Grid item>
                        <Input
                            label="Name"
                            value={this.state.movieTitle}
                            id="add-movie-name"
                            onChange={(e) => this.handleInputChange(e, 'movieTitle')}
                            autocomplete="dont-do-it"
                        />
                    </Grid>
                    <Grid item>
                        <SearchResults
                            results={this.state.results}
                            selectMovie={this.selectMovie.bind(this)}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            label="Notes"
                            value={this.state.notes}
                            id="add-movie-notes"
                            onChange={(e) => this.handleInputChange(e, 'notes')}
                        />
                    </Grid>
                </Grid>
                <Button onClick={() => this.addMovie()}>ADD</Button>
            </Dialog>
        )
    }
}

export default AddMovie;
