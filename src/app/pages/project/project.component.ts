import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { IParentDept, IProject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-project',
  imports: [RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{

projectList: IProject[] = [];
masterSrv = inject(MasterService);
router = inject(Router);

ngOnInit(): void {
  this.getProjects();
}

getProjects(){
  this.masterSrv.getAllProjects().subscribe((res:IProject[])=>{
    this.projectList = res;
  })
}

onEditProject(id: number){
  this.router.navigate(['new-project',id])
}

onDeleteProject(id: number){

}

}
