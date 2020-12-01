import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import JoinGame from '../pages/JoinGame';
import Game from '../pages/Game';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={JoinGame} />
      <Route path='/game' exact component={Game} />
      <Redirect path='*' to='/' />
    </Switch>
  </BrowserRouter>
)

export default Root;
