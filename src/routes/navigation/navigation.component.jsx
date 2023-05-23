import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import UserDropdown from '../../components/user-dropdown/user-dropdown.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartCount } from '../../store/cart/cart.selector';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { ReactComponent as UserIcon } from '../../assets/user-icon.svg';
import { ReactComponent as ShopIcon } from '../../assets/shopping-bag.svg';
import { CartIconSpan } from './navigation.styles';
import ConfigDropdown from '../../components/config-dropdown/config-dropdown.component';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const [cartRight, setCartRight] = useState(0);
  const [userRight, setUserRight] = useState(0);
  const [configRight, setConfigRight] = useState(0);
  const cartRef = useRef(null);
  const userRef = useRef(null);
  const configRef = useRef(null);

  useEffect(() => {
    // Obtiene y almacena la posición right de cada elemento al renderizarse
    setCartRight(getRightPosition(cartRef));
    setUserRight(getRightPosition(userRef));
    setConfigRight(getRightPosition(configRef));

  }, []);

  const getRightPosition = (ref) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const elementWidth = rect.width;
      return elementWidth;
    }
    return 0;
  };


  const openDropwdown = (dropdown) => {
    console.log(dropdown);
    switch (dropdown) {
      case 'cart':
        isUserOpen && setIsUserOpen(false);
        isConfigOpen && setIsConfigOpen(false);
        setIsCartOpen(!isCartOpen);
        break;
      case 'config':
        isCartOpen && setIsCartOpen(false);
        isUserOpen && setIsUserOpen(false);
        setIsConfigOpen(!isConfigOpen);
        break;
      case 'user':
        isCartOpen && setIsCartOpen(false);
        isConfigOpen && setIsConfigOpen(false);
        setIsUserOpen(!isUserOpen);
        break;
      default:
        break;

    }

  }

  return (
    <>
      <header>
        <div className='d-flex'>
          <a href="https://api.whatsapp.com/send?phone=+5491123367518&
      text=Hi,%20I%20saw%20your%20e-commerce%20proyect%20on%20Github!" target="_blank">
            <i className="bi bi-whatsapp text-success fs-5 px-3"></i
            ></a>
          <a href="https://www.linkedin.com/in/facundo-lopez-bruno/" target="_blank">
            <i class="bi bi-linkedin text-primary fs-5 px-3"></i>
          </a>
          <a href='mailto:facuulopez93@gmail.com
        ?subject=Hi,%20I%20saw%20your%20e-commerce%20proyect%20on%20Github!'>
            <i class="bi bi-envelope-at-fill fs-5 px-3"></i>
          </a>

        </div>
        <nav className='navbar navbar-expand-md container-fluid m-0 d-flex justify-content-between bg-white sticky-top navbar-ligh '>
          <div className='d-flex'>
            <Link className="navbar-brand " to='/'>
              <CrwnLogo className='logo' />
            </Link>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="justify-content-end collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav d-flex align-items-md-center">
              <li className='nav-item px-2' >
                <Link className='text-uppercase' to='/shop'>
                  Shop <i class="bi bi-shop fs-4"></i>
                </Link>
              </li>

              {currentUser ? (
                <>
                  <li ref={cartRef} className=' position-relative nav-item d-none d-md-inline d-flex align-items-center text-uppercase px-2' onClick={() => openDropwdown('cart')}>
                    <span>Cart </span>
                    <div className='position-relative d-inline-block'>
                      <i className="bi bi-bag fs-3"></i>
                      <CartIconSpan>{cartCount}</CartIconSpan>
                    </div>
                    {isCartOpen && <CartDropdown position={cartRight} />}
                  </li>
                  <li className='nav-item d-inline d-md-none px-2 '>
                    <Link to='/checkout'>
                      Cart <CartIcon />
                    </Link>
                  </li>
                  <li ref={userRef} className=' position-relative nav-item d-none d-md-inline text-uppercase px-2' onClick={() => openDropwdown('user')}>
                    User <i className="bi bi-person-circle fs-4 "></i>
                    {isUserOpen && <UserDropdown position={userRight} />}
                  </li>
                  <li className='nav-item dropdown d-inline d-md-none px-2'>
                    <a className="nav-link dropdown-toggle" href="#" id="navbarUserDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      User <i className="bi bi-person-circle"></i>
                    </a>
                    <ul class="dropdown-menu p-2" aria-labelledby="navbarUserDropdown">
                      <li><Link to='/my-shopping'>My Shopping<ShopIcon style={{ width: '20px', height: '20px', marginLeft: '8px' }} /></Link></li>
                      <li><Link to='/my-profile'>My Profile<UserIcon style={{ width: '20px', height: '20px', marginLeft: '8px' }} /></Link></li>
                    </ul>
                          </li>
                  <li className='nav-item text-uppercase px-2'>
                    Info <i className="bi bi-info-circle text-info fs-4"></i>
                  </li>
                  <li ref={configRef} className='position-relative nav-item text-uppercase px-2 d-none d-md-inline ' onClick={() => openDropwdown('config')}>
                    Config <i className="bi bi-gear-fill  fs-4"></i>
                    {isConfigOpen && <ConfigDropdown position={configRight} />}
                  </li>
                  <li className='nav-item dropdown d-inline d-md-none px-2'>
                    <a className="nav-link dropdown-toggle" href="#" id="navbarConfigDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Config <i className="bi bi-gear-fill  fs-4"></i>
                    </a>
                    <ul class="dropdown-menu p-2" aria-labelledby="navbarConfigDropdown">
                      <li><Link to='control-panel/' > Config Categories</Link></li>
                      <li><Link to='control-panel/products'>Config Products</Link></li>
                      <li><Link to='control-panel/purchases'>Purchases Status</Link></li>
                    </ul>
                  </li>
                </>
              ) : (
                <li><Link className='nav-item' to='/auth'>SIGN IN</Link></li>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <div className='position-fixed bottom-0 end-0 m-5'>
        <button href="https://api.whatsapp.com/send?phone=+5491123367518&
      text=Hi,%20I%20saw%20your%20e-commerce%20proyect%20on%20Github!" target="_blank" className="btn btn-success btn-lg mx-3 rounded-circle">
          <i class="bi bi-whatsapp text-white"></i>
        </button>
      </div>

      <Outlet />
    </>
  );
};

export default Navigation;
