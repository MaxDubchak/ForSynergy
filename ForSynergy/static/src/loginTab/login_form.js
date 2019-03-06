import React, {Component} from 'react';
import axios from 'axios';

import Modal from "@material-ui/core/Modal";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import RegistrationForm from './registration_modal'
import './login_form.css'

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        email_error: false,
        pass_error: false,
        disable_button: true,
        showPassword: false,
        openRegisterModal: false,
    };

    onChangeEmail = (event) => {
        let email = event.target.value;
        let email_error = this.handleEmail(email);

        this.setState({
            email: email,
            email_error: email_error
        });

        this.checkLoginButton(email_error, this.state.pass_error);
    };

    handleEmail = (email) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !regex.test(String(email).toLowerCase());
    };

    onChangePassword = (event) => {
        let password = event.target.value;
        let pass_error = !this.handlePassword(password);

        this.setState({
            password: password,
            pass_error: pass_error
        });

        this.checkLoginButton(this.state.email_error, pass_error);
    };

    handlePassword = (first_pass) => {
        let regex = /^(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])[A-Za-z\d]*$/;
        return regex.test(first_pass);
    };

    checkLoginButton = (email_error, pass_error) => {
        if (!email_error && !pass_error){
            this.setState({disable_button:false});
        }
        else{
            this.setState({disable_button:true});
        }
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    onClickLogin = () => {
        const URL = "api/user/login";
        axios.post(URL, {
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                this.props.history.push('/users')
            })
            .catch(error=>{
                alert(error);
            })

    };

    closeRegisterModal = () =>{
        this.setState({openRegisterModal:false})
    };

    onClickRegister = () =>{
        this.setState({openRegisterModal:true})
    };

    render() {
        const {email_error, email, pass_error, password,
            disable_button, openRegisterModal, showPassword} = this.state;
        return (
            <div className="root">
                <TextField
                    className ='text_field'
                    error={email_error}
                    label={email_error ? 'Invalid Email' : 'Email'}
                    autoComplete="email"
                    variant="filled"
                    value={email}
                    onChange={this.onChangeEmail}/>

                <TextField
                    className ='text_field'
                    error={pass_error}
                    label={pass_error ? 'Invalid password' : 'Password'}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    variant="filled"
                    value={password}
                    onChange={this.onChangePassword}

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <div className='buttons_div'>
                    <Button
                        className='custom_buttons'
                        variant='contained'
                        color='primary'
                        size='medium'
                        disabled={disable_button}
                        onClick={this.onClickLogin}>
                        Login
                    </Button>

                    <Button
                        className='custom_buttons'
                        variant='contained'
                        color='primary'
                        size='medium'
                        onClick={this.onClickRegister}>
                        Sign up
                    </Button>
                </div>

                <div>
                    <Modal
                        open={openRegisterModal}
                        onClose={this.closeRegisterModal}
                        disableAutoFocus={true}>
                        <RegistrationForm
                            close={this.closeRegisterModal}
                        />
                    </Modal>
                </div>
            </div>
        )
    }
}

export default LoginForm;
