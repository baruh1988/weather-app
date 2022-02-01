import React, { useEffect, useState } from 'react';
import {
    Box,
    Text,
    Pressable,
    Icon,
    HStack,
    VStack,
    Center, 
    Image
  } from 'native-base';
  import { SwipeListView } from 'react-native-swipe-list-view';
  import { MaterialIcons, Entypo } from '@expo/vector-icons';
  

const Favorites = (props) => {
    const [listData, setListData] = useState([])

    useEffect(() => {
        let data = []
        props.favorites.forEach((item, index) => {
            data.push({key: index, fav: item})
        })
        setListData(data)
    },[props.favorites])

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey])
            rowMap[rowKey].closeRow();
    }

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...props.favorites];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        props.manageFavorites(newData);
    }
    
    const renderItem = ({ item, index }) => (
        <Box key={index}>
            <Pressable _dark={{ bg: 'blueGray.900' }}>
                <Box
                    p1='4'
                    pr='5'
                    py='2'
                >
                    <HStack alignItems='center' spac={3}>
                        <Image source={{uri: `http://openweathermap.org/img/wn/${item.fav.forecast.current.weather[0].icon}@2x.png`}} alt={item.fav.forecast.current.weather[0].icon} size='xl'/>
                        <VStack>
                            <Center>
                                <Text color='white' bold>
                                    {item.fav.location.name}
                                </Text>
                            </Center>
                        </VStack>
                        <Center>
                            <Text color='white' bold>
                                {' ' + item.fav.forecast.current.temp + '˚   (swipe)'} 
                            </Text>
                        </Center>
                    </HStack>
                </Box>
            </Pressable>
        </Box>
    )

    const renderHiddenItem = (data, rowMap) => (
        <HStack flex='1' pl='2'>
            <Pressable
                w='70'
                ml='auto'
                bg='coolGray.200'
                justifyContent='center'
                onPress={() => closeRow(rowMap, data.item.key)}
                _pressed={{opacity: 0.5}}>
                <VStack alignItems='center' space={2}>
                    <Icon as={<Entypo name='cross'/>}size='xs'color='coolGray.800'/>
                    <Text fontSize='xs' fontWeight='medium' color='coolGray.800'>Cancel</Text>
                </VStack>
            </Pressable>
            <Pressable
                w='70'
                bg='red.500'
                justifyContent='center'
                onPress={() => {deleteRow(rowMap, data.item.key)}}
                _pressed={{opacity: 0.5}}
            >
                <VStack alignItems='center' space={2}>
                    <Icon as={<MaterialIcons name='delete'/>} color='white' size='xs'/>
                    <Text color='white' fontSize='xs' fontWeight='medium'>Delete</Text>
                </VStack>
            </Pressable>
        </HStack>
    )

    return (
        <Box _dark={{bg: 'blueGray.900'}} safeArea flex='1'>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-130}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000} 
                keyExtractor={itemData => itemData.key.toString()}
            />
        </Box>
    )
}

export default Favorites;
