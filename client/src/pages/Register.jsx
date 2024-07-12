import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios({
                method: 'post',
                url: 'https://ip.gefri.xyz/add-user',
                data: {
                    name,
                    email,
                    password
                }
            });
            localStorage.setItem('access_token', data.access_token)
            navigate('/')
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please check your input",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "848600054102-tftpfkiph7b62bugt6284mloq4ckpau9.apps.googleusercontent.com",
            callback: async (response) => {
                const googleToken = response.credential;
                try {
                    const { data } = await axios.post(
                        'https://ip.gefri.xyz/login/google',
                        {
                            googleToken,
                        }
                    )
                    localStorage.setItem('access_token', data.access_token);
                    // successToast('Login Success');
                    navigate('/')
                } catch (err) {
                    console.log(err)
                }

            },
        });
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        // window.google.accounts.id.prompt();
    }, [])

    return <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-10">
                    <div className="card rounded-3 text-black">
                        <div className="row g-0">
                            <div className="col-lg-6">
                                <div className="card-body p-md-5 mx-md-4">
                                    <div className="text-center">
                                        <img
                                            src="https://www.freepnglogos.com/uploads/genshin-impact-logo-png/character-genshin-impact-circle-icon-transparent-16.png"
                                            style={{ width: 185 }}
                                            alt="logo"
                                        />
                                        <h4 className="mt-1 mb-5 pb-1">Join Us and Make Your Own Party!</h4>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div data-mdb-input-init="" className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form2Example11">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="form2Example11"
                                                className="form-control"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div data-mdb-input-init="" className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form2Example22">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="form2Example22"
                                                className="form-control"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="text-center pt-1 mb-2 pb-5">
                                            <button
                                                data-mdb-button-init=""
                                                data-mdb-ripple-init=""
                                                className="btn btn-primary  btn-block btn-lg gradient-custom-2 mb-3"
                                                type="submit"
                                            >
                                                Log in
                                            </button>
                                            <div className="d-flex justify-content-center align-items-center" id="buttonDiv">asd</div>
                                        </div>

                                    </form>

                                </div>
                            </div>
                            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                                    <h4 className="mb-4">We are more than just a company</h4>
                                    <p className="small mb-0">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

}

