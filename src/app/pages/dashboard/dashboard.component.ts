import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports:[DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  masterSrv = inject(MasterService);

  dashboardData: any;
  employees: any[] = [];
  recentEmployees: any[] = [];

  totalEmployees = 0;
  maleCount = 0;
  femaleCount = 0;

  joiningChart: any;
joiningTrend: any;

  ngOnInit(): void {
 this.currentDate = new Date()
    this.masterSrv.getDashbordData().subscribe((res: any) => {
      this.dashboardData = res;
    });

    this.masterSrv.getAllEmployee().subscribe(data => {
      this.employees = data;

      this.calculateKPIs();
      this.setRecentEmployees();
      this.loadJoiningChart();
    });
  }

  calculateKPIs() {
    this.totalEmployees = this.employees.length;
    this.maleCount = this.employees.filter(e => e.gender === 'Male').length;
    this.femaleCount = this.employees.filter(e => e.gender === 'Female').length;
  }

  setRecentEmployees() {
    this.recentEmployees = [...this.employees]
      .sort((a, b) =>
        new Date(b.createdDate).getTime() -
        new Date(a.createdDate).getTime()
      )
      .slice(0, 5);
  }

  loadJoiningChart() {

    if (this.joiningChart) {
      this.joiningChart.destroy(); 
    }

    const monthCount: any = {};

    this.employees.forEach(emp => {
      const month = new Date(emp.createdDate)
        .toLocaleString('default', { month: 'short' });

      monthCount[month] = (monthCount[month] || 0) + 1;
    });

    this.joiningChart = new Chart('joiningChart', {
      type: 'line',
      data: {
        labels: Object.keys(monthCount),
        datasets: [{
          label: 'New Employees',
          data: Object.values(monthCount),
          borderWidth: 2,
          fill: false,
          tension: 0.4
        }]
      }
    });
  }

currentDate = new Date();
departmentsCount: number = 0; 
activeEmployees: number = 0; 
avgTenure: number = 0; 
attritionRate: number = 0; 
}
