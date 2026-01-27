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

  getAllDepartments():Observable<IApiResponse<IParentDept[]>> {
    return this.http.get<IApiResponse<IParentDept[]>>(this.apiUrl + "GetParentDepartment"); // return only department list
  }

  getChildDeptByIdDept(deptid : number) {
    return this.http.get<IApiResponse<IChildDept[]>>(`${this.apiUrl}GetChildDepartmentByParentId?deptId=${deptid}`);
  }

  saveEmployee(emp : Employee) {
    return this.http.post<IApiResponse<Employee>>(`${this.apiUrl}CreateEmployee`,emp);
  }

  getAllEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl}GetAllEmployees`);
  }

  updateEmployee(emp : Employee):Observable<IApiResponse<Employee>>{    
    return this.http.put<IApiResponse<Employee>>(this.apiUrl + `UpdateEmployee/${emp.employeeId}`,emp);
  }

  deleteEmployee(id : number):Observable<IApiResponse<Employee>>{    
    return this.http.delete<IApiResponse<Employee>>(this.apiUrl + "DeleteEmployee/" + id );
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

  deleteProject(id: number):Observable<IProject>{
    return this.http.delete<IProject>(this.apiUrl + "DeleteProject/"+ id);
  }

  getProjectEmployee(): Observable<IProjectEmployee[]>{
    return this.http.get<IProjectEmployee[]>(this.apiUrl+ "GetAllProjectEmployees");
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
