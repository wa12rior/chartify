import React, { CSSProperties } from "react";
import { Flex, Center, Text } from "@chakra-ui/react";

import { GithubIcon } from "@components/icons";

export const Footer: React.FC = () => {
  const iconStyle: CSSProperties = {
    fontSize: 22,
    color: "#fff",
    marginRight: "0.25rem",
    marginLeft: "0.25rem",
  };
  return (
    <Center bg="main.100" py={10}>
      <Flex flexDirection="column">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            textStyle="body-18"
            color="white"
            fontStyle="italic"
            fontWeight="500"
          >
            Kamil Serafin
          </Text>
          <Text
            textStyle="body-16"
            color="white"
            fontStyle="italic"
            fontWeight="500"
          >
            Projekt inżynierski
          </Text>
          <Text
            textStyle="body-16"
            color="white"
            fontStyle="italic"
            fontWeight="600"
          >
            2021
          </Text>
        </Flex>
        <Flex justifyContent="center" mt={5}>
          <a
            href="https://github.com/wa12rior"
            target="_blank"
            style={iconStyle}
          >
            <GithubIcon data-test="icon" color="white" width="28" height="29" />
          </a>
        </Flex>
      </Flex>
    </Center>
  );
};
