import RawMaterialCompt from "@/components/dashboard/summary/RawMaterial/RawMaterialCompt";
import RawMaterialContextProvider from "@/context/Summary/RawMaterial";

const Page = () => {
    return (
        <RawMaterialContextProvider>
            <div className="">
                <RawMaterialCompt />
            </div>
        </RawMaterialContextProvider>
    );
};

export default Page;
