import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const mutation = gql`
    mutation createUser(
        $email: String!, 
        $displayName: String!,
        $password: String!,
        ){
    createRestaurant(
        email: $email
        displayName: $displayName,
        password: $password,
        ) {
            _id,
            email,
            displayName,
            password
        }
    }
`;

export default () => {

    const [createUserMutation, { error }] = useMutation(mutation);

    const createUser = (email, displayName, password) => {
        createUserMutation({
            variables: {
                email,
                displayName,
                password,
            }
        }).then(() => {
            window.location.reload();
        }).catch(err => {
            console.error("MYERRORRR:" + err)
        });
    }

    return { createUser, error };
}