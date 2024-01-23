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

export const VigboDangerEmail = ({ email }: { email: string }) => (
  <Html>
    <Head />
    <Preview>Подозрительная активность в учетной записи Vigbo</Preview>
    <Body style={main}>
      <Img
        src={`https://i.imgur.com/XYIhA8T.png`}
        width="204"
        height="70"
        alt="Vigbo"
        style={logo}
      />
      <Container style={container}>
        <Section style={box}>
          <Heading style={heading}>
            Мы обнаружили подозрительную активность в вашем аккаунте.
          </Heading>
          <Text style={paragraph}>
            Если вы не пытались войти в свою учетную запись с неизвестного
            устройства, примите меры немедленно, чтобы защитить свою учетную
            запись.
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
            Если не будут предприняты необходимые меры, ваша учетная запись
            может быть подвергнута блокировке в целях предотвращения
            несанкционированного доступа.
          </Text>
        </Section>
      </Container>
      <Text style={paragraph}>Команда Vigbo</Text>
    </Body>
  </Html>
);

export default VigboDangerEmail;

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
  fontSize: "14px",
  letterSpacing: "0.1em",
  borderRadius: "125px",
  boxSizing: "border-box" as const,
  width: "100%",
  margin: "0 auto",
  textAlign: "center" as const,
};
