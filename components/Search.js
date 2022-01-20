import React, { useEffect, useState } from 'react';
import {
    Center,
    Icon,
    Box,
    Divider,
    Heading,
    Input,
    VStack,
    FlatList,
    Pressable,
    Text,
    KeyboardAvoidingView,
    AlertDialog
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const Search = (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchFail, setSearchFail] = useState(false);

    const inputHandler = (str) => {
        const reg = /([^a-zA-Z ])/
        setSearchTerm(str.replace(reg, ''))
    }

    const confirmSearch = () => {
        if (props.cityList.find(item => item.name.toLowerCase() === searchTerm.toLowerCase()))
        {
            props.search(searchTerm)
            props.changePage('Home')
        }
        else
            setSearchFail(true)
    }

    const getSuggestions = () => {
        let tmp = []
        if (searchTerm !== '')
            props.cityList.forEach(item => {
                if (item.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1)
                    tmp.push(item)
            })
        setSuggestions(tmp)
    }

    const selectSuggestion = (text) => {
        props.search(text)
        props.changePage('Home')
    }

    useEffect(() => {
        getSuggestions()
    }, [searchTerm])

    return (
        <VStack
            _dark={{ bg: 'blueGray.900' }}
            space={5}
            width='100%'
            height='100%'
            divider={<Box><Divider/></Box>}
        >
            <VStack width='100%' space={5} alignItems='center' >
                <Heading fontSize='lg'>Search</Heading>
                <Input
                    placeholder='Search'
                    onChangeText={text => {inputHandler(text)}}
                    value={searchTerm}
                    onSubmitEditing={() => confirmSearch()}
                    color='black'
                    variant='filled'
                    width='75%'
                    bg='gray.100'
                    borderRadius='10'
                    size='xl'
                    py='1'
                    px='2'
                    placeholderTextColor='gray.500'
                    _hover={{bg: 'gray.200', borderWidth: 0}}
                    borderWidth='0'
                    InputLeftElement={
                        <Icon 
                            ml='2'
                            size='5'
                            color='gray.500'
                            as={<Ionicons name='ios-search'/>}
                        />
                    }
                />
                <AlertDialog isOpen={searchFail} onClose={() => {setSearchFail(!searchFail)}}>
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>Search failed!</AlertDialog.Header>
                        <AlertDialog.Body>
                            Can't find data for this search try another!
                        </AlertDialog.Body>
                    </AlertDialog.Content>
                </AlertDialog>
                <KeyboardAvoidingView h={{base: '370px', lg: 'auto'}} width='75%'>
                    <FlatList
                        data={suggestions}
                        keyExtractor={itemData => {itemData.id.toString()}}
                        keyboardShouldPersistTaps='always'
                        initialNumToRender={5}
                        renderItem={({item, index}) => {
                            return(
                                <Pressable key={index} onPress={() => {selectSuggestion(item.name)}}>
                                    <Center borderRadius='10' mb='1' bg='gray.100' color='black' p='5' width='100%'>
                                        <Text color='black'>{item.name}</Text>
                                    </Center>
                                </Pressable>
                            )
                        }}
                    />
                </KeyboardAvoidingView>
            </VStack>
        </VStack>
    )
}

export default Search;
