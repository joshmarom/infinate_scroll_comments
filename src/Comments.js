import React, { useEffect, useReducer, useCallback, useRef } from 'react'
import { VStack, Box, Spinner } from '@chakra-ui/react'
import Comment from "./Comment";

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

    const pageReducer = ( state, action ) => {
        switch ( action.type ) {
            case 'NEXT_PAGE':
                return { ...state, page: state.page + 1 }
            default:
                return state;
        }
    }

    const [ pager, pagerDispatch ] = useReducer( pageReducer, { page: 0 } )
    const [ commentsData, commentsDispatch ] = useReducer( commentsReducer,{ comments:[], fetching: true} );

    useEffect(() => {
        const startIndex = pager.page * 20;
        const endIndex = startIndex + 20;
        const apiUrl = `https://jsonplaceholder.typicode.com/comments?_start=${startIndex}&_end=${endIndex}`;

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
    }, [ commentsDispatch, pager.page ] );

    let endOfComments = useRef( null );
    const scrollObserver = useCallback( node => {
        new IntersectionObserver( entries => {
            entries.forEach( entry => {
                if ( entry.intersectionRatio > 0 ) pagerDispatch( { type: 'NEXT_PAGE' } )
            } );
        }).observe( node );
    }, [ pagerDispatch ] );

    useEffect( () => {
        if ( endOfComments.current ) {
            scrollObserver( endOfComments.current );
        }
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