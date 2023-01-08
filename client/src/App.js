import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { setUser } from './app/Slices/authSlice';
import { useAuth } from './hooks/useAuth';
import ProtectedRoutes from './Protected-Routes/Protected-Routes';
import SuspenseSpinner from './pages/Suspense';
const Main = lazy(() => import('./pages/Main'));
const AddPost = lazy(() => import('./pages/AddPost'));
const SinglePost = lazy(() => import( './pages/singlePost'));
const UserPosts = lazy(() => import('./pages/UserPosts'));
const EditPost = lazy(() => import('./pages/EditPost'));



function App() {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user && dispatch(setUser(user));

  }, []);


  return (
    <div>
      {auth && <Navbar />}
      <Suspense fallback={<SuspenseSpinner />}>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Main />} />
            <Route path='/posts' element={<UserPosts />} />
            <Route path='/:id' element={<SinglePost />} />
            <Route path='/new' element={<AddPost />} />
            <Route path='/edit/:id' element={<EditPost />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer position='bottom-right' />
    </div>
  );
}

export default App;
