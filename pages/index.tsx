import React from "react";
import { Flex } from "@chakra-ui/react";

import { Header, Main, Footer } from "@components";

const Home: React.FC = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Main />
      <Footer />
    </Flex>
  );
};

export default Home;
