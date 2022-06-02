import { Container } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import { HeroSection, HowSection, WhySection } from '../components/Landing';

const Home: NextPage = () => {
  return (
    <>
      <HeroSection />
      <Container maxW="container.lg" mt="16" mb="14">
        <WhySection />
        <HowSection />
      </Container>
    </>
  );
};

export default Home;
