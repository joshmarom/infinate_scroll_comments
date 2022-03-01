import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {Button, Input, Textarea} from '@chakra-ui/react'

const commentFormSchema = Yup.object().shape({
    email: Yup.string().email().required('Please enter your email address'),
    comment: Yup.string().required('You must enter a comment')
});

function CommentForm() {
  return (
      <Formik
          initialValues={{ email: '', comment: '' }}
          validationSchema={ commentFormSchema }
          onSubmit={ ( values, { isSubmitting, resetForm } ) => {
              fetch('https://jsonplaceholder.typicode.com/comments', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(values, null, 2),
              } ).then( response => response.json() )
              .then( data => {
                  console.log('Success:', data);
                  resetForm();
              })
              .catch( error => {
                  console.log('Error:', error);
                  isSubmitting = false;
              });
          }}
      >
          { (formik) => {
              const { isValid, dirty, isSubmitting } = formik;
              return (
              <Form>
                  <Field type="email" name="email" as={Input} />
                  <ErrorMessage name="email" component="div" />
                  <Field name="comment" as={Textarea} />
                  <ErrorMessage name="comment" component="div" />
                  <Button as={'button'} type={'submit'} isDisabled={isSubmitting || !(dirty && isValid)}>
                      Send Comment
                  </Button>
              </Form>
          ) } }
      </Formik>
  )
}

export default CommentForm