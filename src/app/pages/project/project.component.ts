/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// import { IProject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [RouterLink,DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
   projectList: any[] = [
    {
      "projectId": 1,
      "projectName": "Employee Management System",
      "startDate": "2024-01-01",
      "endDate": "2024-06-30",
      "clientName": "ABC Corp",
      "leadByEmpId": 1
    },
    {
      "projectId": 2,
      "projectName": "Payroll Automation",
      "startDate": "2024-02-01",
      "endDate": "2024-07-31",
      "clientName": "XYZ Ltd",
      "leadByEmpId": 2
    },
    {
      "projectId": 3,
      "projectName": "HR Portal",
      "startDate": "2024-03-01",
      "endDate": "2024-08-31",
      "clientName": "HR Solution Inc",
      "leadByEmpId": 2
    },
    {
      "projectId": 4,
      "projectName": "poj 3",
      "startDate": "2025-12-31",
      "endDate": "2026-01-09",
      "clientName": "rajesh",
      "leadByEmpId": 5
    },
    {
      "projectId": 5,
      "projectName": "poj 2",
      "startDate": "2026-01-11",
      "endDate": "2026-01-16",
      "clientName": "ramesh",
      "leadByEmpId": 3
    }

   ];
  masterSrv = inject(MasterService);
  router = inject(Router);

  // ngOnInit(): void {
  //   this.getProjects();
  // }

  // getProjects() {
  //   this.masterSrv.getAllProjects().subscribe({
  //     next: (res) => {
  //       this.projectList = Array.isArray(res) ? res : [];
  //     },
  //     error: (err) => {
  //       console.error('Error fetching projects:', err);
  //       this.projectList = [];
  //     }
  //   });
  // }

  onEditProject(id: number) {
    // Navigate to edit page with project id
    this.router.navigate(['new-project', id]);
  }

  onDeleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      // Remove the project from the list
      this.projectList = this.projectList.filter(p => p.projectId !== id);
      alert('Project deleted successfully!');
    }
  }
}
