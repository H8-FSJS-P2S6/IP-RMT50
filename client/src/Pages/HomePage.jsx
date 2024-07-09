import { useEffect, useState } from "react";
// import { Card } from "../components/card";
import axios from "axios";
// import { Navbar } from "../components/navbar";

export default function HomePage() {
  const [coins, setCoin] = useState([]);

  const fechCoin = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://api.p2.lc2s6.foxhub.space/coins",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data)
      setCoin(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fechCoin();
  }, []);

  const handdleDelete = async ({ coin }) => {
    try {
      await axios({
        method: "delete",
        url: `https://api.p2.lc2s6.foxhub.space/usercoins/${coin.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return  <div className="container d-flex flex-wrap gap-3 justify-content-center">
          {/* {coins.map((coin) => {
            return (
              <Card key={coin.id} coin={coin}  handdleDelete={handdleDelete()} />
            );
          })} */}
        </div>
    
}
