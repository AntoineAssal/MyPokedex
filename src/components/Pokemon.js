import React, { useState } from "react";
import mockData from "../mockData";
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {toFirstCharUpperCase, padLeadingZeros } from "../constants";

const Pokemon = (props) => {

    const { match } = props;
    const { params } = match;
    const { pokemonID } = props.match.params;
    const [pokemon, setPokemon] = useState(mockData[`${pokemonID}`]);

    
    const pokemonJSXGenerator= () => {
        const { name, id, species, height, weight, types, sprites, abilities } = pokemon;
        const originalImageURL = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return(
            <>
            <Typography variant="h1" >
                {`#${id}.`} {toFirstCharUpperCase(name)}
                <img src={front_default}/>
            </Typography>
            </>
        )
    };
   
return <> {pokemonJSXGenerator()} </>;
};

export default Pokemon;