import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  private _transformer = (node: MetaDataNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<DataNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: DataNode) => node.expandable;

}

interface MetaDataNode {
  name: string;
  children?: MetaDataNode[];
}

/** Flat node with expandable and level information */
interface DataNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: MetaDataNode[] = [
  {
    name: 'Oracle EBS Data Dictionary',
    children: [
      {
        name: 'Modules',
        children: [
          { name: 'EBS Data Dictionary Diagram' },
          {
            name: 'Tables',
            children: [{ name: 'FND_APPLICATION (Applications)' },
            { name: 'FND_COLUMNS (Columns)' },
            { name: 'FND_FOREIGN_KEY_COLUMNS (Foreign key columns)' },
            { name: 'FFND_FOREIGN_KEYS (Foreign keys)' },
            { name: 'FFND_INDEX_COLUMNS (Index columns)' },
            { name: 'FFND_INDEXES (Indexes)' },
            { name: 'FFND_LOOKUP_TYPES (Lookup types)' },
            { name: 'FFND_LOOKUP_VALUES (Lookup values)' },
            { name: 'FFND_PRIMARY_KEY_COLUMNS (Primary key columns)' },
            { name: 'FFND_PRIMARY_KEYS (Primary keys)' },
            { name: 'FFND_TABLES (Tables)' },
            { name: 'FFND_VIEW_COLUMNS (View columns)' },
            { name: 'FFND_VIEWS (Views)' }]
          },
        ]
      },
      { name: 'Tables' },
    ]
  }
];
