import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import BoardsList from '../boards-page/boards-list';
import ColumnsContainer from '../columns/columns-container';
import Header from '../header/header';
import { saveAuthDataToLocalStorage } from '../../../utils/auth-data-localstorage';

const Main: React.FC = () => {
  const { authData } = useAppSelector((state) => state);

  useEffect(() => {
    saveAuthDataToLocalStorage(authData);
  }, [authData.login]);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/boards" component={BoardsList} />
        <Route path="/boards/board/:boardId" component={ColumnsContainer} />
      </Switch>
    </>
  );
};

export default Main;
