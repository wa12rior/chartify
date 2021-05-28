import {
  Box,
  Text,
  Button,
  Flex,
  Divider,
  NumberInput,
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { calculateFunc, getMathObject, getZeroOfAFunction } from "../../utils";

import { useEffect, useState } from "react";
import { VictoryChart } from "victory-chart";
import { VictoryScatter } from "victory-scatter";
import { VictoryAxis } from "victory-axis";
import { VictoryLine } from "victory-line";
import { VictoryTheme } from "victory-core";
import { VictoryTooltip } from "victory-tooltip";
import React from "react";
import { Card } from "@components";

interface PlotProps {
  expression: string | string[];
  title: string;
  showRoots?: boolean;
}

export const Plot: React.FC<PlotProps> = ({ expression, title, showRoots }) => {
  let minimalStep = 0.5;
  ["sin", "cos", "tan"].filter((item) => {
    if (expression.includes(item)) minimalStep = 0.1;
  });

  const [data, setData] = useState([]);
  const [min, setMin] = useState(-10);
  const [max, setMax] = useState(10);
  const [step, setStep] = useState(minimalStep);
  const [input, setInput] = useState([min, max, step]);
  const [roots, setRoots] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      const math = getMathObject(true);
      // evaluate the expression repeatedly for different values of x
      const xValues = math
        .range(input[0], input[1] + input[2], input[2])
        .toArray();

      const xRoots = math.range(input[0], input[1] + 1, 1).toArray();

      const chart = [];
      const chunks = [];

      let plot = [];
      let counter = 1;

      xRoots.map((x, index) => {
        let num;
        const xVal = math.round(x, 3);
        try {
          num = math.number(calculateFunc(expression, xVal));
        } catch (error) {
          num = calculateFunc(expression, xVal);
        }

        if (num != "Infinity" && num != "-Infinity" && !isNaN(num)) {
          if (index != xValues.length - 1) {
            const nextNum = math.round(xValues[index + 1], 3);
            if (
              nextNum != "Infinity" &&
              nextNum != "-Infinity" &&
              !isNaN(nextNum)
            ) {
              chunks.push([xVal, nextNum]);
            }
          }
        }
      });

      xValues.map(function (x, index) {
        let num;
        const xVal = math.round(x, 3);
        try {
          num = math.number(calculateFunc(expression, xVal));
        } catch (error) {
          num = calculateFunc(expression, xVal);
        }
        if (num == "Infinity" || num == "-Infinity" || isNaN(num)) {
          counter++;
          chart.push(plot);
          plot = [];
          return false;
        }

        plot.push({
          x: xVal,
          y: math.round(num, 3),
        });

        // if (num !== false) {
        //   X.push(x);
        //   Y.push(num);
        //   console.log(1);
        // } else {
        //   counter++;
        //   plots.push({
        //     x: X,
        //     y: Y,
        //   });
        //
        //   X = [];
        //   Y = [];
        //   xValues[index] = null;
        // }
      });
      chart.push(plot);
      setData(chart);

      const r = [];

      chunks.map((arr) => {
        const zero = getZeroOfAFunction(arr[0], arr[1], expression);

        if (!r.includes(zero) && zero !== false) {
          r.push(zero);
        }
      });

      setRoots(
        r.filter((item) => {
          return item !== undefined;
        }),
      );
    } catch (err) {
      alert(err);
    }
  }, [input]);

  return (
    <>
      <Flex
        px={8}
        py={6}
        mb={12}
        _hover={{
          "box-shadow": "30px 10px 0px 10px rgba(238,108,77,1)",
        }}
        borderBottom="1px"
        borderLeft="1px"
        borderRight="1px"
        borderColor="gray.200"
        transition="0.2s ease"
        flexDirection="column"
        boxShadow="0px 10px 0px 10px rgba(238,108,77,1)"
      >
        <Box>
          <Text mb={4} textStyle="body-20" fontWeight="500">
            {title}&nbsp;
          </Text>
          <Divider />
          <Flex
            mt={4}
            flexDirection={{ base: "column", lg: "row" }}
            alignItems="center"
            maxWidth={{ base: "400px", lg: "initial" }}
          >
            <FormControl mx={2} my={{ base: 2, lg: 0 }}>
              <FormLabel>
                <Text textStyle="body-16">Minimum</Text>
              </FormLabel>
              <NumberInput
                step={5}
                min={-500}
                max={max - 5}
                defaultValue={min}
                onChange={(valueAsString, valueAsNumber) => {
                  setMin(valueAsNumber);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper color="main.400" />
                  <NumberDecrementStepper color="main.400" />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText fontFamily="Raleway">
                Left range of chart
              </FormHelperText>
            </FormControl>
            <FormControl mx={2} my={{ base: 2, lg: 0 }}>
              <FormLabel>
                <Text textStyle="body-16">Maximum</Text>
              </FormLabel>
              <NumberInput
                step={5}
                defaultValue={max}
                onChange={(valueAsString, valueAsNumber) => {
                  setMax(valueAsNumber);
                }}
                min={min + 5}
                max={500}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper color="main.400" />
                  <NumberDecrementStepper color="main.400" />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText fontFamily="Raleway">
                Right range of chart
              </FormHelperText>
            </FormControl>
            <FormControl mx={2} my={{ base: 2, lg: 0 }}>
              <FormLabel>
                <Text textStyle="body-16">Step</Text>
              </FormLabel>
              <NumberInput
                step={0.1}
                defaultValue={step}
                onChange={(valueAsString, valueAsNumber) => {
                  setStep(valueAsNumber);
                }}
                min={0.01}
                max={100}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper color="main.400" />
                  <NumberDecrementStepper color="main.400" />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText fontFamily="Raleway">Accuracy</FormHelperText>
            </FormControl>
            <Button
              minWidth="150px"
              my={{ base: 2, lg: 0 }}
              mx={4}
              onClick={() => {
                setInput([min, max, step]);
              }}
            >
              Generate
            </Button>
          </Flex>
        </Box>

        <VictoryChart theme={VictoryTheme.material}>
          {data.map((item, index) => (
            <VictoryLine
              key={index}
              style={{ data: { stroke: "orange" } }}
              data={item}
              x="x"
              y="y"
            />
          ))}
          {data.map((item, index) => (
            <VictoryScatter
              data={item}
              key={index}
              x="x"
              y="y"
              samples={25}
              labelComponent={<VictoryTooltip />}
              labels={({ datum }) => `x: ${datum.x} y: ${datum.y}`}
              size={1}
              style={{ data: { fill: "tomato" } }}
            />
          ))}
          <VictoryAxis
            crossAxis
            // tickFormat={() => ""}
            domain={[min, max]}
            theme={VictoryTheme.material}
            standalone={false}
          />
          <VictoryAxis
            // tickFormat={() => ""}
            dependentAxis
            crossAxis
            domainPadding={{ y: 5 }}
            theme={VictoryTheme.material}
            standalone={false}
          />
        </VictoryChart>
      </Flex>
      {showRoots && <Card label={"Roots:"} expression={roots.join(", ")} />}
    </>
  );
};
