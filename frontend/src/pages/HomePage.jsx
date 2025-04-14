import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    loadProducts();
  }, [fetchProducts]);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={'30'}
          fontWeight={'bold'}
          bgGradient={'linear(to-r, cyan.400, blue.500)'}
          bgClip={'text'}
          textAlign={'center'}
        >
          Current Products 🛍
        </Text>

        {loading ? (
          <Center w='full' py={20} flexDirection='column'>
            <Spinner size='xl' thickness='4px' color='blue.500' />
            <Text mt={4} fontSize='lg' color='gray.600'>
              Loading products...
            </Text>
          </Center>
        ) : products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w='full'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize='xl'
            textAlign={'center'}
            fontWeight='bold'
            color='gray.500'
          >
            No products found 😢{' '}
            <Link to={'/create'}>
              <Text
                as='span'
                color='blue.500'
                _hover={{ textDecoration: 'underline' }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
