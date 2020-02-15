import React from 'react';
import './App.scss';
import Autocomplete from './components/Autocomplete/Autocomplete';

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

export default class App extends React.Component{
  constructor(props:any){
    super(props);
    this.state={
      skills: []
    }
  }

  render(){
    return (
      <ThemeProvider theme={theme}>
        <Autocomplete options={options} id="skills" setValue={(arr: string[]) => this.setState({ skills: arr })} label="skills" placeholder="javascript"/>
      </ThemeProvider>
    );
  }
}
