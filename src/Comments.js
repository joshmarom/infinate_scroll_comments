import React, { useEffect, useRef, useState } from 'react'
import { VStack, Box, Spinner } from '@chakra-ui/react'
import fetchComments from './fetchComments'
import Comment from './Comment';
import useIntersectionObserver from '@react-hook/intersection-observer'

function Comments() {
    const [ comments, setComments ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ page, setPage ] = useState(0);
    let endOfComments = useRef( null );
    const { isIntersecting } = useIntersectionObserver( endOfComments );

    useEffect(() => {
        fetchComments( page )
            .then( moreComments => setComments( c => [...c, ...moreComments] ) )
            .catch( e => console.log( e ) )
            .finally( () => setLoading( false ) )
    }, [page]);

    useEffect(() => {
        if ( isIntersecting ) {
            setPage( page => page + 1 )
            setLoading(true)
        }
    }, [isIntersecting] )

    return (
        <VStack spacing={4}>
            { comments.map( comment => <Comment key={ comment.id } comment={ comment } /> ) }
            { loading && <Spinner /> }
            <Box ref={endOfComments}/>
        </VStack>
    )
}

export default Comments