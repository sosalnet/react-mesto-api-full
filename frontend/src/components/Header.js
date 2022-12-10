import logo from '../images/Vector.svg';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function Header({ email, handleLogout }) {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="logo" />
            <Switch>
                <Route exact path='/'>
                    <div className='header__info'>
                        {email}
                        <button className='header__nav-link header__nav-link_exit' onClick={handleLogout}>Выйти</button>
                    </div>
                </Route>
                <Route path='/sign-up'>
                    <Link className='header__nav-link' to='sign-in'>
                        Войти
                    </Link>
                </Route>
                <Route path='/sign-in'>
                    <Link className='header__nav-link' to='sign-up'>
                        Регистрация
                    </Link>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;