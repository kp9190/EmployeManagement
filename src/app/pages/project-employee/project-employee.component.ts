/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject} from '@angular/core';
import { IProject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { FormControl, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-employee',
  imports: [AsyncPipe],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent{

  // projectEmployeeList = signal<IProjectEmployee[]>([])
  projectEmployeeList = [
  {
    "empProjectId": 1,
    "projectId": 1,
    "employeeId": 1,
    "assignedDate": "2024-01-01",
    "role": "Lead"
  },
  {
    "empProjectId": 2,
    "projectId": 1,
    "employeeId": 2,
    "assignedDate": "2024-01-02",
    "role": "Member"
  },
  {
    "empProjectId": 3,
    "projectId": 2,
    "employeeId": 2,
    "assignedDate": "2024-02-01",
    "role": "Lead"
  },
  {
    "empProjectId": 4,
    "projectId": 2,
    "employeeId": 3,
    "assignedDate": "2024-02-02",
    "role": "Member"
  },
  {
    "empProjectId": 5,
    "projectId": 3,
    "employeeId": 2,
    "assignedDate": "2024-03-01",
    "role": "Lead"
  },
  {
    "empProjectId": 6,
    "projectId": 3,
    "employeeId": 4,
    "assignedDate": "2024-03-02",
    "role": "Member"
  },
  {
    "empProjectId": 7,
    "projectId": 4,
    "employeeId": 5,
    "assignedDate": "2025-12-31",
    "role": "Lead"
  },
  {
    "empProjectId": 8,
    "projectId": 4,
    "employeeId": 1,
    "assignedDate": "2026-01-01",
    "role": "Member"
  },
  {
    "empProjectId": 9,
    "projectId": 5,
    "employeeId": 3,
    "assignedDate": "2026-01-11",
    "role": "Lead"
  },
  {
    "empProjectId": 10,
    "projectId": 5,
    "employeeId": 4,
    "assignedDate": "2026-01-12",
    "role": "Member"
  }
]



  masterSrv = inject(MasterService);
  form: FormGroup = new FormGroup({});
  projectList : Observable<IProject[]> =new Observable<IProject[]>;
  employeeList : Observable<Employee[]> =new Observable<Employee[]>;
  isEditMode = false;
  selectedEmpProjectId = 0;



  constructor(){
    this.initializeForm();
    this.projectList = this.masterSrv.getAllProjects();
    this.employeeList = this.masterSrv.getAllEmployee();
  }

  // ngOnInit(): void {
  //   // this.getAllData();
  // }

  initializeForm(){
    this.form = new FormGroup({
      empProjectId: new FormControl(0),
      projectId: new FormControl(0),
      empId: new FormControl(0),
      assignedDate: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(false),

    })
  }


  // getAllData(){
  //   this.masterSrv.getProjectEmployee().subscribe((res:IProjectEmployee[])=>{
  //     this.projectEmployeeList.set(res);
  //   });
  // }




onSave(){
  const formValue = this.form.value;
  this.masterSrv.saveProjectEmployee(formValue).subscribe(()=>{

    alert("Employee added to Project Created");
    // this.getAllData();
    this.form.reset();
  },()=>{
    alert("AIP Erre!");
  })
}  

onEdit(item: any){
  this.isEditMode = true;
  this.selectedEmpProjectId = item.empProjectId;

  this.form.patchValue({
    empProjectId: item.empProjectId,
    projectId: item.projectId,
    empId: item.empId,
    assignedDate: item.assignedDate,
    role: item.role,
    isActive: item.isActive
  });
}

onUpdate() {
  const formValue = this.form.value;

  this.masterSrv
    .updateProjectEmployee(formValue)
    .subscribe({
      next: () => {
        alert('Employee updated successfully');
        // this.getAllData();
        this.form.reset();
        this.isEditMode = false;
      },
      error: () => {
        alert('API Error!');
      }
    });
}

onSubmit() {
  if (this.form.invalid) return;

  if (this.isEditMode) {
    this.onUpdate();
  } else {
    this.onSave();
  }
}



}
