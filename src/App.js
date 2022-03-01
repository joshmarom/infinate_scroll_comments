import * as React from 'react'
import {ChakraProvider, Divider} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DemoArticle from './DemoArticle'
import CommentSection from "./CommentSection";

function App() {
  return (
      <ChakraProvider>
          <Container maxW="container.md" my={20}>
              <DemoArticle />
              <Divider my={10}/>
              <CommentSection />
          </Container>
      </ChakraProvider>
  )
}

export default App;
