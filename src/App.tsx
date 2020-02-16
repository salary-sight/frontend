import React from 'react';
import './App.scss';
import Autocomplete from './components/Autocomplete/Autocomplete';
import AutocompleteSingle from './components/Autocomplete/AutocompleteSingle';
import Button from './components/Button/Button';
import Map from './components/Map/Map';
import Particles from 'react-particles-js';
import { RotateSpinner } from "react-spinners-kit";

import {
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";
import FadeIn from 'react-fade-in';

import { loadingText, skills, educationLevel, pastPositions, yearsCode } from './vars';

const data = [{
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

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#ff8e53"
        }
      }, 
      focused: {}
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: `2px solid #ff8e53`
        }
      },
    },
  }
});

const initialState:AppState= {
  skills: [],
  experiences: [],
  step: 0,
  fadeOut: false,
  loadingText: loadingText,
  loadingTextIndex: 0,
  educationLevel: "",
  yearsInCode: -1,
}

type AppState = {
  skills: string[],
  experiences: string[],
  step: number,
  fadeOut: boolean,
  loadingText: string[],
  loadingTextIndex: number,
  educationLevel: string,
  yearsInCode: number
}

export default class App extends React.Component<any, AppState>{
  constructor(props:any){
    super(props);
    this.state = initialState;
  }

  resetState = () =>{
    this.setState(initialState);
  }

  startAlternate = () => {
    setTimeout(() => this.setState({
      loadingTextIndex: this.state.loadingTextIndex + 1
    }), 3200)
  }

  checkForm = () => {
    this.setState({
      fadeOut: true
    })
    setTimeout(() => this.setState({
      step: this.state.step + 10
    }), 800)
  }

  render(){
    console.log(this.state.skills);
    const { step, loadingText, loadingTextIndex } = this.state;
    switch(step){
      case 0:
        return(
          <ThemeProvider theme={theme}>
          <div className="App">
          <Particles />
            <div className={this.state.fadeOut ? "FormContainer FadeOut" : "FormContainer"}>
              <div className="TextContaine">
                <h1>S
                  <span style={{color: '#fe6b8a', border: "2px solid white", fontSize: 36}}>
                    al</span>ary <span style={{color: '#fe8167'}}>Sight</span>
                </h1>
                <h3>Discover your salary around the world</h3>
              </div>
              <FadeIn transitionDuration={600}>
              <div className={"Form Box"}>
              <FadeIn transitionDuration={600} delay={150}>
                <Autocomplete options={skills} id="skills" setValue={(arr: string[]) => this.setState({ skills: arr })} label="skills" placeholder={skills[3]}/>
                <Autocomplete options={pastPositions} id="pastPositions" setValue={(arr: string[]) => this.setState({ experiences: arr })} label="experiences" placeholder={pastPositions[6]}/>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <AutocompleteSingle width="60%" options={educationLevel} id="educationLevel" setValue={(arr: any) => this.setState({ educationLevel: arr })} label="education" placeholder={educationLevel[3]}/>
                  <AutocompleteSingle width="30%" options={yearsCode} id="yearsInCode" setValue={(el: any) => this.setState({ yearsInCode: parseInt(el) })} label="years in code" placeholder={'3'}/>
                  </div>
                <br />
                <Button text={"Submit"} onClick={this.checkForm}/>
              </FadeIn>   
              </div>
              </FadeIn>
              <p className="Footer">Built by Richard Hong, Owen Chiu and Ian Gu @HTV4</p>
            </div>
          </div>
        </ThemeProvider>
        );
      case 1:
        this.startAlternate();
        return(
          <ThemeProvider theme={theme}>
            <div className="App">
            <Particles />
              <div className="FormContainer">
                <FadeIn>
                  <div className="Form Box">
                    <RotateSpinner color="#ff8e53"/>
                    <h1 style={{marginTop: -38}}>{loadingText[loadingTextIndex % loadingText.length]}</h1>
                  </div>
                </FadeIn>
              </div>
            </div>
          </ThemeProvider>
        );
      default:
        return (
          <ThemeProvider theme={theme}>
            
            <Map reset={this.resetState} data={data}/>
            
          </ThemeProvider>);
    }
  }
}


