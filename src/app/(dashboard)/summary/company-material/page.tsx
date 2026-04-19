import CompanyMaterialCompt from "@/components/dashboard/summary/CompanyMaterial/CompanyMaterialCompt";
import CompanyMaterialContextProvider from "@/context/Summary/CompanyMaterial";

const Page = () => {
  return (
    <CompanyMaterialContextProvider>
      <CompanyMaterialCompt />
    </CompanyMaterialContextProvider>
  );
};

export default Page;
