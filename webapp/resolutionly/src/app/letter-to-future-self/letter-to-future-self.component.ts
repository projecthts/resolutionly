import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-letter-to-future-self',
  templateUrl: './letter-to-future-self.component.html',
  styleUrls: ['./letter-to-future-self.component.scss']
})
export class LetterToFutureSelfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  letterform = new FormGroup({
    content: new FormControl(' '),
    reminder: new FormControl(' ')
  })
}
