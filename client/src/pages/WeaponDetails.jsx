import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function WeaponDetails() {
    const { id } = useParams()
    const [weapon, setWeapon] = useState([])
    const fetchWeapon = async () => {
        try {
            const { data } = await axios.get(`https://ip.gefri.xyz/weapons/${id}`, {
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

    return <>
        <div className="container w-10 d-flex flex-wrap justify-content-center m-5">
            <div className="">
                <img src={weapon.imgUrl} alt="" />
            </div>
            <div className="d-flex flex-column mt-5">
                <p>Name : {weapon.name}</p>
                <p>Rarity : {weapon.rarity}</p>
                <p>Effect : {weapon.effect}</p>
            </div>
        </div>
    </>
}