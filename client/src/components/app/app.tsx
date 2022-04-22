import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';

import Authorization from '../authorization/authorization';
// import Main from '../main/main';
// import BoardsList from '../boards-page/boards-list';
// import ColumnsContainer from '../columns/columns-container';
// import AuthProtect from '../routing/auth-protect';
import ErrorBoundary from '../error-boundary/error-boundary';
import { defaultColorsMU } from './constants';

const App: React.FC = () => (
  <Router>
    <ErrorBoundary>
      <MuiThemeProvider theme={defaultColorsMU}>
        <Routes>
          {/* <Route element={<AuthProtect />}>
            <Route path="/boards" element={<Main />}>
              <Route index element={<BoardsList />} />
              <Route path="/boards/board/:boardId" element={<ColumnsContainer />} />
            </Route>
          </Route> */}
          <Route path="/auth" element={<Authorization />} />
          <Route path="/" element={<Navigate to="/boards" />} />
        </Routes>
      </MuiThemeProvider>
    </ErrorBoundary>
  </Router>
);

export default App;
