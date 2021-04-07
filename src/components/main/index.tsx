import React from "react";
import { Container, Text, Flex, Spacer } from "@chakra-ui/react";
import { Input } from "@components";

export const Main: React.FC = () => {
  return (
    <Container marginTop="auto" marginBottom="auto" textAlign="center" py={10}>
      <Flex direction="column">
        <Input />
        <Text mt={4} textStyle="body-18" color="main.500">
          Enter what you want to calculate or know about
        </Text>
        <Spacer />
      </Flex>
    </Container>
  );
};
