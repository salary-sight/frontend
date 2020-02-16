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
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Button from './../Button/Button';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

am4core.useTheme(am4themes_dark);

const marks = [
    {
      value: 1,
      label: 'ultra',
    },
    {
      value: 2,
      label: 'high',
    },
    {
      value: 3,
      label: 'low',
    }
  ];

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

function ValueLabelComponent(props: any) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }


export default withStyles(styles, { withTheme: true }) (class Map extends React.Component<any, any>{
    constructor(props:any){
        super(props);
        this.state = {
            data: props.data,
            geodata: am4geodata_worldUltra
        }
    }

    componentDidMount(){
        let map = am4core.create("chartdiv", am4maps.MapChart);
        map.geodata = this.state.geodata;
        map.projection = new am4maps.projections.Miller();
        let polygonSeries = new am4maps.MapPolygonSeries();
        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value}";

        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");
        let grid = map.series.push(new am4maps.GraticuleSeries());
        grid.toBack();
        
        let heatLegend = map.createChild(am4maps.HeatLegend);
        heatLegend.series = polygonSeries;
        heatLegend.align = "right";
        heatLegend.width = am4core.percent(25);
        heatLegend.marginRight = am4core.percent(4);

        let min = Number.MAX_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER, val;
        for(let i in this.state.data){
            val = this.state.data[i].value;
            if(val > max){
                max = val;
            } if (val < min){
                min = val;
            }
        }

        heatLegend.minValue = min;
        heatLegend.maxValue = max;
        heatLegend.valign = "bottom";
        
        polygonSeries.exclude = ["AQ"];
        polygonSeries.heatRules.push({
            "property": "fill",
            "target": polygonSeries.mapPolygons.template,
            "min": am4core.color("#283046"),
            "max": am4core.color("#0a74da")
          });
        polygonSeries.useGeodata = true;
        polygonSeries.data = this.props.data;
        map.series.push(polygonSeries);
    }
    
    valuetext = (value: number) => {
        switch(value){
            case 1:
                return 'Low Graphics';
            case 2:
                return 'High Graphics';
            case 3:
                return 'Ultra Graphics'
            default:
                return 'not supposed to happen'
        }
    }

    handleChange = (event: any, value: number | number[]) => {
        console.log(value);
        switch(value){
            case 1:
                this.setState({
                    geodata: am4geodata_worldLow
                })
                break;
            case 2:
                this.setState({
                    geodata: am4geodata_worldHigh
                })
                break;
            case 3:
                this.setState({
                    geodata: am4geodata_worldUltra
                })
                break;
            default:
                this.setState({
                    geodata: am4geodata_worldLow
                })
        }
    }

    render(){   
        console.log("Current GeoData", this.state.geodata);
        const { classes } = this.props;
        return(
            <>
            <div className={classes.root}>
                <AppBar position="static" style={{ backgroundColor: '#2b2e36'}}>
                    <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    <h1 style={{ fontSize: 18}}>S
                    <span style={{color: '#fe6b8a', border: "2px solid white", fontSize: 20}}>
                    al</span>ary <span style={{color: '#fe8167'}}>Sight</span>
                    </h1>
                    </Typography>
                    <Typography id="discrete-slider-custom" gutterBottom>
                        Graphics: 
                    </Typography>
                    <div style={{ height: 50, width: 100, marginLeft: 20, marginRight: 30 }}>
                        <Slider
                            defaultValue={1}
                            getAriaValueText={(val:number) => this.valuetext(val)}
                            aria-labelledby="discrete-slider-custom"
                            ValueLabelComponent={ValueLabelComponent}
                            aria-label="custom thumb label"
                            valueLabelDisplay="auto"
                            onChange={this.handleChange}
                            step={1}
                            marks={marks}
                            min={1}
                            max={3}
                        />
                    </div>
                        <Button color="inherit" text="Restart" onClick={this.props.reset}/>
                    </Toolbar>
                </AppBar>
            </div>
            <div id="chartdiv" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute', zIndex: -500, background: "#12181c"}}></div>
            </>
        )
    }
})