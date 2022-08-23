import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

export interface BaseResourceListComponent<T> {
    dataSource : MatTableDataSource<T>;
    sort : MatSort;
    paginator : MatPaginator;
}


export abstract class BaseResourceTableComponent<T> implements BaseResourceListComponent<T> {
    public dataSource: MatTableDataSource<T>;
    public sort: MatSort;
    public paginator: MatPaginator;

    constructor( _dataSource : MatTableDataSource<T>, _sort : MatSort, _paginator : MatPaginator) {
        this.dataSource = _dataSource;
        this.sort = _sort;
        this.paginator = _paginator;  
    }

    getSource(): MatTableDataSource<T> {
        return this.dataSource;
    }

    setSource(data : MatTableDataSource<T>): MatTableDataSource<T> {
        this.dataSource = data;
        return this.dataSource;
    }

    getPaginator() : MatPaginator {
        return this.paginator;
    }

    getSort() : MatSort {
        return this.sort;
    }
}
