import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
    title = 'DIET OF THE WORD CHURCH';
  employees!: Employee[];
  totalRecords: number = 0;
  pagination: number = 1;

  constructor(private employeeService:EmployeeService, private router: Router) { 
    this.employees = new Array();
  }

  ngOnInit()  {
    this.getEmployees();
  }
  getEmployees(): void{
    this.employeeService.getEmployeeList().subscribe(
     (response:Employee[]) => {
        this.employees = response;
        this.totalRecords= response.length;
      }
    ),
    (error : HttpErrorResponse) => {
      alert(error.message);
    }
     
    }
    renderPage(event: number) {
      this.pagination = event;
      this.getEmployees();
    }
    updateEmployee(id:number){
      this.router.navigate(['update-employee', id]);
    }
    deleteEmployee(id:number){
       this.employeeService.deleteEmployee(id).subscribe( data =>{
        console.log(data); 
        this.getEmployees();
       });
    }
    employeeDetails(id:number){
      this.router.navigate([`employee-details`, id])
    }
    onTableDataChange(event: any) {
      this.pagination = event;
      this.getEmployees();
    }
    onTableSizeChange(event: any): void {
      this.totalRecords = event.target.value;
      this.pagination = 1;
      this.getEmployees();
    }
   /* applyFilter(event:Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.employees.filter = filterValue.trim().toLocaleLowerCase();

      if(this.datasource.pagination){
        this.datasource.pagination.firstPage();
      }
    }*/
  }
  

