import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent{

  isFormVisiable = signal<boolean>(false)
  masterSrv = inject(MasterService);
  employeeList = signal<Employee[]>([])
  parentDeptList = signal<IParentDept[]>([])
  childDeptList = signal<IChildDept[]>([])
  parentDeptId: number = 0
  employeeObj: Employee = new Employee();
  count = this.employeeList.length;
  
  
  constructor(){
    this.getEmployees()
  }

   ngOnInit() {
   this.getParentDept();
  }

  getParentDept(){
    this.masterSrv.getAllDepartments().subscribe((res)=>{
      this.parentDeptList.set(res.data);
    })
  }

  getParentDeptChange(){
    this.masterSrv.getChildDeptByIdDept(this.parentDeptId).subscribe((res:IApiResponse)=>{
      this.childDeptList.set(res.data)
    })
  }

 onSave() {

  if (!this.employeeObj.employeeName ||
      !this.employeeObj.emailId ||
      !this.employeeObj.password ||
      !this.employeeObj.gender ||
      !this.employeeObj.role ||
      this.employeeObj.deptId <= 0) {
    alert('Please fill all required fields');
    return;
  }

  this.masterSrv.saveEmployee(this.employeeObj).subscribe({
    next: res => {
      console.log('Employee saved successfully', res);
      this.isFormVisiable.set(false);
      this.getEmployees();
      this.employeeObj = new Employee();
    },
    error: err => {
      console.error('Error status:', err.status);
      console.error('Error body:', err.error);
    }
  });
}

getEmployees(){
      this.masterSrv.getAllEmployee().subscribe((res)=>{
      this.employeeList.set(res)
    })

}


onEdit(data: Employee){
  this.employeeObj = data;
  this.isFormVisiable.set(true)
}

onUpdate(){
  this.masterSrv.updateEmployee(this.employeeObj).subscribe((res:IApiResponse)=>{
    debugger;
    alert("Employee Update");
    this.getEmployees();
    this.employeeObj = new Employee();
  },err=>{
    alert('Api Error');
  })
}

onDelete(id : number){
  const isDelete = confirm("Are you sure want to Delete");
  if(isDelete){
      this.masterSrv.deleteEmployee(id).subscribe((res:IApiResponse)=>{
    // debugger;
    alert("Employee Update");
    this.getEmployees();
  },err=>{
    alert('Api Error');
  })
  }
}



}