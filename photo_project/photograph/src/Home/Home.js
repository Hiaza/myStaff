import React, { Component } from "react";
import "../index.css"

class Home extends Component {
 render() {
   return (
     <div>
        <div className="div-width-slider">
            <div className="photo-slider">
                {/* eslint-disable-next-line  */}
                <div><img src  = {process.env.PUBLIC_URL + '/images/1.jpg'} alt = "dsfds"/></div>
                {/* eslint-disable-next-line  */}
                <div><img src = {process.env.PUBLIC_URL + '/images/1.jpg'} /></div>
                {/* eslint-disable-next-line  */}
                <div><img src = {process.env.PUBLIC_URL + '/images/1.jpg'} /></div>
            </div>

            </div>
    </div>
   );
 }
}

export default Home;