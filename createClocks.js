require('dotenv').config()
const fs = require('fs');
// const opacities = ['0','1','2','3','4','5','6']

// const clockOutlines = ['fff', '000', '870000', '6d7500', '012e8c', '006e21', '3f0063']
// const clockOutlinesColors = [ 'white', 'black', 'Red', 'Yellow', 'Blue', 'Green', 'Purple']

// const clockFills = ['4b2628', '222222', 'c90000', 'b0bd00', '0040c9', '00a331', '7202b3']
// const clockFillsColors = [ 'Brown', 'Dark Grey', 'Red', 'Yellow','Blue', 'Green', 'Purple']

// const screenColors = ['cccccc', 'fff']
// const screenColorsName = ['Grey', "White"]

// const ledColors = ['870000', '008700', '0074b8', 'eeff00', 'b700ff', 'ffa200']
// const ledColorsName = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange']

// const shadows = [
//     '<rect class="cls-2" x="198.83" y="629.62" width="682.35" height="754.01"/>',
//     '<rect class="cls-2" x="198.83" y="-191.09" width="682.35" height="754.01"/>',
//     '<rect class="cls-2" x="721.31" y="418.32" width="682.7" height="243.48"/>',
//     '<rect class="cls-2" x="-425.67" y="418.26" width="682.7" height="243.48"/>',
//     '<polygon class="cls-2" points="873.8 653.64 206.49 426.04 -282.52 915.05 164.93 1362.51 873.8 653.64"/>',
//         '<polygon class="cls-2" points="206.17 426.36 873.48 653.96 1362.5 164.95 915.04 -282.51 206.17 426.36"/>',
//         '<polygon class="cls-2" points="873.81 426.35 206.51 653.95 -282.51 164.93 164.95 -282.52 873.81 426.35"/>',
//         '<polygon class="cls-2" points="206.19 653.62 873.49 426.03 1362.51 915.04 915.05 1362.5 206.19 653.62"/>'
// ]

const opacities = ['0', '3', '6']
const opacitiesNames = ['Indoors', 'Cloudy' ,'Sunny']

const clockOutlines = ['fff', '000']
const clockOutlinesColors = [ 'White', 'Black']

const clockFills = ['752125', 'c90000', '00a331', '7202b3']
const clockFillsColors = [ 'Brown',  'Red',  'Green', 'Purple']

const screenColors = ['cccccc', 'fff']
const screenColorsName = ['Grey', "White"]

const ledColors = ['#ff000c', '008700', '0074b8','ffa200']
const ledColorsName = ['Red', 'Green', 'Blue', 'Orange']

const shadows = [
    '<polygon class="cls-2" points="873.8 653.64 206.49 426.04 -282.52 915.05 164.93 1362.51 873.8 653.64"/>',
    '<polygon class="cls-2" points="206.17 426.36 873.48 653.96 1362.5 164.95 915.04 -282.51 206.17 426.36"/>',
    '<polygon class="cls-2" points="873.81 426.35 206.51 653.95 -282.51 164.93 164.95 -282.52 873.81 426.35"/>',
    '<polygon class="cls-2" points="206.19 653.62 873.49 426.03 1362.51 915.04 915.05 1362.5 206.19 653.62"/>'
]

const shadowsNames = [
    'Bottom Left // Morning',
    'Top Right // Afternoon',
    'Top Left // Dawn',
    'Bottom Right //Dusk'
]


module.exports = async function() {
    let counter = 1;

    for(k=0;k<clockOutlines.length;k++){
        let clockOutline = clockOutlines[k]
        for(j=0; j<clockFills.length; j++){
            let clockFill = clockFills[j]
            for(l=0; l<screenColors.length; l++){
                let screenColor = screenColors[0]
                for(m=0; m< ledColors.length;m++){
                    let ledColor = ledColors[m]
                    for(i=0 ; i< opacities.length; i++){
                        let opacity = opacities[i];
                        for(n=0;n<shadows.length;n++){
                            if(opacity === '0' && n > 0){
                                null   
                            }else{

                                let shadow = shadows[n]
                                let clock = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
                                <defs>
                                <style>
                                    .cls-8{fill:#fff;font-family:Helvetica;font-size:22.76px}
                                    .cls-9{fill:#000;font-family:Verdana;font-size:80px}
                                    .cls-2{opacity:.${opacity};}
                                    </style>
                                </defs>
                                    <path style="fill:#7fbfad" id="background" d="M0 0h1080v1080H0z"/>
                                    <g>
                                        ${shadow}
                                        <path x="203" y="422" width="673" height="236" rx="31" ry="31" style="fill:#${clockFill}" d="M234 421.82H845.55A31.14 31.14 0 0 1 877 452.96V627.05A31.14 31 0 0 1 845.55 658.19H234.46A31.14 31.14 0 0 1 203.32 627.05V452.96A31.14 31.14 0 0 1 234.46 421.82z"/>
                                        <path x="203" y="423" width="674" height="235" rx="26" ry="26" style="stroke-miterlimit:10;fill:none;stroke:#${clockOutline};stroke-width:8.44px" d="M229.48 422.55H850.51A26.39 26.39 0 0 1 876.9 448.94V631.06A26.39 26.39 0 0 1 850.51 657.45H229.48A26.39 26.39 0 0 1 203.09 631.06V448.94A26.39 26.39 0 0 1 229.48 422.55z"/>
                                        <path x="250" y="460" width="579" height="127" rx="15" ry="15" style="fill:#${screenColor}" d="M265.54 459.66H814.47A15.17 15.17 0 0 1 829.64 474.83V571.7A15.17 15.17 0 0 1 814.47 586.87H265.54A15.17 15.17 0 0 1 250.37 571.7V474.83A15.17 15.17 0 0 1 265.54 459.66z"/>
                                        <text transform="translate(285 555)">
                                            <tspan class="cls-9" x="0" y="0">
                                                <animate attributeName="fill" values="#000;transparent" begin="0s" dur="2s" calcMode="discrete" repeatCount="indefinite"/>
                                            1234567890
                                            </tspan>
                                        </text>
                                        <text class="cls-8" transform="translate(278 626)">
                                            <tspan x="0" y="0">Clock</tspan>
                                        </text>
                                        <circle cx="259" cy="618" r="8.5" fill="${ledColor}" stroke="#dafff4" stroke-width="1.5px"/>
                                        <text class="cls-8" transform="translate(425 626)">
                                            <tspan x="0" y="0">Timer</tspan>
                                        </text>
                                        <circle cx="408" cy="618" r="8.5" fill="${ledColor}" stroke="#dafff4" stroke-width="1.5px"/>
                                        <text class="cls-8" transform="translate(590 626)">
                                            <tspan x="0" y="0">Chrono</tspan>
                                        </text>
                                        <circle cx="570" cy="618" r="8.5" fill="${ledColor}" stroke="#dafff4" stroke-width="1.5px"/>
                                        <text class="cls-8" transform="translate(758 626)">
                                            <tspan x="0" y="0">Alarm</tspan>
                                        </text>
                                        <circle cx="739" cy="618" r="8.5" stroke="#dafff4" stroke-width="1.5px">
                            
                                            <animate attributeName="fill" values="#000;#${ledColor}" begin="0s" dur="2s" calcMode="discrete" repeatCount="indefinite"/>
                                        </circle>
                                    </g>
                                </svg>`
                                fs.writeFileSync(`./clocks/${counter}.svg`, clock);
                                counter ++;
                            }

                        }
                            
                    }
                }
            }
            
        }
    }

}

