import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";

interface IProps<T> {
  keyField: string;
  data: T[];
  columns: any[];
}

function DataEntityTable<T>({ keyField, data, columns }: IProps<T>) {
  return (
    <BootstrapTable
      keyField={keyField}
      data={data}
      columns={columns}
      filter={filterFactory()}
      bordered
      striped
    />
  );
}

export default DataEntityTable;
