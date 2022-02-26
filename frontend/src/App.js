import './App.css';
import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterFrom';
import Modal from './Modal/Modal'
import toggleModal from './Modal/ToggleModal';

let logged_in = localStorage.getItem('token') ? true : false;
let toLogin = false
let toRegister = false
const serverUrl = "localhost:8000"

function App() {
  
    const [user, setUser] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const Register = async details => {
        await fetch(`http://${serverUrl}/user/register`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                "Access-Control-Allow-Origin": `http://${serverUrl}`,
            },
            body: JSON.stringify({
                email: details.email,
                password: details.password,
            }),
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Mauvaise réponse du server ",);
                response.text().then(text => {
                    console.log(text);
                    setError(text)
                })
                return;
            }
        })
        .then(function (data) {
            console.log(data);
            //setUser(data.id, data.username, data.email, data.password, []);
            //localUser.set(getUser());
        })
        .catch(function (err) {
            console.error(
                "Il y a eu un problème avec l'opération fetch:",
                err.message
            );
        });

    }

    const Login = async details => {
        await fetch(`http://${serverUrl}/user/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                "Access-Control-Allow-Origin": `http://${serverUrl}`,
            },
            body: JSON.stringify({
                email: details.email,
                password: details.password,
            }),
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Mauvaise réponse du server");
                // error_msg.textContent =
                //     "Le nom d'utilisateur ou le mot de passe est incorrect";
                return;
            }
        })
        .then(function (data) {
            console.log(data);
            //setUser(data.id, data.username, data.email, data.password, []);
            //localUser.set(getUser());
        })
        .catch(function (err) {
            console.error(
                "Il y a eu un problème avec l'opération fetch:",
                err.message
            );
        });
    }

    function Logout() {
        logged_in = false;
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.reload(false);
    }

    const {
        isShowing: isLoginFormShowed,
        toggle: toggleLoginForm
      } = toggleModal();
      const {
        isShowing: isRegistrationFormShowed,
        toggle: toggleRegistrationForm
      } = toggleModal();

    return (
        <div className="App">
            {(logged_in == false) ? (
                <React.Fragment>
                    <button className="button hover" onClick={toggleLoginForm}>Login</button>
                    <button className="button hover" onClick={toggleRegistrationForm}>Register</button>
                </React.Fragment>
            ) : (
                <div className="welcome">
                <h2>Welcome</h2>
                <button>Logout</button>
            </div>
        )}
        {(toLogin == true) ? (        
            <LoginForm Login={Login} error={error}/>
        ) : ("")}
        <Modal
            isShowing={isRegistrationFormShowed}
            hide={toggleRegistrationForm}
            title="Register">
            <RegisterForm Register={Register} error={error}/>
        </Modal>

        <Modal
            isShowing={isLoginFormShowed}
            hide={toggleLoginForm}
            title="Login">
            <LoginForm Login={Login} error={error}/>
        </Modal>

        </div>

    );
}

export default App;
