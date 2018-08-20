import React, { Component } from 'react';

class NumChairsAvail extends Component {
    render() {
        const temp = 'M23.3742857,14.8142857 L20.8771429,13.2657143 L20.8771429,2.16571429 C20.875574,1.05028625 19.9725676,0.146002525 18.8571429,0.142857143 L14.5714286,0.142857143 C14.0697697,0.142319994 13.5859111,0.328732853 13.2142857,0.665714286 L12.0714286,1.70571429 L11.7142857,1.35142857 C11.1655803,0.80397189 10.2772768,0.80397189 9.72857143,1.35142857 L8.98571429,2.08571429 L9.12285714,2.37142857 C9.75519325,3.65033249 10.7929381,4.68405901 12.0742857,5.31142857 L12.36,5.44857143 L13.0857143,4.71428571 C13.633171,4.16558033 13.633171,3.27727682 13.0857143,2.72857143 L12.6714286,2.31428571 L13.7885714,1.30285714 C14.002716,1.10795787 14.2818709,0.999963648 14.5714286,1 L18.8571429,1 C19.5009491,1 20.0228571,1.52190806 20.0228571,2.16571429 L20.0228571,12.7371429 L18.7971429,11.9771429 C18.4128677,11.7383965 17.9695444,11.6117327 17.5171429,11.6114286 L13.2114286,11.6114286 L13.2114286,10 L15.4485714,10 C15.6852649,9.99999999 15.8771428,9.80812203 15.8771428,9.57142857 C15.8771428,9.33473512 15.6852649,9.14285716 15.4485714,9.14285714 L10.1142857,9.14285714 C9.87759225,9.14285714 9.68571429,9.33473511 9.68571429,9.57142857 C9.68571429,9.80812204 9.87759225,10 10.1142857,10 L12.3514286,10 L12.3514286,11.6085714 L10.3685714,11.6085714 C10.0650809,11.6114738 9.76728881,11.5261068 9.51142857,11.3628571 L2.27142857,6.74571429 C1.97742271,6.55701183 1.62049314,6.49284125 1.27917102,6.56732127 C0.937848907,6.6418013 0.640097824,6.84882998 0.451428571,7.14285714 L0.331428571,7.33142857 C-0.053835616,7.94575444 0.128592157,8.75583582 0.74,9.14571429 L8.4,14.0028571 C8.79070712,14.259046 9.2470861,14.3969518 9.71428571,14.4 L10.0342857,14.4 L10.0342857,18.1428571 L8.64,18.1428571 C7.92991961,18.1428571 7.35428571,18.718491 7.35428571,19.4285714 L7.35428571,19.7142857 C7.35428571,20.4243661 7.92991961,21 8.64,21 L16.9257143,21 C17.6357947,21 18.2114286,20.4243661 18.2114286,19.7142857 L18.2114286,19.4285714 C18.2114286,18.718491 17.6357947,18.1428571 16.9257143,18.1428571 L15.5428571,18.1428571 L15.5428571,14.4 L17.1885714,14.4 C17.4767786,14.3996732 17.7595046,14.4787574 18.0057143,14.6285714 L22.0057143,17.0571429 C22.6234415,17.4155095 23.4142283,17.216313 23.7884705,16.6080726 C24.1627127,15.9998322 23.98406,15.2041525 23.3857143,14.8142857 L23.3742857,14.8142857 Z M12.48,4.10857143 L12.1942857,4.39428571 C11.2917885,3.89015895 10.5469839,3.1453544 10.0428571,2.24285714 L10.3285714,1.95714286 C10.5426279,1.74391806 10.8888007,1.74391806 11.1028571,1.95714286 L12.4828571,3.33714286 C12.693402,3.551646 12.692128,3.89563374 12.48,4.10857143 Z M16.9257143,19 C17.1624077,19 17.3542857,19.191878 17.3542857,19.4285714 L17.3542857,19.7142857 C17.3542857,19.9509792 17.1624077,20.1428571 16.9257143,20.1428571 L8.64,20.1428571 C8.40330654,20.1428571 8.21142857,19.9509792 8.21142857,19.7142857 L8.21142857,19.4285714 C8.21142857,19.191878 8.40330654,19 8.64,19 L16.9257143,19 Z M10.8771429,18.1428571 L10.8771429,14.4 L14.6857143,14.4 L14.6857143,18.1428571 L10.8771429,18.1428571 Z M23.1085714,16.1028571 C23.0584484,16.2284562 22.9555981,16.3256373 22.8273618,16.3685661 C22.6991255,16.411495 22.5584958,16.3958223 22.4428571,16.3257143 L18.4428571,13.8971429 C18.0623658,13.6654583 17.6254789,13.5428927 17.18,13.5428571 L9.71428571,13.5428571 C9.4111262,13.5462849 9.11344745,13.4619426 8.85714286,13.3 L1.19714286,8.44285714 C0.98266641,8.30706432 0.918732929,8.02319966 1.05428571,7.80857143 L1.17428571,7.62 C1.31007854,7.40552355 1.59394319,7.34159007 1.80857143,7.47714286 L9.06285714,12.0857143 C9.45207521,12.3339089 9.90409621,12.4657483 10.3657143,12.4657143 L17.5085714,12.4657143 C17.8014649,12.4659998 18.0884497,12.5481368 18.3371429,12.7028571 L20.0685714,13.7771429 C20.1405039,13.910066 20.2775195,13.9948852 20.4285714,14 L22.9171429,15.5457143 C23.107101,15.6608508 23.1876494,15.8952826 23.1085714,16.1028571 Z';

        return (
            <svg className={this.props.className} width={this.props.width} viewBox="0 0 24 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <title>noun_1124673_cc</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="UI-Screens" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Desktop---Dentist-Detail-Page" transform="translate(-470.000000, -737.000000)" fill="#000000" fillRule="nonzero">
                        <g id="Group" transform="translate(397.000000, 737.000000)">
                            <g id="noun_1124673_cc" transform="translate(73.000000, 0.000000)">
                                <path id="Shape" d={temp}></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>);
    }
}

export default NumChairsAvail;