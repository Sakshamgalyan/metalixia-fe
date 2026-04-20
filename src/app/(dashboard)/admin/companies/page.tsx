import CompanyContextProvider from "@/context/Admin/Company";
import CompaniesCompt from "@/components/dashboard/Admin/Companies/CompaniesCompt";

export default function CompaniesPage() {
    return (
        <CompanyContextProvider>
            <CompaniesCompt />
        </CompanyContextProvider>
    );
}