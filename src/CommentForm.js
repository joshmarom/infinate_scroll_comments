import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Textarea} from '@chakra-ui/react'

const commentFormSchema = Yup.object().shape({
    email: Yup.string().email().required('Please enter your email address'),
    comment: Yup.string().required('You must enter a comment')
});

const sendComment = ( values, { isSubmitting, resetForm } ) => {
    fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values, null, 2),
    } )
        .then( response => response.json() )
        .then( data => {
            console.log( 'Success:', data );
            resetForm();
        })
        .catch( error => {
            console.error( 'Error:', error );
            isSubmitting = false;
        });
}

const CommentForm = () => (
    <Box p={16} bg={"gray.100"} borderRadius='lg'>

    <Heading as="h4" size="md" mb={4}>Leave a Comment</Heading>
    <Formik initialValues={{ email: '', comment: '' }} validationSchema={ commentFormSchema }
          onSubmit={ (values, formik) => { sendComment( values, formik ) } } >

        { (formik) => {
        const { isValid, dirty, errors , isSubmitting, touched } = formik;
        return (
            <Form>
                <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Field type="email" name="email" as={Input} bg='white' />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.comment && touched.comment}>
                    <FormLabel htmlFor='comment' mt={4}>Comment</FormLabel>
                    <Field name="comment" as={Textarea}  bg='white' />
                    <FormErrorMessage>{errors.comment}</FormErrorMessage>
                </FormControl>

                <Button as={'button'} mt={4} type={'submit'} colorScheme='blue'
                        isDisabled={isSubmitting || !(dirty && isValid)}>
                    Send Comment
                </Button>
            </Form>
        ) } }
    </Formik>
    </Box>
)

export default CommentForm