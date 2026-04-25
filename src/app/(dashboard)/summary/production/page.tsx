import ProductionContextProvider from '@/context/Summary/Production';
import ProductionCompt from '@/components/dashboard/summary/Production/ProductionCompt';

const Page = () => {
  return (
    <ProductionContextProvider>
      <ProductionCompt />
    </ProductionContextProvider>
  );
};

export default Page;
