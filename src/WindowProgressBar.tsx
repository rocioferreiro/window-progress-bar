import React from "react";

type Props = {
    value: number,
    max?: number,
    sectors?: {min:number, max:number}[],
    colors?: string[],
    height?: number,
    sectorWidth?: number,
    labels?: boolean,
    tooltip?: boolean
}

const WindowProgressBar = (props: Props) => {

    const savedColors = ['#f1a636', '#f1d836','#c8f136', '#f1d836'];

    const max_ = props.max? props.max: 10;
    const height_ = props.height? props.height: 20;
    const wigth_ = props.sectorWidth? props.sectorWidth: 20;
    const sectors_ = props.sectors? props.sectors : [{min:1, max:3}, {min:3, max:6}, {min:6, max:9}, {min:9, max:11}]
    const colors_ = props.colors? props.colors : sectors_.map((_, i) => savedColors[i%4] )
    const labels_ = props.labels ? props.labels : false;
    const tooltip_ = props.tooltip ? props.tooltip : false;

    if(sectors_[sectors_.length-1].max !== max_+1) throw new Error("Max should be the same as the last sections max.")
    if(colors_.length !== sectors_.length) throw new Error("There should be the same amount of colors than sections.")


    let align: 'center' | 'left' | 'right' = 'center';
    for (const sector of sectors_) {
        if (props.value === sector.min + 1) align = 'left';
        else if (props.value === sector.max) align = 'right';
    }

    const inSection = (index: number): number => {
        for (let i = 0; i < sectors_.length; i++) {
            if (index >= sectors_[i].min && index < sectors_[i].max) return i;
        }
        return -1
    }

    const bar = <div style={{display: 'flex'}}>
        {labels_ && <p>{sectors_[0].min}</p>}
        <div style={{display: 'grid', gridTemplateColumns: `repeat(${max_}, 1fr)`, gap: 0, width: max_*wigth_}}>
            {Array.from({length: max_}, (_, i) => i+1).map((index) =>
                <div key={`section-${index}`} style={{backgroundColor: colors_[inSection(index)], height: height_, textAlign: align, gridColumn: index, gridRow: 1, minWidth: wigth_}}>
                    {props.value===index && <img src="ArrowMarker.png" alt='marker' style={{height: height_, zIndex: 10, position: 'relative'}}/>}
                </div>)
            }
        </div>
        {labels_ && <p>{max_}</p>}
    </div>;

    if(tooltip_){
        return (
            <div style={{position: 'relative', display: 'inline-block'}}>
                {bar}
                <span style={{
                    visibility: 'hidden',
                    backgroundColor: 'black',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '6px',
                    padding: '5px 0',
                    position: 'absolute',
                    zIndex: 1,
                    bottom: '125%',
                    left: '50%',
                    marginLeft: '-60px',
                    width: '120px',
                    opacity: 0.8
                }}>
                    {`Value: ${props.value}`}
                </span>
            </div>
        );
    }

    return bar
}

export default WindowProgressBar;