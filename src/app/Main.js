/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import queryString from 'query-string';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Gallery from './Gallery';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    let parsed = queryString.parse(location.search);
    this.state = {
      showHeader: parsed.headless ? false : true
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        {this.renderHeader()}
        <Gallery/>
      </div>
      </MuiThemeProvider>
    );
  }

  renderHeader() {
    if (this.state.showHeader) {
      return (<AppBar
          title="Mi-Kasa Gallery"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconClassNameLeft="muidocs-icon-navigation-expand-more"/>);
    } else {
      return '';
    }
  }
}

export default Main;
