import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  onUserCartChange,
  onUserPurchasesChange,
} from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser, setIsUserOpen } from './store/user/user.action';
import ControlPanel from './routes/control-panel/control-panel';
import { selectCurrentUser } from './store/user/user.selector';
import { setCart } from './store/cart/cart.action';
import UserProfile from './components/user-profile/user-profile.component';
import { setPurchases } from './store/purchases/purchases.action';
import PurcheasesList from './components/purcheases-list/purcheases-list';
import Products from './routes/products/products.component';
;

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);


  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
      dispatch(setIsUserOpen(false));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const updateCart = (newCart) => dispatch(setCart(newCart));
    currentUser && onUserCartChange(currentUser, updateCart);
    
    if (currentUser) {
      const updatePurchases = (purchases) => dispatch(setPurchases(purchases));
      onUserPurchasesChange(currentUser, updatePurchases);
    }
  }, [])

  useEffect(() => {
    
    if (currentUser) {
      const updatePurchases = (purchases) => dispatch(setPurchases(purchases));
      onUserPurchasesChange(currentUser, updatePurchases);
    }
  }, [currentUser, dispatch]);
  

  useEffect(() => {
    const updateCart = (newCart) => dispatch(setCart(newCart));
    currentUser && onUserCartChange(currentUser);
    const updatePurchases = (purchases) => dispatch(setPurchases(purchases));
    currentUser && onUserPurchasesChange(currentUser, updatePurchases);
  }, [currentUser]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='control-panel/*' element={<ControlPanel />} />
        <Route path='my-profile' element={<UserProfile />} />
        <Route path='my-shopping' element={<PurcheasesList />}/>
        <Route path='products/*' element={<Products />} />
      </Route>
    </Routes>
  );
};

export default App;
