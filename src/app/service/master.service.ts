import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IProject, IProjectEmployee } from '../model/interface/master';
import { Employee } from '../model/class/Employee';
import { environment } from '../../environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}
  url = environment.apiUrl;
  apiUrl = this.url + "/api/EmployeeManagement/"

  getAllDepartments():Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.apiUrl + "GetParentDepartment"); // return only department list
  }

  getChildDeptByIdDept(deptid : number) {
    return this.http.get<IApiResponse>(`${this.apiUrl}GetChildDepartmentByParentId?deptId=${deptid}`);
  }

  saveEmployee(emp : Employee) {
    // debugger;
    return this.http.post<IApiResponse>(`${this.apiUrl}CreateEmployee`,emp);
  }

  getAllEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl}GetAllEmployees`);
  }

  updateEmployee(emp : Employee):Observable<IApiResponse>{    
    debugger
    return this.http.put<IApiResponse>(this.apiUrl + "UpdateEmployee/" + emp.employeeId,emp);
  }

  deleteEmployee(id : number):Observable<IApiResponse>{    
    return this.http.delete<IApiResponse>(this.apiUrl + "DeleteEmployee/" + id );
  }

  saveProject(emp : Employee):Observable<IProject>{
    return this.http.post<IProject>(`${this.apiUrl}CreateProject`,emp);
  }

  getAllProjects():Observable<IProject[]>{
    return this.http.get<IProject[]>(this.apiUrl + "GetAllProjects");
  }

  getProjectById(id: number):Observable<IProject>{
    return this.http.get<IProject>(this.apiUrl + "GetProject/"+ id);
  }

  getProjectUpdate(proj: IProject):Observable<IProject>{
    return this.http.put<IProject>(this.apiUrl + "UpdateProject/"+ proj.projectId,proj);
  }

  getProjectEmployee(): Observable<IProjectEmployee[]>{
    return this.http.get<IProjectEmployee[]>(this.apiUrl+ "GetAllProjectEmployees");
  }

  saveProjectEmployee(emp: IProjectEmployee): Observable<IProject>{
    debugger
    return this.http.post<IProject>(this.apiUrl+ "CreateProjectEmployees",emp);
  }

  updateProjectEmployee(proj: IProjectEmployee): Observable<IProjectEmployee>{
    debugger
    return this.http.put<IProjectEmployee>(this.apiUrl+ "UpdateProjectEmployees" + proj.empProjectId, proj);
  }

  getDashbordData(): Observable<any>{
    return this.http.get<any>(this.apiUrl + "GetDashboard");
  }
}
