import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCharacter } from "../features/counter/character/characterSlice";
import { useEffect } from "react";
import CharacterCard from "../components/CharacterCard";


export default function Character() {
    const characters = useSelector(state => state.character.characters)

    const dispatch = useDispatch()
    const fetchCharacter = async () => {
        try {
            const { data } = await axios.get('https://ip.gefri.xyz/characters', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            });
            dispatch(setCharacter(data.data))
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
                characters.map((character, index) => {
                    return <>
                        <CharacterCard key={character.id} character={character} index={index} />
                    </>

                })
            }
        </div>
    </>
}