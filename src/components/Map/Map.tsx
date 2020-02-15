import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import am4geodata_worldUltra from '@amcharts/amcharts4-geodata/worldUltra';
import am4geodata_worldHigh from '@amcharts/amcharts4-geodata/worldHigh';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { withStyles } from "@material-ui/core/styles";
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Button from './../Button/Button';

am4core.useTheme(am4themes_dark);

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
});

type MapState = {
    classes: any
}

export default withStyles(styles, { withTheme: true }) (class Map extends React.Component<any, any>{
    constructor(props:any){
        super(props);
    }

    componentDidMount(){
        let map = am4core.create("chartdiv", am4maps.MapChart);
        map.geodata = am4geodata_worldLow
        map.projection = new am4maps.projections.Miller();
        let polygonSeries = new am4maps.MapPolygonSeries();
        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value}";

        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");
        let grid = map.series.push(new am4maps.GraticuleSeries());
        grid.toBack();

        polygonSeries.exclude = ["AQ"];
        polygonSeries.heatRules.push({
            "property": "fill",
            "target": polygonSeries.mapPolygons.template,
            "min": am4core.color("#283046"),
            "max": am4core.color("#0a74da")
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
          }, {
            "id": "CA",
            "name": "Canada",
            "value": 70
          }, {
            "id": "CN",
            "name": "China",
            "value": 80
          }, {
            "id": "MX",
            "name": "Mexico",
            "value": 90
          }];
        map.series.push(polygonSeries);
    }
    

    render(){    
        const { classes } = this.props;
        return(
            <>
            <div className={classes.root}>
                <AppBar position="static" style={{ backgroundColor: '#2b2e36'}}>
                    <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    <h1 style={{ fontSize: 18}}>S
                    <span style={{color: '#fe6b8a', border: "2px solid white", fontSize: 20}}>
                    al</span>ary <span style={{color: '#fe8167'}}>Sight</span>
                    </h1>
                    </Typography>
                        <Button color="inherit" text="Restart" onClick={this.props.reset}/>
                    </Toolbar>
                </AppBar>
            </div>
            <div id="chartdiv" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute', zIndex: -500, background: "#12181c"}}></div>
            </>
        )
    }
})