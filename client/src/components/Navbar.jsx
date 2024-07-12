import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate()
    const token = localStorage.getItem('access_token');
    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }
    return <>
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid bg-dark d-flex flex-row justify-content-center p-1">
                <div className="navbar-brand row">
                    <div className="col">
                        <Link to={'/party'}>
                            <img
                                src="https://i.pinimg.com/736x/41/39/74/41397418d24838fd9b5f9ec808bf354c.jpg"
                                alt=""
                                width={60}
                                height={60}
                                className="d-inline-block align-text-middle rounded-circle m-2"
                            />
                        </Link>
                    </div>
                    <div className="col">
                        <Link to={'/weapons'}>
                            <img
                                src="https://t3.ftcdn.net/jpg/02/06/01/88/360_F_206018854_SduxmDjDkO4eRlkAoMWqSkQATqPtsHZA.jpg"
                                alt=""
                                width={60}
                                height={60}
                                className="d-inline-block align-text-middle rounded-circle m-2"
                            />
                        </Link>
                    </div>

                    <div className="col">
                        <Link to={'/'}>
                            <img
                                src="https://static-00.iconduck.com/assets.00/games-genshinimpact-icon-2048x2048-jyrv8s6e.png"
                                alt=""
                                width={80}
                                height={80}
                                className="d-inline-block align-text-middle"
                            />
                        </Link>
                    </div>

                    <div className="col">
                        <Link to={'/characters'}>
                            <img
                                src="https://ih1.redbubble.net/image.4526694682.5317/st,small,507x507-pad,600x600,f8f8f8.u1.jpg"
                                alt=""
                                width={60}
                                height={60}
                                className="d-inline-block align-text-middle rounded-circle m-2"
                            />
                        </Link>
                    </div>

                    {token ? (<div className="col">
                        <a onClick={() => logout()}>
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/008/302/422/original/eps10-red-user-solid-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-white-background-free-vector.jpg"
                                alt=""
                                width={60}
                                height={60}
                                className="d-inline-block align-text-middle rounded-circle m-2"
                            />
                        </a>
                    </div>) : (
                        <div className="col">
                            <Link to={'/login'}>
                                <img
                                    src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
                                    alt=""
                                    width={60}
                                    height={60}
                                    className="d-inline-block align-text-middle rounded-circle m-2"
                                />
                            </Link>
                        </div>
                    )}
                    <div className="col">
                            <Link to={'/demo'}>
                                <img
                                    src="https://st4.depositphotos.com/33133132/39116/v/450/depositphotos_391165526-stock-illustration-pixel-game-logo-design-vector.jpg"
                                    alt=""
                                    width={60}
                                    height={60}
                                    className="d-inline-block align-text-middle rounded-circle m-2"
                                />
                            </Link>
                        </div>
                </div>
            </div>
        </nav>
    </>
}

