import React from 'react';
import './App.scss';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Button from './components/Button/Button';

import {
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";

const options = ["React", "ReactNative", "R", "Rs", "Ra", "Rf", "asdklfjnkjladsfhk jhadkjsfhkjasdf", "asdfasdfasdfasdfasdfasdfasd"]

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

type AppState = {
  skills: string[],
  step: number
}

export default class App extends React.Component<any, AppState>{
  constructor(props:any){
    super(props);
    this.state={
      skills: [],
      step: 0
    }
  }

  render(){
    const { step } = this.state;
    switch(step){
      case 0:
        return(
          <ThemeProvider theme={theme}>
          <div className="App">
            <div className="FormContainer">
              <div className="TextContaine">
                <h1>S
                  <span style={{color: '#fe6b8a', border: "2px solid white", fontSize: 36}}>
                    al</span>ary <span style={{color: '#fe8167'}}>Sight</span>
                </h1>
                <h3>Discover your salary around the world</h3>
              </div>
              <div className="Form Box">
                <Autocomplete options={options} id="skills" setValue={(arr: string[]) => this.setState({ skills: arr })} label="skills" placeholder="javascript"/>
                <Autocomplete options={options} id="skills" setValue={(arr: string[]) => this.setState({ skills: arr })} label="skills" placeholder="javascript"/>
                <Button text={"Submit"}/>
              </div>
            </div>
          </div>
        </ThemeProvider>
        );
      case 1:
        return(
          <ThemeProvider theme={theme}>
            <div className="App">
              <div className="FormContainer">
                <div className="TextContainer">
                  <h1>S
                    <span style={{color: '#fe6b8a', border: "2px solid white", fontSize: 36}}>
                      al</span>ary <span style={{color: '#fe8167'}}>Sight</span>
                  </h1>
                  <h3>Discover your salary around the world</h3>
                </div>
                <div className="Form">
                  <Autocomplete options={options} id="skills" setValue={(arr: string[]) => this.setState({ skills: arr })} label="skills" placeholder="javascript"/>
                  <Autocomplete options={options} id="skills" setValue={(arr: string[]) => this.setState({ skills: arr })} label="skills" placeholder="javascript"/>
                  <Button text={"Submit"}/>
                </div>
              </div>
            </div>
          </ThemeProvider>
        );
    }
  }
}


