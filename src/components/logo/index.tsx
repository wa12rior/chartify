import React from "react";

import { Text, chakra, Flex } from "@chakra-ui/react";

export const Logo: React.FC = () => {
  return (
    <Flex justifyItems="center" alignItems="center">
      <Text textStyle="logo">
        Char<chakra.b color="main.400">tify</chakra.b>
      </Text>
    </Flex>
  );
};
