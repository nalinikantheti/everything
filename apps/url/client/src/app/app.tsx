import { FormEvent, useCallback, useState } from "react";
import axios from "axios";

import {Box, Text, Center } from '@chakra-ui/react';
import ShortenUrlForm from "./shortenurlform";
import { Shortened } from "./types";
import UrlList from "./url-list";


export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);

  const requestShortUrl = useCallback(
    async (inputUrl: string) => {
      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });

      const newUrl = response.data as Shortened;

      setUrls([newUrl, ...urls]);
    },
    [urls, setUrls]
  );

  
  return (
    <Center h="100vh" bg="pink.100">
      <Box w="100%" maxW="sm" p={6}>
        <Text as="h1" fontSize="2xl" fontWeight="bold" color="pink.500" mb={6} textAlign="center">
          My URL Shortener
        </Text>
        <ShortenUrlForm requestShortUrl={requestShortUrl} />
        <UrlList urls={urls} />
      </Box>
    </Center>
  );
}

export default App;
