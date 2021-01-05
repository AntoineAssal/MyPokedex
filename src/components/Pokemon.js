import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { CircularProgress, Link, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUpperCase, padLeadingZeros } from "../constants";
import axios from "axios";
import pokemonType from "../typeColors";


const Pokemon = (props) => {

    const { history, match } = props;
    const { params } = match;
    const { pokemonID } = props.match.params;
    const [pokemon, setPokemon] = useState(undefined); 
    //1.pokemon= undefined, that means we're about to get the info --> return loading progress
    //2.pokemon= good data, that means we've gotten the info  --> return the actual info
    //3.pokmeon = bad data or false (if it doesn't exist in the API) --> return pokemon not found

    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
        .then(function (response) {
            const { data } = response;
            setPokemon(data);
        })
        .catch(function (error) {
            setPokemon(false);
        });
    },[pokemonID]);



    const pokemonJSXGenerator = () => {
        const { name, id, species, height, weight, types, sprites, abilities } = pokemon;
        const originalImageURL = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return (
            <>
                <Typography variant="h1" >
                    {`#${id}.`} {toFirstCharUpperCase(name)}
                    <img src={front_default} />
                </Typography>
                <img style={{ width: "300px", height: "300px" }} src={originalImageURL}></img>
                <Typography variant="h3" >Pokemon Description: </Typography>
                <Typography>
                    {"Species: "}
                    <Link href={species.url}> {toFirstCharUpperCase(species.name)} </Link>
                </Typography>
                <Typography> Height: {height} Decimetres. </Typography>
                <Typography> Weight: {weight} Grams. </Typography>
                <Typography> Type(s): </Typography>
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name} style={{backgroundColor : pokemonType[name]}}> {`${name}`}</Typography>;
                })}
            </>
        )
    };
    //1.pokemon= undefined, that means we're about to get the info --> return loading progress
    //2.pokemon= good data, that means we've gotten the info  --> return the actual info
    //3.pokmeon = bad data or false (if it doesn't exist in the API) --> return pokemon not found
    return (<>
        {pokemon === undefined && <CircularProgress />}
        {pokemon !== undefined && pokemon && pokemonJSXGenerator()}
        {pokemon === false && <Typography> Pokemon not found</Typography>}
        {pokemon !== undefined && (
            <Button variant="contained" onClick={() => history.push("/")}>
                Go Back to Pokedex
            </Button>
        )}
    </>);
};

export default Pokemon;