import React, { Component } from 'react';
import {Typography} from "@material-ui/core"

class Intstructions extends Component {
    state = { 
        instructions: "2048 is a single-player sliding block puzzle game designed by Italian web developer Gabriele Cirulli. The game's objective is to slide numbered tiles on a grid to combine them to create a tile with the number 2048. However, one can continue to play the game after reaching the goal, creating tiles with larger numbers"
     }
    render() { 
        return ( 
                <Typography variant="h6" align="center" paragraph>
                    {this.state.instructions}
                </Typography>
         );
    }
}
 
export default Intstructions;