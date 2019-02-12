import React, { Component } from 'react';
import firebase from 'firebase';
import Sortable from 'sortablejs';

import {
    Grid,
    Button,
    Fab
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import Login from './cmp/Login.js';
import AddMovie from './cmp/AddEditMovie.js';
import MovieList from './cmp/Movies.js';

const styles = {
    movieListContainer: {
        padding: '1rem'
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            isSignedIn: false,
            showAddMovie: false,
            topTen: []
        }
    }
    componentWillMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                isSignedIn: !!user,
                userInfo: user
            });

            const db = firebase.firestore();
            db.settings({timestampsInSnapshots: true});

            db.collection(this.state.userInfo.uid).doc('movies').collection('movieList').onSnapshot((snapshot) => {
                const movies = [];
                let obj = {};

                snapshot.docs.forEach(function(doc) {
                    obj[doc.id] = doc.data();
                    movies.push(obj);
                    obj = {};
                });

                this.setState({
                    movies: movies
                });

                new Sortable(document.getElementById('movie-list'), {
                    animation: 150,
                    ghostClass: 'blue-background-class',
                    onEnd: (e) => {
                        this.updateItem(e.item.id, e.newIndex);
                	}
                });
            });
        });
    }
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }
    updateItem(id, index) {
        console.log('ko', id, index);
        // db.collection("data").doc("one").set({
        //
        // })
    }
    toggleAddMovie() {
        this.setState({
            showAddMovie: !this.state.showAddMovie
        })
    }
    render() {
        return (
            <div>
                { !this.state.isSignedIn && <Login /> }
                { this.state.isSignedIn &&
                    <div>
                        <Grid container spacing={16}>
                            <Grid sm={6} item>
                                <h1 style={{margin: '0'}}>Movie 10</h1>
                            </Grid>
                            <Grid sm={6} style={{textAlign: 'right'}} item>
                                <Fab
                                    color="primary"
                                    aria-label="Add"
                                    onClick={() => this.toggleAddMovie()}
                                >
                                    <AddIcon />
                                </Fab>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid style={styles.movieListContainer} sm={4} item>
                                <h2>Top ten</h2>
                                <MovieList movies={this.state.movies} />
                            </Grid>
                            <Grid style={styles.movieListContainer} sm={4} item>
                                <h2>All</h2>
                                <MovieList movies={this.state.movies} type="all" userInfo={this.state.userInfo} />
                            </Grid>
                            <Grid style={styles.movieListContainer} sm={4} item>

                            </Grid>
                        </Grid>
                        { this.state.showAddMovie &&
                            <AddMovie
                                toggleAddMovie={this.toggleAddMovie.bind(this)}
                                userInfo={this.state.userInfo}
                            />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default App;
