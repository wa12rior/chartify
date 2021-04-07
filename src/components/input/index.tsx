import { Box } from "@chakra-ui/react";
import { Input as ChakraInput } from "@chakra-ui/react";

export const Input: React.FC = (props) => {
  return (
    <Box>
      <ChakraInput {...props} />
    </Box>
  );
};
