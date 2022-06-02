import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import { Icon } from 'react-bootstrap-icons';

interface Props {
  Icon: Icon;
  title: string;
  description: string;
}

export const WhyCard = ({ Icon, description, title }: Props) => {
  return (
    <Grid
      placeItems="center"
      bg="purple.100"
      py="8"
      px="12"
      rounded="md"
      h="full"
    >
      <GridItem mb="4">
        <Icon color="#9F7AEA" size={50} />
      </GridItem>
      <GridItem mb="4">
        <Text fontWeight="bold" color="purple.400" fontSize="lg">
          {title}
        </Text>
      </GridItem>
      <GridItem mb="8">
        <Text textAlign="center" fontWeight="medium">
          {description}
        </Text>
      </GridItem>
    </Grid>
  );
};
