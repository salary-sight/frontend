import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import am4geodata_worldUltra from "@amcharts/amcharts4-geodata/worldUltra";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { withStyles } from "@material-ui/core/styles";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Button from "./../Button/Button";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

am4core.useTheme(am4themes_dark);

const fillColor = "#0a74da"
const minColor = "#283046"
const maxColor = "#0a74da"

const marks = [
  {
    value: 1,
    label: "USD"
  },
  {
    value: 2,
    label: "CAD"
  },
];

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  });

function ValueLabelComponent(props: any) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

type MapState = {
  usdData: { data: any[]; min: number; max: number };
  cadData: { data: any[]; min: number; max: number };
  geodata: any;
  usd: number,
};

const er = 1.32509;

export default withStyles(styles, { withTheme: true })(
  class Map extends React.Component<any, MapState> {
    constructor(props: any) {
      super(props);
      let cadArray = [];
      let min = Number.MAX_SAFE_INTEGER,
        max = Number.MIN_SAFE_INTEGER,
        val;
      for (let i in this.props.data) {
        val = this.props.data[i].value;
        cadArray.push({ ...this.props.data[i], value: val * er })
        if (val > max) {
          max = val;
        }
        if (val < min) {
          min = val;
        }
      }
      let usdData = {
          min: min,
          max: max,
          data: this.props.data
      }
      let cadData = {
          min: min * er,
          max: max * er,
          data: cadArray
      }
      this.state = {
        usd: 1,
        usdData: usdData,
        cadData: cadData,
        geodata: am4geodata_worldUltra
      };
    }

    componentDidMount() {
      let map = am4core.create("chartdiv", am4maps.MapChart);
      map.geodata = this.state.geodata;
      map.projection = new am4maps.projections.Miller();
      let polygonSeries = new am4maps.MapPolygonSeries();
      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}: {value} USD";
      map.numberFormatter.numberFormat = "###,###,###.##";
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color(fillColor);
      let grid = map.series.push(new am4maps.GraticuleSeries());
      grid.toBack();

      let heatLegend = map.createChild(am4maps.HeatLegend);
      heatLegend.series = polygonSeries;
      heatLegend.align = "right";
      heatLegend.width = am4core.percent(25);
      heatLegend.marginRight = am4core.percent(4);

      heatLegend.minValue = this.state.usdData.min;
      heatLegend.maxValue = this.state.usdData.max;
      heatLegend.valign = "bottom";

      polygonSeries.exclude = ["AQ"];
      polygonSeries.heatRules.push({
        property: "fill",
        target: polygonSeries.mapPolygons.template,
        min: am4core.color(minColor),
        max: am4core.color(maxColor)
      });
      polygonSeries.useGeodata = true;
      polygonSeries.data = this.props.data;
      map.series.push(polygonSeries);
    }

    valuetext = (value: number) => {
      switch (value) {
        case 1:
          return "Usd";
        case 2:
          return "Cad";
        default:
          return "not supposed to happen";
      }
    };

    componentDidUpdate(prevProps:any, prevState:MapState){
        if(prevState.usd !== this.state.usd){
            am4core.disposeAllCharts();
            let map = am4core.create("chartdiv", am4maps.MapChart);
            map.geodata = this.state.geodata;
            map.projection = new am4maps.projections.Miller();
            let polygonSeries = new am4maps.MapPolygonSeries();
            // Configure series
            var polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = this.state.usd ? "{name}: {value} USD" : "{name}: {value} CAD";
            map.numberFormatter.numberFormat = "###,###,###.##";
            var hs = polygonTemplate.states.create("hover");
            hs.properties.fill = am4core.color(minColor);
            let grid = map.series.push(new am4maps.GraticuleSeries());
            grid.toBack();

            let heatLegend = map.createChild(am4maps.HeatLegend);
            heatLegend.series = polygonSeries;
            heatLegend.align = "right";
            heatLegend.width = am4core.percent(25);
            heatLegend.marginRight = am4core.percent(4);
            heatLegend.minValue = this.state.usd ? this.state.usdData.min : this.state.cadData.min;
            heatLegend.maxValue = this.state.usd ? this.state.usdData.max : this.state.cadData.max;
            heatLegend.valign = "bottom";
            polygonSeries.exclude = ["AQ"];
            polygonSeries.heatRules.push({
                property: "fill",
                target: polygonSeries.mapPolygons.template,
                min: am4core.color(minColor),
                max: am4core.color(maxColor)
            });
            polygonSeries.useGeodata = true;
            polygonSeries.data = this.state.usd ? this.state.usdData.data : this.state.cadData.data;
            map.series.push(polygonSeries);
        }
    }

    handleChange = (event: any, value: number | number[]) => {
      switch (value) {
        case 1:
          if(!this.state.usd){
            this.setState({
                usd: 1
            })
          }
          break;
        case 2:
          if(this.state.usd){
            this.setState({
                usd: 0
            })
          }
          break;
        default:
          this.setState({
            geodata: am4geodata_worldLow
          });
      }
    };

    render() {
      const { classes } = this.props;
      return (
        <>
          <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "#2b2e36" }}>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  <h1 style={{ fontSize: 18 }}>
                    S
                    <span
                      style={{
                        color: "#fe6b8a",
                        border: "2px solid white",
                        fontSize: 20
                      }}
                    >
                      al
                    </span>
                    ary <span style={{ color: "#fe8167" }}>Sight</span>
                  </h1>
                </Typography>
                <Typography id="discrete-slider-custom" gutterBottom>
                  Currency:
                </Typography>
                <div
                  style={{
                    height: 50,
                    width: 40,
                    marginLeft: 20,
                    marginRight: 40
                  }}
                >
                  <Slider
                    defaultValue={1}
                    getAriaValueText={(val: number) => this.valuetext(val)}
                    aria-labelledby="discrete-slider-custom"
                    ValueLabelComponent={ValueLabelComponent}
                    aria-label="custom thumb label"
                    valueLabelDisplay="auto"
                    onChange={this.handleChange}
                    step={1}
                    marks={marks}
                    min={1}
                    max={2}
                  />
                </div>
                <Button
                  color="inherit"
                  text="Restart"
                  onClick={this.props.reset}
                />
              </Toolbar>
            </AppBar>
          </div>
          <div
            id="chartdiv"
            style={{
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              position: "absolute",
              zIndex: -500,
              background: "#12181c"
            }}
          ></div>
        </>
      );
    }
  }
);
