import React, {Component} from 'react';
import Main from './app/components/Main.js';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Main />
    );
  }
}
