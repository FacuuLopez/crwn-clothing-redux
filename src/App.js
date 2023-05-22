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
import { setCurrentUser} from './store/user/user.reducer';
import ControlPanel from './routes/control-panel/control-panel';
import { selectCurrentUser } from './store/user/user.selector';
import { setCartItems } from './store/cart/cart.reducer';
import UserProfile from './components/user-profile/user-profile.component';
import { setPurchases } from './store/purchases/purchases.reducer';
import PurcheasesList from './components/purcheases-list/purcheases-list';
import Products from './routes/products/products.component';
import { fetchCategoriesStartAsync } from './store/categories/category.reducer';
import { fetchProductsStartAsync } from './store/products/products.reducer';

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);


  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const updateCart = (newCart) => dispatch(setCartItems(newCart));
    currentUser && onUserCartChange(currentUser, updateCart);
    
    if (currentUser) {
      const updatePurchases = (purchases) => dispatch(setPurchases(purchases));
      onUserPurchasesChange(currentUser, updatePurchases);
    }
  }, [])

  useEffect(() => {
    
    if (currentUser) {
      const updatePurchases = (purchases) => dispatch(setPurchases(purchases));
      dispatch(fetchCategoriesStartAsync(currentUser));
      dispatch(fetchProductsStartAsync(currentUser));
      onUserPurchasesChange(currentUser, updatePurchases);
    }
  }, [currentUser, dispatch]);
  

  useEffect(() => {
    const updateCart = (newCart) => dispatch(setCartItems(newCart));
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
