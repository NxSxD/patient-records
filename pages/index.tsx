import React, { useEffect } from "react";
import styled from "styled-components";
import { withApollo } from "../apollo";
import { Formik, FormikHelpers } from "formik";
import { Field } from "../components";
import { ButtonPrimary, Loading } from "../primitives";
import { LOGIN } from "../login/queries";
import { useMutation } from "@apollo/react-hooks";
import { LoginVariables, AuthResponse } from "../login";
import { useRouter } from "next/router";

interface AuthProps {}

interface Values {
  email: string;
  password: string;
}

function IndexPage(props: AuthProps) {
  const router = useRouter();
  const [login, { data, loading }] = useMutation<AuthResponse, LoginVariables>(
    LOGIN
  );

  const values: Values = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
    login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
  };

  useEffect(() => {
    if (!data) return;

    const { token } = data.login;
    localStorage.setItem("auth_token", token);

    router.push("/welcome");
  }, [data]);

  return (
    <Container>
      <LoginContainer>
        <Formik initialValues={values} onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormHeading>
                Log in to view your medications and appointments today!
              </FormHeading>
              <Field label="Email" name="email" type="email" />
              <Field label="Password" name="password" type="password" />
              <ButtonPrimary type="submit" disabled={loading}>
                {loading ? <Loading /> : "Log In"}
              </ButtonPrimary>
            </Form>
          )}
        </Formik>
      </LoginContainer>
      <HeroContainer>
        <Mask>
          <ArtistCredit>
            Photo by{" "}
            <a href="https://unsplash.com/@safesolvent?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Martin Reisch
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/t/textures-patterns?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Unsplash
            </a>
          </ArtistCredit>
        </Mask>
      </HeroContainer>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormHeading = styled.h2`
  font-size: 1.1rem;
  color: #666;
  max-width: 20vw;
  text-align: center;
  margin-bottom: 2rem;
`;

const HeroContainer = styled.div`
  background: url(/peace-of-mind.jpg);
  background-size: cover;
  flex: 1;
  display: flex;
`;

const Mask = styled.div`
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 2vh;
`;

const ArtistCredit = styled.span`
  color: #fff;
  font-size: 0.9rem;
  & > a {
    color: black;
  }
`;

export default withApollo({ ssr: true })(IndexPage);
