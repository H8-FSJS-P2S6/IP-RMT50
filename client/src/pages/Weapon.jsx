import axios from "axios";
import { useEffect, useState } from "react";
import WeaponCard from "../components/WeaponCard";


export default function Weapon() {
    const [weapons, setWeapon] = useState([])

    const fetchCharacter = async () => {
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
    }, [])

    return <>
        <div className="container d-flex flex-wrap p-2">
            {
                weapons.map((weapon, index) => {
                    return <>
                        <WeaponCard key={weapon.id} weapon={weapon} index={index} />
                    </>

                })
            }
        </div>
    </>
}