import {Route, HashRouter, Switch} from 'react-router-dom';
import BasicLayout from './pages/Layout';


const Router = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={BasicLayout} />
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  </HashRouter>
);

export default Router;