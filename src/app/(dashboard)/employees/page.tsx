import EmployeesList from "@/components/dashboard/Admin/EmployeesList"
import EmployeeListProvider from "@/context/admin/EmployeeList"

const Employee = () => {
  return (
    <EmployeeListProvider>
      <EmployeesList />
    </EmployeeListProvider>
  )
}

export default Employee