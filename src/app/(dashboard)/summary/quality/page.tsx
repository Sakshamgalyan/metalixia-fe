import QualityContextProvider from "@/context/Summary/Quality";
import QualityCompt from "@/components/dashboard/summary/Quality/QualityCompt";

const Page = () => {
  return (
    <QualityContextProvider>
      <QualityCompt />
    </QualityContextProvider>
  );
};

export default Page;
