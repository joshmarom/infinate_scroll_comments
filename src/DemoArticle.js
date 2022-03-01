import React from 'react';
import {Heading, Image, VStack} from '@chakra-ui/react'
import { LoremIpsum } from 'react-lorem-ipsum';

function DemoArticle() {
    return (
        <>
            <Image src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1548&h=750&q=60"
                   alt="Comments On Blogs Illustration" rounded={8} mb={4} />
            <Heading as="h1" mb={4}>5 Unexpected Ways Comments On Blogs Can Make Your Life Better.</Heading>
            <VStack spacing={6}>
                <LoremIpsum p={8} />
            </VStack>
        </>
    )
}

export default DemoArticle;