import { useEffect } from 'react';

const useDocumentTitle = (pageTitle: string) => {
  useEffect(() => {
    document.title = `${pageTitle} - Kalkdoktor`;
  }, [pageTitle]);
};

export default useDocumentTitle;
