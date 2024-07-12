import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, incrementByAmount } from "../features/counter/counterSlice"


export default function Demo() {
    const counter = useSelector((store) => {
        console.log(store)
        return store.counter.value
    }
    )

    const dispatch = useDispatch();

    return (
        <section id="home-page">
            <div className="container mb-3">
                <h2 className="text-center py-3">Genshin</h2>
                <div className="container d-flex flex-wrap flex-column justify-content-center gap-3 align-items-center w-50">
                    <p>Counter: <span>{counter}</span></p>
                    <hr />
                    <button onClick={() => dispatch(increment())}>Increment Counter</button>
                    <button onClick={() => dispatch(decrement())}>Decrement Counter</button>
                    <button onClick={() => dispatch(incrementByAmount(5))}>Increment By Amount</button>
                </div>
            </div>

        </section>
    )
}