import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import React from 'react';
import { Rainbow, LockFill, Safe2Fill } from 'react-bootstrap-icons';
import { WhyCard } from './WhyCard';

export const WhySection = () => {
  return (
    <Box mb="20" mt="20">
      <Heading as="h3" mb="8">
        <Box display="inline" color="purple.400">
          Why
        </Box>{' '}
        VaultPass?
      </Heading>
      <Grid
        templateColumns={{
          md: 'repeat(3, 1fr)',
        }}
        gap="3"
      >
        <GridItem>
          <WhyCard
            Icon={Rainbow}
            title="Easy To Remember"
            description="Remember only 1 master password for everything"
          />
        </GridItem>
        <GridItem>
          <WhyCard
            Icon={LockFill}
            title="Secure"
            description="If you use our auto passowrd generator you will have a password thats hard to hack."
          />
        </GridItem>
        <GridItem>
          <Box>
            <WhyCard
              Icon={Safe2Fill}
              title="Safe"
              description="All the data we store is encrypted so that not even us can know what it is"
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
