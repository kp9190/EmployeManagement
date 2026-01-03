import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { IProject } from '../../model/interface/master';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent {
  projectForm: FormGroup = new FormGroup({});

  emplList: Observable<Employee[]> = new Observable<[]>();
  masterSrv = inject(MasterService);
  activateRoute = inject(ActivatedRoute)
  
  constructor() {
    this.emplList = this.masterSrv.getAllEmployee();
    this.initializeForm();
    this.activateRoute.params.subscribe((res:any)=>{
      if(res.id !== 0){
        this.getProject(res.id)
      }
    })
  }

  initializeForm( data?: IProject) {
    this.projectForm = new FormGroup({
      projectId: new FormControl(data ? data.projectId : 0),
      projectName: new FormControl(data ? data.projectName : ''),
      clientName: new FormControl(data ? data.clientName : ''),
      startDate: new FormControl(data ? data.startDate : ''),
      leadByEmpId: new FormControl(data ? data.leadByEmpId : ''),
      contactPerson: new FormControl(data ? data.contactPerson : ''),
      contactNo: new FormControl(data ? data.contactNo : ''),
      emailId: new FormControl(data ? data.emailId : ''),
    });
  }

getProject(id: number){

  this.masterSrv.getProjectById(id).subscribe((res:IProject)=>{
    this.initializeForm(res)
  },err=>{
    alert('Api Error');
  })
}

onSaveProject(){
  const formValue = this.projectForm.value;
  this.masterSrv.saveProject(formValue).subscribe((res:IProject)=>{
    alert("Project Created");
    this.projectForm.reset();
  },err=>{
    alert('API Error');
  })
}

onUpadte(){
  const formValue = this.projectForm.value;
  this.masterSrv.getProjectUpdate(formValue).subscribe((res:IProject)=>{
    alert("Project Update");
    this.projectForm.reset();
  },err=>{
    alert('API Error');
  })
}


}
