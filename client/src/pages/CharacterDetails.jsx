import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function CharacterDetails() {
    const { id } = useParams()
    const [character, setCharacter] = useState([])
    const fetchCharacter = async () => {
        try {
            const { data } = await axios.get(`https://ip.gefri.xyz/characters/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            });
            // console.log(data.data)
            setCharacter(data.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCharacter();
    }, [])

    return <>
        <div className="container d-flex flex-wrap justify-content-center m-5">
            <div className="">
                <img src={character.wiki_url} alt="" />
            </div>
            <div className="d-flex flex-column mt-5">
              <p>Name : {character.name}</p>
              <p>Rarity : {character.rarity}</p>
              <p>Weapon : {character.weapon}</p>
              <p>Vision : {character.vision}</p>
            </div>
        </div>
    </>
}