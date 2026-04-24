import InventoryContextProvider from "@/context/Summary/Inventory";
import DispatchCompt from "@/components/dashboard/summary/Dispatch/DispatchCompt";

const Page = () => {
  return (
    <InventoryContextProvider>
      <DispatchCompt />
    </InventoryContextProvider>
  );
};

export default Page;
