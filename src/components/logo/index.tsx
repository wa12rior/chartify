import React from "react";

import { Text, chakra, Flex } from "@chakra-ui/react";
import Link from "next/link";
export const Logo: React.FC = () => {
  return (
    <Flex justifyItems="center" alignItems="center">
      <Link href="/">
        <a>
          <Text textStyle="logo">
            Char<chakra.b color="main.400">tify</chakra.b>
          </Text>
        </a>
      </Link>
    </Flex>
  );
};
