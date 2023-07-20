import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext';
import { Header } from './components/Header';
import { HomePage } from './Pages/HomePage';
import SignUp from './components/SignUp/SignUp';
import SignIn from './Pages/SignIn/SignIn';
import { PhotoPage } from './Pages/PhotoPage';
import { PageNotFound } from './Pages/PageNotFaund';
import './App.scss';
import { UserPage } from './Pages/UserPage';

function App() {
  return (
    <AppContextProvider>
      <Header />
      <main className="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path=":photoId" element={<PhotoPage />} />
          </Route>

          <Route path="/auth" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/user" element={<UserPage />} />

          <Route path="/n" element={<PageNotFound />} />
        </Routes>
      </main>
    </AppContextProvider>   
  );
}

export default App;
