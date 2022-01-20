import React, { useState } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import AppBar from './components/AppBar';
import Weather from './components/Weather';
import Favorites from './components/Favorites';
import Search from './components/Search';
import cityList from './assets/cityList.json';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
const theme = extendTheme({ config });

// AccuWeather parameters
const apiKey = '92677544d4349f0d885ec793f012c877'

export default function App() {

  const [selected, setSelected] = useState('Home');
  const [searchCity, setSearchCity] = useState('Beersheba');
  const [favorites, setFavorites] = useState([]);

  return (
    <NativeBaseProvider theme={theme}>
      <AppBar changePage={setSelected}/>
      {
        selected === 'Home' ? (
          <Weather 
            apiKey={apiKey}
            city={searchCity}
            favorites={favorites}
            manageFavorites={setFavorites}
            cityList={cityList}
          />
        ) : (
            selected === 'Favorites' ? (
              <Favorites 
                apiKey={apiKey}
                favorites={favorites}
                manageFavorites={setFavorites}
              />
            ) : (
              <Search search={setSearchCity} cityList={cityList} changePage={setSelected}/>
            )
        )
      }
    </NativeBaseProvider>
  );
}
