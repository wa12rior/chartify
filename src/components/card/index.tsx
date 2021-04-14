import { Box, Text, Flex } from "@chakra-ui/react";

interface CardProps {
  label: string;
  expression: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ label, expression }) => {
  return (
    <Flex
      cursor="pointer"
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
      boxShadow="0px 10px 0px 10px rgba(238,108,77,1)"
    >
      <Box>
        <Text textStyle="body-20" fontWeight="500">
          {label}&nbsp;
        </Text>
      </Box>
      <Box>
        <Text textStyle="body-18">{expression}</Text>
      </Box>
    </Flex>
  );
};
