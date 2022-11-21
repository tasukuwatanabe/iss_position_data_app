import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [geocode, setGeocode] = useState({
      lat: { jp: '', val: 0 },
      lon: { jp: '', val: 0 }
    });

    useEffect(() => {
        fetch('https://api.wheretheiss.at/v1/satellites/25544')
            .then((res) => res.json())
            .then((data) => {
                const latVal = Math.round(Math.abs(Number(data.latitude)) * 10000) / 10000;
                const lonVal = Math.round(Math.abs(Number(data.longitude)) * 10000) / 10000;
                const latJp = latVal > 0 ? '北緯' : '南緯';
                const lonJp = lonVal > 0 ? '西経' : '東経';

                setGeocode({
                  lat: { jp: latJp, val: latVal },
                  lon: { jp: lonJp, val: lonVal },
                });
            });
    }, []);

    return (
        <div>
            <h1>ISS Position Data App</h1>
            <p>現在の国際宇宙ステーションの座標</p>
            <p>{geocode.lat.jp}: {geocode.lat.val}</p>
            <p>{geocode.lon.jp}: {geocode.lon.val}</p>
        </div>
    );
}

export default App;
