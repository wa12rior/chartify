import React from "react";
import { Container } from "@chakra-ui/react";

export const Main: React.FC = ({ children }) => {
  return (
    <Container minHeight="71vh" py={10}>
      {children}
    </Container>
  );
};
