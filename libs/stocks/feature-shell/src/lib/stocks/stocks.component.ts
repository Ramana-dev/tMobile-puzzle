import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { differenceInCalendarYears } from 'date-fns';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  fromDate: Date;
  toDate: Date;
  quotes$ = this.priceQuery.priceQueries$;
  maxDate =  new Date();

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {}

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate } = this.stockPickerForm.value;
      const period = this.differenceInYears(toDate, fromDate);
      this.priceQuery.fetchQuote(symbol, period,fromDate.getTime(), toDate.getTime() );
    }
  }

  differenceInYears(toDate, fromDate) {
    const years = differenceInCalendarYears(toDate, fromDate);
    switch (true) {
      case (years <= 1):
        return '1y';

      case (years <= 2):
        return '2y';

      case (years < 5):
        return '4y';

      case (years < 6):
        return '5y';

      default:
        return 'max';
    }
  }

}