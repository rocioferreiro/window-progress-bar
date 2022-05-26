# Window Progress Bar
Color coded Progress Bar.

![image of bar](https://i.imgur.com/iipIjpq.png)

### Install

`npm install color-coded-progress-bar`

### Usage

`import { WindowProgressBar } from 'color-coded-progress-bar';`

`<WindowProgressBar 
        tooltip 
        value={7} />`

### Options

| Attribute | Type                       | Purpose                                                            | Default                                                           |
|-----------|----------------------------|--------------------------------------------------------------------|-------------------------------------------------------------------|
| value     | Number                     | Defines where the marker will be located.                          | No default, is mandatory.                                         |
| tooltip   | Boolean                    | Indicates whether the bar will show the value on hover or not.     | False                                                             |
| label     | Boolean                    | Indicates whether the bar will show the min and max values or not. | False                                                             |
| max       | Number                     | Defines the maximum value of the bar                               | 10                                                                |
| colors    | String[]                   | Defines the colors for each section.                               | ['#f1a636', '#f1d836','#c8f136', '#f1d836']                       |
| sectors   | {min:number, max:number}[] | Defines the sections.                                              | [{min:0, max:2}, {min:2, max:5}, {min:5, max:8}, {min:8, max:10}] |
| height    | Number                     | Defines the height of the bar                                      | 20                                                                |

