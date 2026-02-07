import UploadedReport from "@/components/dashboard/Admin/UploadedReports/uploadedReport"
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