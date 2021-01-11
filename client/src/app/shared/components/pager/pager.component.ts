import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize: number;
  constructor() { }
  @Output() pageChanged = new EventEmitter<number>();

  ngOnInit(): void {
  }


  onPagerChange(e: any) {
    this.pageChanged.emit(e.page);
  }

}
