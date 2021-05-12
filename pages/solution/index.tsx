import React from "react";
import { Box, Container, Flex, Skeleton, Spacer, Text } from "@chakra-ui/react";

import { Alert, AlertIcon } from "@chakra-ui/react";

import {
  Header,
  Footer,
  Main,
  Input,
  getMathObject,
  Fraction,
  Card,
} from "@components";
import { useRouter } from "next/router";
import { isFunction } from "@chakra-ui/utils";
import { getYAxisCross, getDerivative, bisection } from "../../src/utils";

import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

import { Plot } from "@components/plot";

const Solution: React.FC = () => {
  const math = getMathObject(true);

  const router = useRouter();
  const { expression } = router.query;

  let errorAlert = null;
  let computedExpression;
  let isFunc;
  const derivative = getDerivative(expression);

  try {
    computedExpression = math.evaluate(expression);
    isFunc = isFunction(computedExpression);
  } catch (error) {
    // handle error
    // TODO osobny komponent
    // TODO blad w rownaniu
    errorAlert = (
      <Box>
        <Alert status="error">
          <AlertIcon />
          Requested expression is incorrect. Check our guide and try again.
        </Alert>
        <Container
          marginTop="auto"
          marginBottom="auto"
          textAlign="center"
          mt="11%"
          py={10}
        >
          <Flex direction="column">
            <Input />
            <Text mt={4} textStyle="body-18" color="main.500">
              Enter what you want to calculate or know about
            </Text>
            <Spacer />
          </Flex>
        </Container>
      </Box>
    );
  }

  const loading = true;

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      {errorAlert ?? null}
      <Main>
        <Skeleton isLoaded={loading}>
          {!errorAlert && (
            <Box>
              <Card
                label={"Input:"}
                expression={
                  <Text>
                    <InlineMath math={expression} />
                  </Text>
                }
              />
              {!isFunc ? (
                <Card
                  label={"Result:"}
                  expression={
                    <Fraction
                      n={computedExpression.n}
                      d={computedExpression.d}
                      s={computedExpression.s}
                    />
                  }
                />
              ) : (
                <>
                  <Plot
                    title={"Function plot:"}
                    expression={expression}
                    showRoots
                  />
                  {getYAxisCross(expression).n != undefined && (
                    <Card
                      label={"Y Axis cross value:"}
                      expression={
                        <Fraction
                          n={getYAxisCross(expression).n}
                          d={getYAxisCross(expression).d}
                          s={getYAxisCross(expression).s}
                        />
                      }
                    />
                  )}
                  {derivative != undefined && (
                    <>
                      <Card
                        label={"Derivative:"}
                        expression={<InlineMath>{derivative}</InlineMath>}
                      />
                      <Plot
                        title={"Derivative plot:"}
                        expression={`f(x) = ${derivative}`}
                      />
                    </>
                  )}
                </>
              )}
            </Box>
          )}
        </Skeleton>
      </Main>
      <Footer />
    </Flex>
  );
};

export default Solution;
