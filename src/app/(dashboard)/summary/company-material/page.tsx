import CompanyMaterialCompt from "@/components/dashboard/summary/CompanyMaterial/CompanyMaterialCompt";
import CompanyMaterialContextProvider from "@/context/Summary/CompanyMaterial";

const Page = () => {
    return (
        <CompanyMaterialContextProvider>
            <div className="">
                <CompanyMaterialCompt />
            </div>
        </CompanyMaterialContextProvider>
    );
};

export default Page;
