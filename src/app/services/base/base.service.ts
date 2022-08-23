import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public dataSource !: MatTableDataSource<any>;
  public sort !: MatSort;
  public paginator !: MatPaginator;
  public dataSourceBids !: MatTableDataSource<any>;
  public dataSourceComments !: MatTableDataSource<any>;

  constructor(private tableDataSource : MatTableDataSource<any>, private tableSort : MatSort, private tablePaginator : MatPaginator) {
    this.dataSource = this.tableDataSource;
    this.sort = this.tableSort;
    this.paginator = this.tablePaginator;
  }

  getSource(): MatTableDataSource<any> {
    return this.dataSource;
  }

  setSource(data : MatTableDataSource<any>): MatTableDataSource<any> {
      this.dataSource = data;
      return this.dataSource;
  }

  getPaginator() : MatPaginator {
      return this.paginator;
  }

  getSort() : MatSort {
      return this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

}
