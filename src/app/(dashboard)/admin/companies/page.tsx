import CompaniesCompt from "@/components/dashboard/Admin/Companies/CompaniesCompt";
import CompanyContextProvider from "@/context/admin/Company";

export default function CompaniesPage() {
    return (
        <CompanyContextProvider>
            <CompaniesCompt />
        </CompanyContextProvider>
    );
}