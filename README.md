# Patient Records 

## About
This is a [Next.js](https://nextjs.org/docs) application built by Steven Duque for a technical screening. 
The application allows a user, from the stored `users.json`, to login and see appointments and medications. This application
uses simple in memory storage for the sake of simplicity. 

### Some of the technologies used:
- [Typescript](https://www.typescriptlang.org/)
- GraphQL
- React hooks
- [Styled components](https://styled-components.com/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

### Structure
- `pages`
-- Contains components that NextJS will render to page
- `pages/api`
-- Contains api handlers - i.e., /api/graphql
- `appointments`
-- Contains components related to appointments UI
- `medications`
-- Contains components related to medications UI
- `users`
-- Contains user/auth related queries and context provider
- `primitives`
-- Contains primitive styled html components to be shared throughout UI
- `components`
-- Contains shared components
- `routes`
-- Contains exported ROUTES and protected route HOC
- `hooks`
-- Contains hooks to be shared throughout the app
- `graphql`
-- Contains all graphql related schema code
- `apollo`
-- Contains apollo config and HOC helpers for NextJS

## Running the application locally

Create a `.env.local` containing the following environment variables:
```
APP_SECRET=some_app_secret_here
MAPS_API_KEY='maps-api-key-here'
```
`APP_SECRET` is used to sign and verify the JWT token for a user. 
`MAPS_API_KEY` is a google maps API key used to display appointment location information and geocode addresses.

Running the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application uses a file located at `/graphql/users/users.json` for basic authentication. 
App user credentials: 
- email: `test@test.com`
- password: `Password123`

## Running tests
Tests are ran using the Jest test runner. Test were written using [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
and test utilities from [@apollo/client](https://www.apollographql.com/docs/react/development-testing/testing/).

To run tests, execute the following:
```bash
npm run test
# or
yarn test
```

## Running eslint
```bash
npm run lint
# or
yarn lint
```

## Notes for review / improvements
- Could have used `getServerSideProps` for server side rendering - and not using apollo client on the frontend
- Could have `/api/login` endpoint which hits the `/api/graphql` endpoint and sets a HTTP Secure cookie
