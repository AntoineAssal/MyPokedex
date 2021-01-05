import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Grid, Card, CardContent, CardMedia, CircularProgress, Typography, TextField } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { toFirstCharUpperCase, padLeadingZeros } from "../constants";
import pokemonType from "../typeColors";

const useStyles = makeStyles(theme => ({
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
    },
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "20px",
        paddingRight: "20px"
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    searchInput: {
        width: "200px",
        margin: "5px",
        color: "white"
    },
    logo: {
        paddingLeft: "150px",

    }
}));


const Pokedex = (props) => {
    const { history } = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    const searchInputChangeHandler = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        // Limit 807 because the API doesn't have pics for after that 
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=386`)
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                // For each instead of map since not returning anything just adding to the new array
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, []);

    const getPokemonCard = (pokemonId) => {
        const { id, name, sprite, types } = pokemonData[pokemonId];
        return (
            <Grid item xs={4} key={pokemonId}>
                <a href="" style={{ textDecoration: "none" }}>
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
                </a>
            </Grid>
        )
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField
                            onChange={searchInputChangeHandler}
                            label="My Pokemon"
                            variant="standard"
                        />
                    </div>
                    <div className={classes.logo}>
                        <a href="/">
                            <img src="https://i.imgur.com/FHJDx1E.png" alt="error" className={classes.logo} ></img>
                        </a>
                    </div>

                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {
                        Object.keys(pokemonData).map((pokemonId) => pokemonData[pokemonId].name.includes(filter) && getPokemonCard(pokemonId))
                    }
                </Grid>
            ) : (
                    <CircularProgress color="secondary" size="10%" align="center" />
                )}

        </>
    );
};


export default Pokedex;