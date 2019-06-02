import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import PeripheralPage from './pages/Peripheral';

export default class Root extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={PeripheralPage} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}