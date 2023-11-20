import React, { useEffect, useState } from 'react'
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';
import './buynow.css'

const Buynow = () => {

  const [cartdata, setCartdata] = useState("");
  // console.log(cartdata);

  const getdatabuy = async () => {
    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
      console.log("no data available")
    } else {
      // console.log("data cart main hain");
      setCartdata(data.carts);
    }
  };



  useEffect(() => {
    getdatabuy();
  }, []);

  return (
    <> {
      cartdata.length ? <div className='buynow_section'>
        <div className="buynow_container">
          <div className="left_buy">
            <h1>Shopping Cart</h1>
            <p>Select items</p>
            <span className='leftbuyprice'>Price</span>
            <Divider />

            {
              cartdata.map((e, k) => {
                return (
                  <>
                    <div className="item_containert">
                      <img src={e.detailUrl} alt="logo" />
                      <div className="item_details">
                        <h3>{e.title.longTitle}</h3>
                        <h3>{e.title.shortTitle}</h3>
                        <h3 className="diffrentprice">₹{e.price.cost}.00</h3>
                        <p className="unusuall">Usually dispatch in 8 days</p>
                        <p>Eligible for free shipping</p>
                        <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                        <Option deletedata={e.id} get={getdatabuy}/>
                      </div>
                      <h3 className="item_price">₹{e.price.cost}.00</h3>
                    </div>
            <Divider />

                  </>
                )
              })
            }

            <Subtotal iteam={cartdata} />
          </div>
          <Right iteam={cartdata}/>
        </div>

      </div> : ""
    }

    </>
  )
}

export default Buynow
