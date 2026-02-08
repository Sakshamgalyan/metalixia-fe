import PaySlip from "@/components/dashboard/Employees/Payslip/PaySlip";
import PayslipUpload from "@/components/dashboard/Employees/Payslip/PayslipUpload";
import UploadPaySlipContextProvider from "@/context/Employee/UploadPaySlip";

const UploadPayslipPage = () => {
  return (
    <div className="">
      <UploadPaySlipContextProvider>
        <PaySlip />
      </UploadPaySlipContextProvider>
    </div>
  );
};

export default UploadPayslipPage;
