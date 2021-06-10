import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { KInputOptions } from 'ksh-list-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  opts: KInputOptions;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      ids: [[ 'kshitij', 'Uttam', 'Sunita', 'Samu', 'Rugved' ]]
    });

    this.opts = {
      maxHeight: 100,
      regexp: null,  //Regular expression to validate. default null
      valueLabel: 'Family Members' //Name of the field
    };
  }

  submit() {
    console.log(this.form.value);
  }

  get ids() : AbstractControl {
    return this.form.get('ids');
  }
}
