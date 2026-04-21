import RawMaterialCompt from "@/components/dashboard/summary/RawMaterial/RawMaterialCompt";
import RawMaterialContextProvider from "@/context/Summary/RawMaterial";

const Page = () => {
  return (
    <RawMaterialContextProvider>
      <RawMaterialCompt />
    </RawMaterialContextProvider>
  );
};

export default Page;
