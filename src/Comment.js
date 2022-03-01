import {Box, Heading, HStack, Image, Text} from "@chakra-ui/react";
import React from "react";

function Comment({comment}) {
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
}

export default Comment