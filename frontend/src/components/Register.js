import React from "react";
import { Link, withRouter } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.handleRegister(this.state.email, this.state.password);
    }
    
    render() {
        return (
            <div>
                <section className="sign">
                    <form className='login__form' name='register' onSubmit={this.handleSubmit}>
                        <h2 className="sign__title">Регистрация</h2>
                        <input className="sign__input" name='email' id='email' placeholder='Почта' type='email' value={this.state.email} onChange={this.handleChange} required />
                        <input className="sign__input" name='password' id='password' placeholder='Пароль' type='password' value={this.state.password} onChange={this.handleChange} required />
                        <button className="sign__submit" name='submit' type='submit' aria-label="Войти">Зарегистрироваться</button>
                        <p className="sign__subtitle">
                            Уже зарегистрированы?
                            <Link to='/sign-in' className="sign__link">
                                {' '}
                                Войти
                            </Link>
                        </p>
                    </form>
                </section>
            </div>
        )
    }
}

export default withRouter(Register);
