import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '@styles/404.css'

import policeStationEntrance from '@assets/images/404/police_station_entrance.png'
import policeStationHall from '@assets/images/404/police_station_hall.png'
import policeStationStatue from '@assets/images/404/police_station_statue.png'
import quarter from '@assets/images/404/quarter.png'
import racoonCity from '@assets/images/404/racoon_city.png'
import safeRoom from '@assets/images/404/safe_room.png'
import sewers from '@assets/images/404/sewers.png'
import starsRoom from '@assets/images/404/stars_room.png'

import zombie404Img from '@assets/images/404/zombie_404_dog.png'

export default function NotFound() {
    const audioRef = useRef(null)
    const [blocked, setBlocked] = useState(false)
    const [muted, setMuted] = useState(false)

    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            audio.muted = true
            audio.play().then(() => {
                setTimeout(() => { audio.muted = false }, 500)
            }).catch(() => {
                setBlocked(true)
            })
        }
    }, [])

    const handleAudioControl = () => {
        const audio = audioRef.current
        if (!audio) return

        if (blocked) {
            // desbloqueia autoplay
            audio.muted = false
            audio.play()
            setBlocked(false)
            setMuted(false)
        } else {
            // alterna mute/unmute
            audio.muted = !audio.muted
            setMuted(audio.muted)
        }
    }

    return (
        <div className="notfound-container">

            <audio ref={audioRef} loop preload="auto">
                <source src="/audio/Not_Found.ogg" type="audio/ogg" />
                <source src="/audio/Not_Found.mp3" type="audio/mpeg" />
                Seu navegador não suporta áudio.
            </audio>

            <button onClick={handleAudioControl} className="audio-btn" style={{ fontFamily: 'Resident Evil, sans-serif' }}>
                {blocked ? '🔊 Unmute' : muted ? '🔊 Unmute' : '🔇 Mute'}
            </button>

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
                <p className="warning-text" style={{ fontFamily: 'Resident Evil, sans-serif' }}>
                    You're lost in Raccoon City
                </p>

                <img src={zombie404Img} alt="Zombie Dogs Resident Evil 404" className="zombie-404-img" />
            </div>

            <p className="hint-text" style={{ fontFamily: 'Resident Evil, sans-serif' }}>
                The page you're looking for has been devoured by Cerberus
            </p>

            <Link to="/" className="back-btn" style={{ fontFamily: 'Resident Evil, sans-serif' }}>
                Return to saferoom
            </Link>
        </div>
    )
}
