import React, {Component} from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import './registration_form.css'

class RegistrationForm extends Component {
    state = {
        email: '',
        password: '',
        second_pass: '',
        email_error: false,
        pass_error: false,
        second_pass_error: false,
        disable_button: true,
        showPassword: false,
    };

    onChangeEmail = (event) => {
        let email = event.target.value;
        let email_error = this.handleEmail(email);

        this.setState({
            email: email,
            email_error: email_error
        });

        this.checkSignupButton(email_error, this.state.pass_error, this.state.second_pass_error);
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

        this.checkSignupButton(this.state.email_error, pass_error, this.state.second_pass_error);
    };

    onChangeSecondPassword = (event) => {
        let second_pass = event.target.value;
        let second_pass_error = this.handleSecondPassword(second_pass);

        this.setState({
            second_pass: second_pass,
            second_pass_error: second_pass_error
        });

        this.checkSignupButton(this.state.email_error, this.state.pass_error, second_pass_error);
    };

    handlePassword = (first_pass) => {
        let regex = /^(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])[A-Za-z\d]*$/;
        return regex.test(first_pass);
    };

    handleSecondPassword = (second_pass)=>{
        return !(second_pass===this.state.password && !this.state.pass_error)
    };


    checkSignupButton = (email_error, pass_error, second_pass_error) => {
        if (email_error || pass_error || second_pass_error){
            this.setState({disable_button:true});
        }
        else if(this.state.email!=='' && this.state.password!==''&&this.state.second_pass!==''){
            this.setState({disable_button:false});
        }
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    onClickRegister = () => {
        const URL = "api/user/create_user";
        axios.post(URL, {
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                alert('Successfully signed up');
                this.props.close()
            })
            .catch(error=>{
                alert(error);
            })
    };

    render() {
        const {email_error, email, pass_error, second_pass,
            second_pass_error, password, disable_button} = this.state;
        return (
            <div className='root'>
                <TextField
                    className='text_field'
                    error={email_error}
                    label={email_error ? 'Invalid Email' : 'Email'}
                    margin = "normal"
                    autoComplete="email"
                    variant="filled"
                    value={email}
                    onChange={this.onChangeEmail}/>

                <TextField
                    className='text_field'
                    error={pass_error}
                    label={pass_error ? 'Invalid password' : 'Password'}
                    type={this.state.showPassword ? 'text' : 'password'}
                    margin="normal"
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

                <TextField
                    className='text_field'
                    error={second_pass_error}
                    label={second_pass_error ? "Passwords don\'t match" : "Repeat password"}
                    type={this.state.showPassword ? 'text' : 'password'}
                    margin="normal"
                    variant="filled"
                    value={second_pass}
                    onChange={this.onChangeSecondPassword}
                />

                <div className='custom_buttons'>
                    <Button
                        variant='contained'
                        color='primary'
                        size='medium'
                        disabled={disable_button}
                        onClick={this.onClickRegister}>
                        Sign Up
                    </Button>

                    <Button
                        variant='contained'
                        color='secondary'
                        size='medium'
                        onClick={this.props.close}>
                        Close
                    </Button>
                </div>
            </div>
        )
    }
}

export default RegistrationForm;
