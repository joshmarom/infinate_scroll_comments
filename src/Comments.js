import React, { useEffect, useReducer, useCallback, useRef } from 'react'
import { VStack, Box, Spinner } from '@chakra-ui/react'
import { commentsReducer, pageReducer } from './reducers'
import getComments from './commentsApi'
import Comment from "./Comment";

function Comments() {
    const [ pager, pagerDispatch ] = useReducer( pageReducer, { page: 0 } )
    const [ commentsData, commentsDispatch ] = useReducer( commentsReducer,{ comments:[], fetching: true } )
    let endOfComments = useRef( null );

    useEffect(() => {
        commentsDispatch( { type: 'FETCH_COMMENTS', fetching: true } )

        getComments( pager.page, 20 )
            .then( comments => {
                commentsDispatch( { type: 'STACK_COMMENTS', comments } )
                commentsDispatch( { type: 'FETCH_COMMENTS', fetching: false } )
            })
            .catch( error => {
                commentsDispatch( { type: 'FETCH_COMMENTS', fetching: false } )
                return error
            })
    }, [ commentsDispatch, pager ] );

    const scrollObserver = useCallback( node => {
        new IntersectionObserver( entries => {
            entries.forEach( entry => {
                if ( entry.intersectionRatio <= 0 ) return
                pagerDispatch( { type: 'NEXT_PAGE' } )
            } );
        }).observe( node );
    }, [ pagerDispatch ] );

    useEffect( () => {
        if ( ! endOfComments.current ) return
        scrollObserver( endOfComments.current )
    }, [ scrollObserver, endOfComments ] );

    return (
        <VStack spacing={4}>
            { commentsData.comments.map( comment => <Comment key={ comment.id } comment={ comment } /> ) }
            { commentsData.fetching && <Spinner /> }
            <Box ref={endOfComments}/>
        </VStack>
    )
}

export default Comments