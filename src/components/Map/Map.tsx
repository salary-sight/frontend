import React from 'react';

import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldUltra from '@amcharts/amcharts4-geodata/worldUltra';
import am4geodata_worldHigh from '@amcharts/amcharts4-geodata/worldHigh';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';

export default class Map extends React.Component<{},any>{
    componentDidMount(){
        let map = am4core.create("chartdiv", am4maps.MapChart);
        map.geodata = am4geodata_worldUltra
        map.projection = new am4maps.projections.Miller();
        let polygonSeries = new am4maps.MapPolygonSeries();
        polygonSeries.exclude = ["AQ"];
        polygonSeries.heatRules.push({
            "property": "fill",
            "target": polygonSeries.mapPolygons.template,
            "min": am4core.color("#C2DEEB"),
            "max": am4core.color("#AAAA00")
          });
        polygonSeries.useGeodata = true;
        polygonSeries.data = [{
            "id": "US",
            "name": "United States",
            "value": 100
          }, {
            "id": "FR",
            "name": "France",
            "value": 50
          }];
        map.series.push(polygonSeries);
    }

    render(){
        return(
            <div id="chartdiv" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}></div>
        )
    }
}