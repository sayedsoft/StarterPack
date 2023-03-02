import {Formik, Field} from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack
} from "@chakra-ui/react";
import Link from "next/link";
import TheHead from "../../components/common/TheHead";

export default function Register() {
  return (
      <>
        <TheHead title='Register'/>
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
          <Box bg="white" p={6} rounded="md" w={640}>
            <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  password_confirmation: ""
                }}
                onSubmit={(values) => {
                  alert(JSON.stringify(values, null, 2));
                }}
            >
              {({handleSubmit, errors, touched}) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <FormControl>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Field
                            as={Input}
                            id="name"
                            name="name"
                            type="text"
                            variant="filled"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <Field
                            as={Input}
                            id="email"
                            name="email"
                            type="email"
                            variant="filled"
                        />
                      </FormControl>
                      <FormControl isInvalid={!!errors.password && touched.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Field
                            as={Input}
                            id="password"
                            name="password"
                            type="password"
                            variant="filled"
                            validate={(value) => {
                              let error;

                              if (value.length < 6) {
                                error = "Password must contain at least 6 characters";
                              }

                              return error;
                            }}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.password_confirmation && touched.password_confirmation}>
                        <FormLabel htmlFor="password_confirmation">Password Confirmation</FormLabel>
                        <Field
                            as={Input}
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            variant="filled"
                            validate={(value) => {
                              let error;

                              if (value.length < 6) {
                                error = "Password must contain at least 6 characters";
                              }

                              return error;
                            }}
                        />
                        <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>
                      </FormControl>
                      <Button type="submit" colorScheme="purple" width="full">
                        Register
                      </Button>
                    </VStack>
                  </form>
              )}
            </Formik>

            <Link href='/auth/login'>Login</Link>
          </Box>
        </Flex>
      </>
  );
}
