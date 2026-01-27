/* eslint-disable @angular-eslint/prefer-inject */
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { MasterService } from '../../service/master.service';
import { AsyncPipe} from '@angular/common';
import { IProject } from '../../model/interface/master';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent implements OnInit{
  projectForm: FormGroup = new FormGroup({});
  isprojectupdate = false;
  emplList: Observable<Employee[]> = new Observable<[]>();
  masterSrv = inject(MasterService);
  activateRoute = inject(ActivatedRoute)
  
  constructor(private router: Router,private routers: ActivatedRoute) {
    this.emplList = this.masterSrv.getAllEmployee();
    this.initializeForm();
    this.activateRoute.params.subscribe((res)=>{
      if(res['employeeId'] !== 0){
        this.getProject(res['employeeId'])
      }
    })
  }

  ngOnInit() {
  const id = this.routers.snapshot.paramMap.get('id');

  if (id) {
    this.isprojectupdate= true;
    this.loadProject(+id);
  }
}

  initializeForm( data?: IProject) {
    this.projectForm = new FormGroup({
      projectId: new FormControl(data ? data.projectId : 0),
      projectName: new FormControl(data ? data.projectName : ''),
      clientname: new FormControl(data ? data.clientname : ''),
      startDate: new FormControl(data ? data.startDate : ''),
      endDate: new FormControl(data ? data.endDate : ''),
      leadByEmpId: new FormControl(data ? data.leadByEmpId : '')
    });
  }

getProject(id: number){

  this.masterSrv.getProjectById(id).subscribe((res:IProject)=>{
    this.initializeForm(res)
  },()=>{
    alert('Api Error');
  })
}

onSaveProject(){
  const formValue = this.projectForm.value;
  this.masterSrv.saveProject(formValue).subscribe(()=>{
    alert("Project Created");
    this.projectForm.reset();
    this.router.navigate(['/projects']);
  },()=>{
    alert('API Error');
  })
}

onUpadte(){
  const formValue = this.projectForm.value;
  console.log(formValue);
  
  this.masterSrv.getProjectUpdate(formValue).subscribe(()=>{
    alert("Project Update");
    this.projectForm.reset();
    this.router.navigate(['/projects']);
  },()=>{
    alert('API Error');
  })
}

loadProject(id: number) {
  this.masterSrv.getProjectById(id).subscribe(project => {
   
    this.projectForm.patchValue({
      projectId: project.projectId,
      projectName: project.projectName,
      startDate: project.startDate?.split('T')[0] ,
      endDate: project.endDate?.split('T')[0],
      clientname: project.clientname,
      leadByEmpId : project.leadByEmpId
    });
  });
}



}
