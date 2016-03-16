import {Component, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'ngb-pager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav>
      <ul class='pager'>
        <li [class.disabled]='!hasPrev()'><a (click)='prev()'>Previous</a></li>
        <li [class.disabled]='!hasNext()'><a (click)='next()'>Next</a></li>
      </ul>
    </nav>
    `
})
export class NgbPager implements OnChanges {
  private _currentPage = 0;  // internal state
  @Input() noOfPages = 0;
  @Input() page = 0;
  @Output() pageChange = new EventEmitter();

  prev(): void {
    if (this.hasPrev()) {
      this.pageChange.emit(--this._currentPage)
    }
  }

  next(): void {
    if (this.hasNext()) {
      this.pageChange.emit(++this._currentPage)
    }
  }

  hasPrev(): boolean { return this._currentPage > 0; }

  hasNext(): boolean { return this._currentPage < this.noOfPages - 1; }

  ngOnChanges(): void { this._currentPage = Math.max(Math.min(this.page, this.noOfPages - 1), 0) }
}

// TODO:
//- inputs as string
//- what about this special CSS that puts pager navigation apart? Aligned boolean attribute?
//- aria attributes?
