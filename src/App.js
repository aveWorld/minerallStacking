import { Route, Switch } from 'react-router-dom';

// Styles
import './styles/Main.scss';

// Components
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
      </Switch>
    </Layout>
  );
}

export default App;
