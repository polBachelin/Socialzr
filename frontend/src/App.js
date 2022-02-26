import './App.css';
import { useState } from 'react'
import LoginForm from './components/LoginForm'

let logged_in = localStorage.getItem('token') ? true : false;
const serverUrl = "localhost:8000"

function App() {
  
    const [user, setUser] = useState({email: "", password: ""});
    const [error, setError] = useState("");
  
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
                error = false;
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
        .catch(function (error) {
            console.error(
                "Il y a eu un problème avec l'opération fetch:",
                error.message
            );
        });
    }

    function Logout() {
        logged_in = false;
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.reload(false);
    }

    return (
        <div className="App">
            {(logged_in == false) ? (
                <LoginForm Login={Login}/>
            ) : (
            <div className="welcome">
                <h2>Welcome</h2>
                <button>Logout</button>
            </div>
        )}
        </div>
    );
}

export default App;
