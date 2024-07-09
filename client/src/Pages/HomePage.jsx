import { characterCard } from "../components/card";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import "../css/home.css";
import Navbar from "../Components/NavbarUser";
import Cards from "../Components/Card";
import Footer from "../Components/Footer";
import axios from "../Utility/Axios";
import PaginationButton from "../Components/PaginationButton";
import PageSize from "../Components/PageSize";

export default function HomePage(){
const [character, setCharacter] = useState([])


const fechCharacter =  async () =>{
try {
    const {data} = await axios({
        method: 'get',
        url: 'https://api.p2.slc1.foxhub.space/Character',
       headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`},
       },
      )
      console.log(data)
setCharacter(data)
} catch (err) {
    console.log(err)
}

}
useEffect(() => {
fechCharacter()
},[])



    return <>
    <div>
    <div className="container d-flex flex-wrap gap-3 justify-content-center ">
            return <CharacterCard />
       
        
    </div>


    </div>
    
    </>
}