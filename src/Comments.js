import React, { useEffect, useCallback, useRef, useState } from 'react'
import { VStack, Box, Spinner } from '@chakra-ui/react'
import fetchComments from './fetchComments'
import Comment from './Comment';

function Comments() {
    const [ comments, setComments ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ page, setPage ] = useState(0);
    let endOfComments = useRef( null );

    const scrollObserver = useCallback( node => {
        new IntersectionObserver( entries => {
            entries.forEach( entry => {
                if ( entry.intersectionRatio <= 0 ) return
                pagerDispatch( { type: 'NEXT_PAGE' } )
            } );
        }).observe( node );
    }, [ pagerDispatch ] );

    useEffect(() => {
        fetchComments( page )
            .then( moreComments => setComments( [...comments, ...moreComments] ) )
            .catch( e => console.log( e ) )
            .finally( () => setLoading( false ) )
    }, [page]);

    useEffect(() => {
        if ( ! endOfComments.current ) return
        scrollObserver( endOfComments.current )
    }, [ scrollObserver, endOfComments ] )

    return (
        <VStack spacing={4}>
            { comments.map( comment => <Comment key={ comment.id } comment={ comment } /> ) }
            { loading && <Spinner /> }
            <Box ref={endOfComments}/>
        </VStack>
    )
}

export default Comments