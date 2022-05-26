import {Box, Grid, Tooltip } from '@mui/material';
import * as React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type Props = {
    value: number,
    max?: number,
    sectors?: {min:number, max:number}[],
    colors?: string[],
    height?: number,
    labels?: boolean,
    tooltip?: boolean
}

export function WindowProgressBar(props: Props) {

    const savedColors = ['#f1a636', '#f1d836','#c8f136', '#f1d836'];

    const max_ = props.max? props.max: 10;
    const height_ = props.height? props.height: 20;
    const sectors_ = props.sectors? props.sectors : [{min:0, max:2}, {min:2, max:5}, {min:5, max:8}, {min:8, max:10}]
    const colors_ = props.colors? props.colors : sectors_.map((s, i) => savedColors[i%4] )
    const labels_ = props.labels ? props.labels : false;
    const tooltip_ = props.tooltip ? props.tooltip : false;

    if(sectors_[sectors_.length-1].max !== max_) throw new Error("Max should be the same as the last sections max.")
    if(colors_.length !== sectors_.length) throw new Error("There should be the same amount of colors than sections.")


    let align = 'center';
    for (let i = 0; i < sectors_.length; i++) {
        if(props.value === sectors_[i].min+1) align = 'left';
        else if(props.value === sectors_[i].max) align = 'right';
    }

    const bar = <Box style={{display: 'flex'}}>
        {labels_ && <p>{sectors_[0].min}</p>}
        <Grid container style={{ flexWrap: 'nowrap'}}>
            {sectors_.map((s,index) =>
                <Grid item key={index} xs={max_} md={8} lg={s.max - s.min} style={{backgroundColor: colors_[index], height: height_, textAlign: align === 'center'? 'center': align === 'left'? 'left' : 'right'}}>
                    {props.value>s.min && props.value<=s.max && <ArrowDropUpIcon style={{fontSize: 35}}/>}
                </Grid>)}
        </Grid>
        {labels_ && <p>{max_}</p>}
    </Box>;

    if(tooltip_){
        return <Tooltip title={props.value}>
            {bar}
        </Tooltip>
    }

    return bar
}