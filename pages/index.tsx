import React from "react";
import { Flex, Spacer, Text } from "@chakra-ui/react";

import { Header, Main, Footer, Input } from "@components";

const Home: React.FC = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Main>
        <Flex direction="column">
          <Input />
          <Text mt={4} textStyle="body-18" color="main.500">
            Enter what you want to calculate or know about
          </Text>
          <Spacer />
        </Flex>
      </Main>
      <Footer />
    </Flex>
  );
};

export default Home;
