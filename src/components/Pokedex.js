import React, { useState } from "react";
import { AppBar, Toolbar, Grid, Card, CardContent, CardMedia, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import mockData from "../mockData"
import {toFirstCharUpperCase, padLeadingZeros } from "../constants";

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px"

    },

    cardMedia: {
        margin: "auto"
    },

    cardColor: {
        backgroundColor: "#333333"
    },

    cardContent: {
        textAlign: "center",
        color: "white"
    }
})


const Pokedex = (props) => {
    const { history } = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState(mockData);


    const getPokemonCard = (pokemonId) => {
        console.log(pokemonData[`${pokemonId}`]);
        const { id, name } = pokemonData[`${pokemonId}`];
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return (
            <Grid item xs={4} key={pokemonId}>
                <Card className={classes.cardColor} onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography> {`#${padLeadingZeros(id)}. ${toFirstCharUpperCase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {
                        Object.keys(pokemonData).map(pokemonId => getPokemonCard(pokemonId))
                    }
                </Grid>
            ) : (
                    <CircularProgress color="secondary" size="10%" align="center" />
                )}

        </>
    );
};


export default Pokedex;