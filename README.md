This is a [Next.js](https://nextjs.org/docs) application built by Steven Duque for a technical screening. 

## Running the application locally

Running the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About

### Some of the technologies used:
- [Typescript](https://www.typescriptlang.org/)
- GraphQL
- React hooks
- [Styled components](https://styled-components.com/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- [Prettier](https://prettier.io/)

### Structure
- `pages`
-- Contains components that NextJS will render to page
- `pages/api`
-- Contains api handlers - i.e., /api/graphql
- `appointments`
-- Contains components related to appointments UI
- `medications`
-- Contains components related to medications UI
- `primitives`
-- Contains primitive styled html components to be shared throughout UI
- `components`
-- Contains shared components
- `routes`
-- Contains exported ROUTES constant to be shared throughout app
- `hooks`
-- Contains hooks to be shared throughout the app
- `graphql`
-- Contains all graphql related schema code
- `apollo`
-- Contains apollo config and HOC helpers for NextJS

## Notes for review / improvements
- Could have used `getServerSideProps` for server side rendering - and not using apollo client on the FE
- Could have `/api/login` endpoint which hits the `/api/graphql` endpoint and sets an HTTP Secure cookie
