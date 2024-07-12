import axios from "axios";
import Card from "../components/Carousel";
import Carousel from "../components/Carousel";
import { useSelector, useDispatch } from "react-redux";
import { setCharacter } from "../features/counter/character/characterSlice";

export default function Homepage() {
    // const characters = useSelector(state => state.character.characters)

    // const dispatch = useDispatch()

    // const fetchCharacter = async () => {
    //     try {
    //         const { data } = await axios.get('/characters', {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //             },
    //         });
    //         console.log(data)
    //         dispatch(setCharacter(data))
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return <>
        <div>
            <Carousel />
        </div>

    </>
}