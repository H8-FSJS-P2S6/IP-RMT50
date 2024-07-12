import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function AddTeam() {
    const [characters, setCharacter] = useState([])
    const fetchCharacter = async () => {
        try {
            const { data } = await axios.get('https://ip.gefri.xyz/characters', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            });
            setCharacter(data.data)
        } catch (err) {
            console.log(err);
        }
    }

    const [weapons, setWeapon] = useState([])
    const fetchWeapon = async () => {
        try {
            const { data } = await axios.get('https://ip.gefri.xyz/weapons', {
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
        fetchCharacter();
        fetchWeapon()
    }, [])

    const [udpateCharacter, setUpdateCharacter] = useState('')
    const [updateWeapon, setUpdateWeapon] = useState('')
    const navigate = useNavigate()

    const { id } = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`https://ip.gefri.xyz/party/${id}/team`,
                {
                    CharacterId: udpateCharacter,
                    WeaponId: updateWeapon
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                });
            navigate('/party')
        } catch (err) {
            // console.log(err.response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${err.response.data.message}`,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }

    useEffect(() => {
        handleSubmit()
    }, [])

    return (<>
        <div className='container d-flex justify-content-center m-5'>
            <form onSubmit={handleSubmit} className='container row w-50 justify-content-center align-content-center'>
                <div className='d-flex align-items-center justify-content-center'>
                    <label htmlFor="CharacterId">Choose a Character:</label>
                    <select name="CharacterId" id="CharacterId" type='number' onChange={(e) => setUpdateCharacter(parseInt(e.target.value))}>
                        <option value="" disabled>--Please choose an option--</option>
                        {characters.map((character) => {
                            return <>
                                <option key={character.id} value={character.id}>{character.name}</option>
                            </>
                        })}

                    </select>
                </div>
                <hr></hr>
                <div className='d-flex align-items-center justify-content-center'>
                    <label htmlFor="WeaponId">Choose a Weapon:</label>
                    <select onChange={(e) => setUpdateWeapon(parseInt(e.target.value))} type='number' name="WeaponId" id="WeaponId">
                        <option value="" disabled>--Please choose an option--</option>
                        {weapons.map((weapon) => {
                            return <>
                                <option key={weapon.id} value={weapon.id}>{weapon.name}</option>
                            </>
                        })}
                    </select>
                </div>
                <hr></hr>
                <button type='submit' className='btn btn-primary'>
                    Add
                </button>
            </form >
        </div>
    </>
    )
};

