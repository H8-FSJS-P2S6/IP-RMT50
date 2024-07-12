import { useEffect, useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

export default function TeamCard({ team, fetchParty }) {
    const [character, setCharacter] = useState([])
    const navigate = useNavigate()

    const fetchCharacter = async () => {
        try {
            const { data } = await axios.get(`https://ip.gefri.xyz/characters/${team.CharacterId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            });
            // console.log(data)
            setCharacter(data.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCharacter();
    }, [])

    const [weapon, setWeapon] = useState([])

    const fetchWeapon = async () => {
        try {
            const { data } = await axios.get(`https://ip.gefri.xyz/weapons/${team.WeaponId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            });
            setWeapon(data.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchWeapon();
    }, [])

    const handleDelete = async () => {
        try {
            await axios({
                method: 'DELETE',
                url: `https://ip.gefri.xyz/party/${team.PartyId}/team/${team.id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            // navigate('/party')
            fetchParty()
        } catch (err) {
            console.log(err)
        }
    }

    return <>
        <div className="card m-4 p-2" style={{ width: "18rem" }}>
            <h5 className="card-title d-flex align-text-center justify-content-center">{character.name}</h5>
            <img className="card-img-top m-1" style={{ width: "100%", height: "100%" }} src={character.wiki_url} alt="Card image cap" />
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div className="container d-flex">
                    <img className="" style={{ width: "40%", height: "40%" }} src={weapon.imgUrl} />
                    <div>
                        <p className="card-text">{weapon.name}</p>
                        <p className="card-text">Base Attack : {weapon.baseAttack} Dps</p>
                    </div>
                </div>
                <Link to={`/party/${team.PartyId}/team/${team.id}`}>
                    <button className='btn btn-success'>
                        Edit
                    </button>
                </Link>
                <button onClick={() => handleDelete()} className="btn btn-danger ml-2">
                    Delete
                </button>
            </div>
        </div>
    </>
}