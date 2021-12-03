import React from 'react';


const CharCard = ({ id, name, image, species, gender, status, location }) => {
    function checkStatus(status) {
        if (status === "Alive") {
          return "text-green-700";
        } else if (status === "Dead") {
          return "text-red-700";
        } else {
          return "text-gray-700";
        }
    }

    return ( 
        <div className="flex space-x-4 mt-4 border-2 bg-white" key={id}>
          <img src={image} className="h-32"  alt="character"/>
          <div>
            <div>{name}</div>
            <div>
              <span className={checkStatus(status)}>{status} </span>-{" "}
              {species}
            </div>
            <div>
              <span className="text-gray-400">Gender: </span>
              {gender}
            </div>
            <div>
              {" "}
              <span className="text-gray-400">Location: </span>
              {location.name}
            </div>
          </div>
        </div>
     );
}
 
export default CharCard;