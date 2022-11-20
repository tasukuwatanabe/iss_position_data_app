import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [geocodeJp, setGeocodeJp] = useState({ lat: '', lon: '' });

    useEffect(() => {
        console.log('called');
        fetch('http://api.open-notify.org/iss-now.json')
            .then((res) => res.json())
            .then((data) => {
                const lat = Number(data.iss_position.latitude);
                const lon = Number(data.iss_position.longitude);
                const mark = /^-/;
                const isLatMinus = mark.exec(lat);
                const isLonMinus = mark.exec(lon);

                console.log(data);

                setGeocodeJp({
                  lat: (isLatMinus ? '北緯' : '南緯') + ': ' + Math.abs(lat),
                  lon: (isLonMinus ? '西経' : '東経') + ': ' + Math.abs(lon),
                });
            });
    }, []);

    return (
        <div>
            <h1>ISS Position Data App</h1>
            <p>現在の国際宇宙ステーションの座標</p>
            <p>{geocodeJp.lat}</p>
            <p>{geocodeJp.lon}</p>
        </div>
    );
}

export default App;
