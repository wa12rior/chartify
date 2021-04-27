import { Flex, Box, Button } from "@chakra-ui/react";
import { Input as ChakraInput } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { serialize } from "../../utils";

export const Input: React.FC = (props) => {
  const [expression, setExpression] = useState("");

  const handleChange = (value) => {
    setExpression(
      serialize({
        expression: value,
      }),
    );
  };

  return (
    <Flex>
      <ChakraInput {...props} onChange={(e) => handleChange(e.target.value)} />
      <Box ml={4}>
        <Link href={`/solution?${expression}`}>
          <Button cursor="pointer" bgColor="primary.500" as="a">
            Calculate
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};
