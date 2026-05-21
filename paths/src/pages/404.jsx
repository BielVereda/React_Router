import { Link } from 'react-router-dom'
import '@styles/404.css'
import zeroImg from '@assets/images/404/0.png'
import fourImg from '@assets/images/404/4.png'
import dogsImg from '@assets/images/404/cachorros.png'

import policeStationEntrance from '@assets/images/404/police_station_entrance.png'
import policeStationHall from '@assets/images/404/police_station_hall.png'
import policeStationStatue from '@assets/images/404/police_station_statue.png'
import quarter from '@assets/images/404/quarter.png'
import racoonCity from '@assets/images/404/racoon_city.png'
import safeRoom from '@assets/images/404/safe_room.png'
import sewers from '@assets/images/404/sewers.png'
import starsRoom from '@assets/images/404/stars_room.png'

export default function NotFound() {
    return (
        <div className="notfound-container">
            <div className="background-slideshow">
                <img src={policeStationEntrance} alt="Police Station Entrance" />
                <img src={policeStationHall} alt="Police Station Hall" />
                <img src={policeStationStatue} alt="Police Station Statue" />
                <img src={quarter} alt="Quarter" />
                <img src={racoonCity} alt="Racoon City" />
                <img src={safeRoom} alt="Safe Room" />
                <img src={sewers} alt="Sewers" />
                <img src={starsRoom} alt="Stars Room" />
            </div>

            <div className="image-container">
                <p className="warning-text">Você está perdido em Raccoon City...</p>

                <img src={dogsImg} alt="Zombie Dogs Resident Evil" className="zombie-img" />
                <div className="number-container">
                    <img src={fourImg} alt="Número 4" className="number-img four" />
                    <img src={zeroImg} alt="Número 0" className="number-img zero" />
                    <img src={fourImg} alt="Número 4" className="number-img four" />
                </div>
            </div>

            <p className="hint-text">A página que você procura foi devorada.</p>
            <Link to="/" className="back-btn">
                Voltar para a segurança
            </Link>
        </div>
    )
}
