import React, { useEffect, useState } from 'react';
import {
    Icon,
    Image, 
    Heading, 
    Text, 
    HStack, 
    Center, 
    Spinner, 
    View, 
    FlatList, 
    IconButton 
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const Weather = (props) => {

    const [currentLocation, setCurrentLocation] = useState([]);
    const [currentForecast, setCurrentForecast] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (isLoading)
        {
            const city = props.cityList.find(item => item.name.toLowerCase() === props.city.toLowerCase());
            setCurrentLocation(city)
            if (props.favorites.find(item => item.location.name.toLowerCase() === props.city.toLowerCase()))
                setIsFavorite(true)
            else
                setIsFavorite(false)
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely,hourly,alerts&appid=${props.apiKey}&units=metric`)
            .then(response => response.json())
            .then(json => {
                setCurrentForecast(json)
                setIsloading(!isLoading)
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }, [])

    const handleFavorites = () => {
        let favs = []
        if (props.favorites.find(item => item.location.name.toLowerCase() === currentLocation.name.toLowerCase()))
        {
            props.favorites.forEach(item => {
                if (item.location.name.toLowerCase() !== props.city.toLowerCase())
                    favs.push(item)
            })
        }
        else
        {
            favs = props.favorites.concat([{location: currentLocation, forecast: currentForecast}])
        }
        setIsFavorite(!isFavorite)
        props.manageFavorites(favs)
    }

    const getDate = (dt) => {
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        let date = new Date(dt * 1000)
        return `${days[date.getDay()]}\n${date.toLocaleDateString()}`
    }
    
    return (
        <View _dark={{ bg: 'blueGray.900' }} height='100%'>
        {
            isLoading ? (
                <Center _dark={{ bg: 'blueGray.900' }}>
                    <Spinner size='sm' color='gray.500'/>
                </Center>
            ) : (
                <Center>
                    <Center _dark={{ bg: 'blueGray.900' }}>
                        <Heading size='lg'>
                            {currentLocation.name}, {currentLocation.country}
                            <IconButton onPress={() => {handleFavorites()}} _pressed={{bg: 'blueGray.900'}} icon={<Icon size='sm' as={<MaterialIcons name={isFavorite ? ('favorite') : ('favorite-border')}/>}/>}/>
                        </Heading>
                        <Center _dark={{ bg: 'blueGray.900' }}>
                            <Image source={{uri: `http://openweathermap.org/img/wn/${currentForecast.current.weather[0].icon}@2x.png`}} alt={{uri: `http://openweathermap.org/img/wn/${currentForecast.current.weather[0].icon}@2x.png`}} size='xl'/>
                            <Text bold fontSize='3xl'>{currentForecast.current.temp}˚</Text>
                        </Center>
                    </Center>
                    <FlatList 
                        data={currentForecast.daily}
                        keyExtractor={itemData => itemData.dt.toString()}         
                        renderItem={({item}) => (
                            <HStack>
                                <Center>
                                    <Text>{getDate(item.dt)}</Text>
                                </Center>
                                <Center>
                                    <Image source={{uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}} alt={{uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}} size='sm'/>
                                </Center>
                                <Center >
                                    <Text>{item.temp.day}˚/{item.temp.night}˚</Text>
                                </Center>
                            </HStack>
                        )}
                    />
                </Center>
            )
        }
        </View>
    )
}

export default Weather;
