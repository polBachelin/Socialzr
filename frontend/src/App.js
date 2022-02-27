import './App.css';
import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterFrom';
import Modal from './Modal/Modal'
import toggleModal from './Modal/ToggleModal';
import SearchBar from './components/SearchBar'
import EventsList from './components/EventsList';
import CreateClub from './components/CreateClub';
import Popup from 'reactjs-popup';
import ClubList from './components/ClubList';

export const serverUrl = "localhost:8000"

function App() {
    const [user, setUser] = useState({id: localStorage.getItem('token'), email: "", password: ""});
    const [error, setError] = useState("");
    const [logged, setLog] = useState(localStorage.getItem('token') ? true : false)
	const [open, setOpen] = useState(false);
	const closeModal = () => setOpen(false);
    let events;
    let clubs;


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
                throw 'Mauvaise réponse du serveur';
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

    async function getClubs() {
        //TODO        
    }

    async function getEvents() {
        let res = await fetch(`http://${serverUrl}/user/events`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                "Access-Control-Allow-Origin": `http://${serverUrl}`,
            },
            body: JSON.stringify({
                userID: user.id
            })
        })
	    events = await res.json();
    }

    getEvents()

    const {
        isShowing: isLoginFormShowed,
        toggle: toggleLoginForm
      } = toggleModal();
      const {
        isShowing: isRegistrationFormShowed,
        toggle: toggleRegistrationForm
      } = toggleModal();

      const {
          isShowing: isCreateClubShowed,
          toggle: toggleCreateClub
      } = toggleModal();

      const {
        isShowing: isMyClubsShowed,
        toggle: toggleMyClubs
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
                            <button className="button hover" onClick={toggleCreateClub}>Create a club</button>
                            <button className="button hover" onClick={getClubs()}>My clubs</button>
                            <button className="button hover">Profile</button>
                            <button className="button hover" onClick={Logout}>Logout</button>
                        </div>
                    </header>
                    <SearchBar/>
                    <div>
                        <h2>My events</h2>
                        <EventsList events={events}/>
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
        
        <Modal
            isShowing={isCreateClubShowed}
            hide={toggleCreateClub}
            title="Create a club">
            <CreateClub toggle={toggleCreateClub} id={user.id} tooltip={setOpen}/>
        </Modal>

        <Modal
            isShowing={isMyClubsShowed}
            hide={toggleMyClubs}
            title="Login">
            <ClubList clubs={[]}/>
        </Modal>


        <Popup open={open} position="right center" closeOnDocumentClick onClose={closeModal}>
            <div className='modal'>
                <span className='popup-content'>Club created !</span>
            </div>
        </Popup>
        </div>
    );
}

export default App;
