import React from 'react';
import { 
    StatusBar,
    Box,
    HStack,
    IconButton,
    Icon,
    Text
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const AppBar = (props) => {

    return (
        <>
            <StatusBar _dark={{bg: 'blueGray.900'}} barStyle='light-content'/>
            <Box safeAreaTop  _dark={{bg: 'blueGray.900'}}/>
            <HStack _dark={{bg: 'blueGray.900'}} px='1' py='3' justifyContent='space-between' alignItems='center'>
                <HStack space='4' alignItems='center'>
                    <IconButton onPress={() => props.changePage('Home')} icon={<Icon size='sm' as={<MaterialIcons name='home'/>} _dark={{color: 'white'}}/>}/>
                    <Text _dark={{color: 'white'}} fontSize='20' fontWeight='bold'>Weather</Text>
                </HStack>
                <HStack space='2'>
                    <IconButton onPress={() => props.changePage('Favorites')} icon={<Icon as={<MaterialIcons name='favorite'/>} size='sm' _dark={{color: 'white'}}/>}/>
                    <IconButton onPress={() => props.changePage('Search')} icon={<Icon as={<MaterialIcons name='search'/>} _dark={{color: 'white'}}/>}/>
                </HStack>
            </HStack>
        </>  
    )
}

export default AppBar;
