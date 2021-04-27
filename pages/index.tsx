import React from "react";
import { Flex, Box, Spacer, Text } from "@chakra-ui/react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { Header, Main, Footer, Input, Card } from "@components";

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
          <Flex mt={6} flexWrap="wrap" justifyContent="center">
            <Box mx={6}>
              <Card
                label="Linear function:"
                expression={
                  <Text>
                    <InlineMath math="f(x) = x + 4" />
                  </Text>
                }
              />
            </Box>
            <Box mx={6}>
              <Card
                label="Quadratic function:"
                expression={
                  <Text>
                    <InlineMath math="f(x) = x^2 + 4x + 8" />
                  </Text>
                }
              />
            </Box>
            <Box mx={6}>
              <Card
                label="And other Polynomial Functions:"
                expression={
                  <Text>
                    <InlineMath math="f(x) = x^5 + x^3 + 4x + 8" />
                  </Text>
                }
              />
            </Box>
            <Box mx={6}>
              <Card
                label="Reciprocal function:"
                expression={
                  <Text>
                    <InlineMath math="f(x) = 1/x" />
                  </Text>
                }
              />
            </Box>
            <Box mx={6}>
              <Card
                label="Exponential function:"
                expression={
                  <Text>
                    <InlineMath math="f(x) = e^x" />
                  </Text>
                }
              />
            </Box>
            <Box mx={6}>
              <Card
                label="Logarithmic function:"
                expression={
                  <Text>
                    <InlineMath math="f(x) = ln(x)" />
                  </Text>
                }
              />
            </Box>
            <Box mx={6}>
              <Card
                label="Trigonometric functions:"
                expression={
                  <Text>
                    <InlineMath math="f(x) = sin(2x)" />
                  </Text>
                }
              />
            </Box>

            <Box width="100%" textAlign="center">
              <Text textStyle="body-20" fontWeight="500">
                And More...
              </Text>
            </Box>
            {/*<Card*/}
            {/*  label="Absolute value function:"*/}
            {/*  expression={*/}
            {/*    <Text>*/}
            {/*      <InlineMath math="f(x) = |x| + 4" />*/}
            {/*    </Text>*/}
            {/*  }*/}
            {/*/>*/}
          </Flex>
        </Flex>
      </Main>
      <Footer />
    </Flex>
  );
};

export default Home;
