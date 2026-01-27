/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
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
    this.currentDate = new Date();
    this.masterSrv.getDashbordData().subscribe((res) => {
      this.dashboardData = res;
    });

    this.masterSrv.getAllEmployee().subscribe((data) => {
      this.employees = data;

      this.calculateKPIs();
      this.setRecentEmployees();
      this.loadJoiningChart();
      this.calculateDashboardStats();
    });
  }

  calculateKPIs() {
    this.totalEmployees = this.employees.length;
    this.maleCount = this.employees.filter((e) => e.gender === 'Male').length;
    this.femaleCount = this.employees.filter(
      (e) => e.gender === 'Female',
    ).length;
  }

  setRecentEmployees() {
    this.recentEmployees = [...this.employees]
      .sort(
        (a, b) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
      )
      .slice(0, 5);
      
  }

  loadJoiningChart() {
    if (this.joiningChart) {
      this.joiningChart.destroy();
    }

    const monthCount: any = {};

    this.employees.forEach((emp) => {
      const month = new Date(emp.createdDate).toLocaleString('default', {
        month: 'short',
      });

      monthCount[month] = (monthCount[month] || 0) + 1;
    });

    this.joiningChart = new Chart('joiningChart', {
      type: 'line',
      data: {
        labels: Object.keys(monthCount),
        datasets: [
          {
            label: 'New Employees',
            data: Object.values(monthCount),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
        ],
      },
    });
  }

  currentDate = new Date();
  departmentsCount: number = 0;
  activeEmployees: number = 0;
  avgTenure: number = 0;
  attritionRate: number = 0;


  //// working in prosss

  calculateDashboardStats(): void {
  // Departments
  this.departmentsCount = new Set(
    this.employees.map(e => e.department).filter(Boolean)
  ).size;

  // Active Employees
  this.activeEmployees = this.employees.filter(
    e => e.isActive === true
  ).length;

  // Average Tenure
  const now = new Date();
  const tenures = this.employees.map(emp => {
    const joinDate = new Date(emp.createdDate);
    const endDate = emp.exitDate ? new Date(emp.exitDate) : now;
    return (endDate.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
  });

  this.avgTenure =
    tenures.length > 0
      ? Number((tenures.reduce((a, b) => a + b, 0) / tenures.length).toFixed(1))
      : 0;

  // Attrition Rate
  const leftEmployees = this.employees.filter(e => e.exitDate).length;

  this.attritionRate =
    this.employees.length > 0
      ? Number(((leftEmployees / this.employees.length) * 100).toFixed(1))
      : 0;
}



}
