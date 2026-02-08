import UploadedReport from "@/components/dashboard/summary/UploadedReports/uploadedReport"
import UploadedReportContextProvider from "@/context/admin/UploadedReports"

const Page = () => {
  return (
    <div className=''>
      <UploadedReportContextProvider>
        <UploadedReport />
      </UploadedReportContextProvider>
    </div>
  )
}

export default Page