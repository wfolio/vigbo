import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const VigboForgotEmail = ({ email }: { email: string }) => (
  <Html>
    <Head>
      <style>
        {`
        body {
          background-color: #F5F5F5;
        }
      `}
      </style>
    </Head>
    <Preview>Запрос на смену пароля</Preview>
    <Body style={main}>
      <Img
        src={`https://i.imgur.com/XYIhA8T.png`}
        width="102"
        height="35"
        alt="Vigbo"
        style={logo}
      />
      <Container style={container}>
        <Section style={box}>
          <Heading style={heading}>Запрос на смену пароля</Heading>
          <Text style={paragraph}>
            Если вы не подавали запроса на изменение пароля или передумали его
            изменять, просто проигнорируйте данное письмо.
          </Text>
          <Text style={paragraph}>
            Чтобы изменить пароль, перейдите по ссылке:
          </Text>
        </Section>
        <Section style={buttonContainer}>
          <Link
            style={button}
            href={`https://vigbo.wfolio.app/passwords/restore?email=${email}`}
          >
            ИЗМЕНИТЬ ПАРОЛЬ
          </Link>
        </Section>
        <Section style={box}>
          <Text style={paragraph}>
            Данная ссылка будет действительна в течение 3 суток.
          </Text>
        </Section>
      </Container>
      <Text style={paragraph}>Команда Vigbo</Text>
    </Body>
  </Html>
);

export default VigboForgotEmail;

const main = {
  backgroundColor: "#fafafa",
  fontFamily: "'Open Sans', 'Helvetica', 'Arial', 'sans-serif'",
};

const logo = {
  margin: "40px auto",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const heading = {
  color: "#000",
  fontSize: "24px",
  fontWeight: "600",
  textAlign: "center" as const,
};

const paragraph = {
  color: "#000",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400",
  textAlign: "center" as const,
};

const buttonContainer = {
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
};

const button = {
  color: "#FFFFFF",
  display: "inline-block",
  backgroundColor: "#000000",
  borderTop: "20px solid #000000",
  borderRight: "40px solid #000000",
  borderBottom: "20px solid #000000",
  borderLeft: "40px solid #000000",
  textDecoration: "none",
  textTransform: "uppercase" as const,
  fontSize: "11px",
  letterSpacing: "0.1em",
  borderRadius: "125px",
  boxSizing: "border-box" as const,
  width: "100%",
  margin: "0 auto",
  textAlign: "center" as const,
};
