import React from "react";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.handleLogin(this.state.email, this.state.password, this.resetForm);
    }

    resetForm() {
        this.setState({ email: '', password: '' });
    }

    render() {
        return (
            <div>
                <section className="sign">
                    <form className='login__form' name='login' onSubmit={this.handleSubmit}>
                        <h2 className="sign__title">Вход</h2>
                        <input className="sign__input" name='email' id='email' placeholder='Почта' type='email' value={this.state.email} onChange={this.handleChange} required />
                        <input className="sign__input" name='password' id='password' placeholder='Пароль' type='password' value={this.state.password} onChange={this.handleChange} required />
                        <button className="sign__submit" name='submit' type='submit' aria-label="Войти">Войти</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default withRouter(Login);
