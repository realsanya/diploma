import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import ProfilePage from 'pages/profile';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';

import ReviewModuleOutlet from 'pages/review';
import ReviewCreateForm from 'pages/review/create';
import ReviewUpdateForm from 'pages/review/update';
import ReviewViewForm from 'pages/review/view';
import GeneralInfo from 'pages/review/partials/general-info';
import Analysis from 'pages/review/partials/analysis';
import Drafting from 'pages/review/partials/drafting';
import Validation from 'pages/review/partials/validation';

function App() {
  const mode = useSelector((state: TState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = !!useSelector((state: any) => state.token);
  //TODO: убрать роуты в routes
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage />: <Navigate to="/" />} />
            <Route path="/review" element={isAuth ? <ReviewModuleOutlet />: <Navigate to="/" />}>
              <Route path="create" element={isAuth ? <ReviewCreateForm />: <Navigate to="/" />}>
                <Route path="general-info" element={isAuth ? <GeneralInfo />: <Navigate to="/" />}/>
              </Route>
              <Route path="update/:reviewId" element={isAuth ? <ReviewUpdateForm />: <Navigate to="/" />}>
                <Route path="general-info" element={isAuth ? <GeneralInfo />: <Navigate to="/" />}/>
                <Route path="analysis" element={isAuth ? <Analysis />: <Navigate to="/" />}/>
                <Route path="drafting" element={isAuth ? <Drafting />: <Navigate to="/" />}/>
                <Route path="validation" element={isAuth ? <Validation />: <Navigate to="/" />}/>
              </Route>
              <Route path="view/:reviewId" element={isAuth ? <ReviewViewForm />: <Navigate to="/" />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
