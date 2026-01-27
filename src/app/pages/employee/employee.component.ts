import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  isFormVisiable = signal<boolean>(false)
  masterSrv = inject(MasterService);
  employeeList = signal<Employee[]>([])
  parentDeptList = signal<IParentDept[]>([])
  childDeptList = signal<IChildDept[]>([])
  parentDeptId = 0;
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
    this.masterSrv.getChildDeptByIdDept(this.parentDeptId).subscribe((res)=>{
      this.childDeptList.set(res.data)
    })
  }

 onSave() {
  if (this.employeeObj.employeeId) {
    // UPDATE
    this.masterSrv.updateEmployee(this.employeeObj).subscribe(
      () => {
        alert('Employee Updated');
        this.getEmployees();
        this.employeeObj = new Employee();
      },
      (error) => {
        console.error(error);
        alert('Update failed');
      }
    );
  } else {
    // CREATE
    this.masterSrv.saveEmployee(this.employeeObj).subscribe(
      () => {
        alert('Employee Created');
        this.getEmployees();
        this.employeeObj = new Employee();
      },
      (error) => {
        console.error(error);
        alert('Create failed');
      }
    );
  }
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
  this.masterSrv.updateEmployee(this.employeeObj).subscribe(()=>{
    alert("Employee Update");
    this.getEmployees();
    this.employeeObj = new Employee();

  },()=>{
    alert('Api Error');
  })
}

onDelete(id : number){
  const isDelete = confirm("Are you sure want to Delete");
  if(isDelete){
      this.masterSrv.deleteEmployee(id).subscribe(()=>{
    // debugger;
    alert("Employee Delete");
    this.getEmployees();
  },()=>{
    alert('Api Error');
  })
  }
}



}