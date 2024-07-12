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

    return

};

