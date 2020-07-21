type TODO = any;

interface CellEditProps {
  mode?: "string" | TODO;
  beforeSaveCell?: (
    oldValue: TODO,
    newValue: TODO,
    row: TODO,
    column: TODO
  ) => TODO;
  afterSaveCell?: (
    oldValue: TODO,
    newValue: TODO,
    row: TODO,
    column: TODO
  ) => TODO;
  onStartEdit?: (
    row: TODO,
    column: TODO,
    rowIndex: TODO,
    columnIndex: TODO
  ) => TODO;
}

interface CellEdit<Props extends CellEditProps = CellEditProps> {
  rowId: string;
  dataField: string;
  newValue: any;
}

declare module "react-bootstrap-table2-editor" {
  export default function editorFactory<todo extends TODO>(
    props?: CellEditProps
  ): CellEdit;
  export enum Type {
    SELECT,
    TEXTAREA,
    CHECKBOX,
    DATE,
  }
}
