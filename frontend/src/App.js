import './App.css';
import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterFrom';
import Modal from './Modal/Modal'
import toggleModal from './Modal/ToggleModal';
import SearchBar from './components/SearchBar'

const serverUrl = "localhost:8000"

function App() {
  
    const [user, setUser] = useState({id: "", email: "", password: ""});
    const [error, setError] = useState("");
    const [logged, setLog] = useState(localStorage.getItem('token') ? true : false)

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
            setUser(data.id, data.email, data.password);
            setLog(true)
            localStorage.setItem("token", data.id);
            localStorage.setItem("email", data.email);
            toggleRegistrationForm()
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
                return;
            }
        })
        .then(function (data) {
            setUser(data.id, data.email, data.password);
            setLog(true)
            localStorage.setItem("token", data.id);
            localStorage.setItem("email", data.email);
            toggleLoginForm()
        })
        .catch(function (err) {
            console.error(
                "Il y a eu un problème avec l'opération fetch:",
                err.message
            );
        });
    }

    function Logout() {
        setLog(false)
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
            {(logged === false) ? (
                <React.Fragment>
                    <header className='header'>                    
                        <button className="button hover" onClick={toggleLoginForm}>Login</button>
                        <button className="button hover" onClick={toggleRegistrationForm}>Register</button>
                    </header>
                </React.Fragment>
            ) : (
                <div className="main-page">
                    <header className='header'>
                        <div className='header-right'>
                            <button className="button hover">Create a club</button>
                            <button className="button hover">Profile</button>
                            <button className="button hover" onClick={Logout}>Logout</button>
                        </div>
                    </header>
                    <SearchBar/>
                    <div>
                        <h2>My events</h2>
                    </div>
                </div>
            )}
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
