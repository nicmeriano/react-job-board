import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import Results from './components/Results';
import Job from './components/Job';
import Loading from './components/Loading';
import Nav from './components/Nav';
import ComingSoon from './components/ComingSoon';
import { Theme } from './styles/Theme';
import GlobalStyles from './styles/Global';

const PageWrapper = styled.div`
  height: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 70px 1rem;
`;

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <Reset />
        <GlobalStyles />
        <Router>
          <Nav />
          <PageWrapper>
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Results} />
                <Route path="/search" component={Job} />
                <Route path="/companies" component={ComingSoon} />
                <Route path="/trends" component={ComingSoon} />
                <Route path="/post-a-job" component={ComingSoon} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </React.Suspense>
          </PageWrapper>
        </Router>
      </>
    </ThemeProvider>
  );
}
