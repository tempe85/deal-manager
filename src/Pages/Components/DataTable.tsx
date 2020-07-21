import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";

interface IProps<T> {
  keyField: string;
  data: T[];
  columns: any[];
  afterSaveCell: (oldValue: any, newValue: any) => void;
}

function DataEntityTable<T>({
  keyField,
  data,
  columns,
  afterSaveCell,
}: IProps<T>) {
  return (
    <BootstrapTable
      keyField={keyField}
      data={data}
      columns={columns}
      filter={filterFactory()}
      bordered
      striped
      cellEdit={cellEditFactory({
        mode: "click",
        afterSaveCell,
      })}
    />
  );
}

export default DataEntityTable;
