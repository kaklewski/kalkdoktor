import { useToast } from '@chakra-ui/react';

const useShowToast = () => {
  const toast = useToast();
  const isAndroidDevice = /Android/i.test(navigator.userAgent);

  const showToast = (
    title: string,
    status: 'success' | 'warning',
    hideOnAndroid: boolean = false,
  ) => {
    if (isAndroidDevice && hideOnAndroid) return;

    toast({
      title: title,
      status: status,
      isClosable: true,
      duration: 2000,
    });
  };

  return showToast;
};

export default useShowToast;
