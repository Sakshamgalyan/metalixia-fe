import InventoryContextProvider from '@/context/Summary/Inventory';
import InventoryCompt from '@/components/dashboard/summary/inventory/InventoryCompt';

const Page = () => {
  return (
    <InventoryContextProvider>
      <InventoryCompt />
    </InventoryContextProvider>
  );
};

export default Page;
