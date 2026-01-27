/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IChildDept, IParentDept, IProject, IProjectEmployee } from '../model/interface/master';
import { Employee } from '../model/class/Employee';
import { environment } from '../../environment';


@Injectable({
  providedIn: 'root',
})
export class MasterService {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;

  
  
  
  
  getAllEmployee(): Observable<Employee[]> {
    // if (environment.useMockData) {
      return this.http.get<Employee[]>('assets/employees.json');
     
      // return this.http.get<Employee[]>(`${this.apiUrl}GetAllEmployees`);
    }

    getAllDepartments():Observable<IApiResponse<IParentDept[]>> {
      // if (environment.useMockData) {
      return this.http.get<IApiResponse<IParentDept[]>>('assets/departments.json');
       // }
      // return this.http.get<IApiResponse<IParentDept[]>>(this.apiUrl + "GetParentDepartment"); // return only department list
    }

    
  // getAllProjects():Observable<any[]>{
  //   // if (environment.useMockData) {
  //   return this.http.get<any[]>('assets/project.json');
  //     // }
  //     // return this.http.get<IProject[]>(this.apiUrl + "GetAllProjects");
      
  // }


   getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>('assets/project.json');
  }

   getProjectEmployee(): Observable<IProjectEmployee[]>{
    return this.http.get<IProjectEmployee[]>('assets/project_employee.json');
    // return this.http.get<IProjectEmployee[]>(this.apiUrl+ "GetAllProjectEmployees");
  }

    updateEmployee(emp : Employee):Observable<IApiResponse<Employee>>{    
      return this.http.put<IApiResponse<Employee>>(this.apiUrl + `UpdateEmployee/${emp.employeeId}`,emp);
    }
  
    deleteEmployee(id : number):Observable<IApiResponse<Employee>>{    
      return this.http.delete<IApiResponse<Employee>>(this.apiUrl + "DeleteEmployee/" + id );
    }
    
    saveEmployee(emp : Employee) {
      return this.http.post<IApiResponse<Employee>>(`${this.apiUrl}CreateEmployee`,emp);
    }
    
  saveProject(emp : Employee):Observable<IProject>{
    return this.http.post<IProject>(`${this.apiUrl}CreateProject`,emp);
  }

  getProjectById(id: number):Observable<IProject>{
    return this.http.get<IProject>(this.apiUrl + "GetProject/"+ id);
  }

  getProjectUpdate(proj: IProject):Observable<IProject>{
    return this.http.put<IProject>(this.apiUrl + "UpdateProject/"+ proj.projectId,proj);
  }

  getChildDeptByIdDept(deptid : number) {
    return this.http.get<IApiResponse<IChildDept[]>>(`${this.apiUrl}GetChildDepartmentByParentId?deptId=${deptid}`);
  }
  deleteProject(id: number):Observable<IProject>{
    return this.http.delete<IProject>(this.apiUrl + "DeleteProject/"+ id);
  }

 

  saveProjectEmployee(emp: IProjectEmployee): Observable<IProject>{
    // debugger
    return this.http.post<IProject>(this.apiUrl+ "CreateProjectEmployees",emp);
  }

  updateProjectEmployee(proj: IProjectEmployee): Observable<IProjectEmployee>{
    // debugger
    return this.http.put<IProjectEmployee>(this.apiUrl+ "UpdateProjectEmployees" + proj.empProjectId, proj);
  }

  getDashbordData(){
    return this.http.get(this.apiUrl + "GetDashboard");
  }
}
