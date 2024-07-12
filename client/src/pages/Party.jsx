import { useEffect, useState } from "react";
import PartyCard from "../components/PartyCard";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Party() {
    const [parties, setParty] = useState([])
    const fetchParty = async (e) => {
        // e.preventDefault()
        try {
            const { data } = await axios.get('https://ip.gefri.xyz/party', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            });
            // console.log(data.party)
            setParty(data.party)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchParty();
    }, [])
    let result = ''
    const [character, setCharacter] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await axios({
                method: `POST`,
                url: 'https://ip.gefri.xyz/which-is-better',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                data: { character }
            });
            console.log(data.data.character.recommended_Weapon, 'di CLIENT')
            // setCharacter(data.character.recommended_Weapon)
            Swal.fire({

                title: "This is the best weapon for " + character,
                text: data.data.character.recommended_Weapon,
                // icon: "question"
            });
        } catch (err) {
            console.log(data)
        }
    }
    useEffect(() => {
        // handleSubmit();
    }, [])
    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const result = await axios({
                method: `POST`,
                url: `https://ip.gefri.xyz/party`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            })
            // console.log(result)
            navigate('/party')
        } catch (err) {
            console.log(err)
        }
    }

    return <>
        <div className="container d-flex ">

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Character</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Character"
                        value={character}
                        onChange={(e) => setCharacter(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Input your character and we'll tell you the character's best weapon
                    </small>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

            {/* <div className="col">
                <label htmlFor="exampleInputPassword1">Result</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Best weapon"
                    value={result}
                />
            </div> */}
        </div>
        <div className="container d-flex justify-content-center">
            <Link to={`/party/` + `${parties.length > 0 ? parties[0].id + '/team' : ''}`}>
                <button className="btn btn-success">Add Team</button>
            </Link>
            <button onClick={handleClick}>
                <button className="btn btn-success">Add Party</button>
            </button>
        </div >
        <div className="container d-flex gap-2 p-1">
            {
                parties.map((party) => {
                    return <div className="">
                        <PartyCard key={parties.id} party={party} fetchParty={fetchParty} />
                    </div>
                })
            }
        </div>
    </>
}