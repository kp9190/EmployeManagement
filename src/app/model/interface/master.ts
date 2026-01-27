

export interface IApiResponse<T>{
  data: T;
  message?: string;
  result?: boolean;
}

export interface IParentDept{   
      dept_id: number,
      dept_name: string, 
}

export interface IChildDept{   
      child_dept_id: number,
      parent_dept_id: number,
      department_name: string
}

export interface IProject{   
     projectId: number
      projectName: string
      startDate: string
      endDate: string
      clientname: string
      leadByEmpId: number
}

export interface IProjectEmployee{
      empProjectId: number;
      projectId:number;
      empId: number;
      assignedDate: string;
      role: string
      isActive: string
      
}

