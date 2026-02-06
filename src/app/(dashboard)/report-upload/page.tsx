import ReportUpload from "@/components/dashboard/Employees/Report/ReportUpload"
import ReportUploadContextProvider from "@/context/Employee/ReportUpload"

const ReportUploadPage = () => {
  return (
    <div className=''>
      <ReportUploadContextProvider>
        <ReportUpload />
      </ReportUploadContextProvider>
    </div>
  )
}

export default ReportUploadPage