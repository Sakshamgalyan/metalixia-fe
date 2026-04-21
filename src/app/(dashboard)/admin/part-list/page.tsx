import PartListCompt from "@/components/dashboard/Admin/PartList/Part";
import PartContextProvider from "@/context/admin/PartList";

export default function PartListPage() {
  return (
    <PartContextProvider>
      <PartListCompt />
    </PartContextProvider>
  );
}
