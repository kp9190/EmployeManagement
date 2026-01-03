import { Component, inject, OnInit, signal } from '@angular/core';
import { IProject, IProjectEmployee } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { FormControl, FormGroup, ɵInternalFormsSharedModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-employee',
  imports: [AsyncPipe],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent implements OnInit{

  projectEmployeeList = signal<IProjectEmployee[]>([])
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

  ngOnInit(): void {
    this.getAllData();
  }

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


  getAllData(){
    this.masterSrv.getProjectEmployee().subscribe((res:IProjectEmployee[])=>{
      this.projectEmployeeList.set(res);
    });
  }




onSave(){
  const formValue = this.form.value;
  this.masterSrv.saveProjectEmployee(formValue).subscribe((res:IProject)=>{
    debugger
    alert("Employee added to Project Created");
    this.getAllData();
    this.form.reset();
  },err=>{
    alert("AIP Erre!");
  })
}  

onEdit(item: IProjectEmployee) {
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
        this.getAllData();
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
