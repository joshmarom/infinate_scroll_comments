import React, { useEffect, useReducer } from 'react'
import {VStack, Box, HStack, Image, Heading, Text} from '@chakra-ui/react'

function Comments() {
    const commentsReducer = ( state, action ) => {
        switch ( action.type ) {
            case 'STACK_COMMENTS':
                return { ...state, comments: state.comments.concat( action.comments ) }
            case 'FETCHING_COMMENTS':
                return { ...state, fetching: action.fetching }
            default:
                return state;
        }
    }

    const [ commentsData, commentsDispatch ] = useReducer( commentsReducer,{ comments:[], fetching: true} );

    useEffect(() => {
        const apiUrl = 'https://jsonplaceholder.typicode.com/comments';

        commentsDispatch( { type: 'FETCHING_COMMENTS', fetching: true } )

        fetch( apiUrl ).then( data => data.json() )
            .then( comments => {
                commentsDispatch( { type: 'STACK_COMMENTS', comments } )
                commentsDispatch( { type: 'FETCHING_COMMENTS', fetching: false } )
            })
            .catch( e => {
                commentsDispatch( { type: 'FETCHING_COMMENTS', fetching: false } )
                return e
            })
    }, [ commentsDispatch ] );

    return (
        <VStack spacing={4}>
            { commentsData.comments.map( comment => {
                const { body, name, email } = comment;

                return (
                    <HStack p={8} borderWidth='1px' borderRadius='lg' spacing={8}>
                        <Image src={`https://i.pravatar.cc/150?u=${email}`} w={16} borderRadius='full' />
                        <Box w='full'>
                            <Heading as="h4" size='sm' >{name}</Heading>
                            <Text>{body}</Text>
                        </Box>
                    </HStack>
                )
            } ) }
        </VStack>
    )
}

export default Comments