import { Center } from '@chakra-ui/react';

export default function Loader() {
  return (
    <Center h="75vh">
      {/* The loader css classes are hard-coded in the index.html file because the loader is also used there before React is loaded */}
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    </Center>
  );
}
