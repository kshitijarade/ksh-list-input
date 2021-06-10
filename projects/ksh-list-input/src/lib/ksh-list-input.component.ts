import { Component, forwardRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'ksh-list-input',
  template: `
    <div class="kshitij-input-emailbox">
      <label class="value-label">
        {{ options.valueLabel ? options.valueLabel : 'Values' }}
      </label>
      <div class="control-values" id="k-email-box" [style.max-height.px]="options.maxHeight">
        <span *ngFor="let value of controlValue" class="badge badge-pill badge-light input-badge">
          {{ value }} <span class="cursor-pointer" (click)="!disabled ? removeElement(value) : false">&times;</span>
        </span>
      </div>
    </div>
    <div class="kshitij-input-container">
      <input class="form-control kshitij-input"
        (change)="valueChanged($event)"
        (blur)="onBlur()"
        (keypress)="keyPressed($event)"
        [attr.disabled]="disabled ? true : null"/>
    </div>
  `,
  styles: [
    `.kshitij-input {
      border-top: 0px;
      border-radius: 0px 0px 3px 3px;
      border: 1px solid #d4dadf;
      background: #f5f5f5;
   }

   .kshitij-input-container {
      border: 1px solid #d4dadf;
      padding: 0.5rem 0.5rem;
      background: #f5f5f5;
      border-radius: 0 0 3px 3px;
   }

   .kshitij-input:focus {
      box-shadow: none;
   }

   .kshitij-input-emailbox {
      border: 1px solid #d4dadf;
      border-radius: 3px 3px 0 0;
      padding: 0.5rem 0.5rem;
      background: #f5f5f5;
   }

   .cursor-pointer {
     cursor: pointer;
   }

   .control-values {
      overflow: auto;
      border: none;
      padding-top: 5px;
   }

   .value-label {
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.5rem;
      margin-bottom: 0px;
   }

   .input-badge {
      margin-right: 10px;
      border: 1px solid #ccc;
   }

   .input-badge .cursor-pointer {
      cursor: pointer;
   }

   .input-badge .cursor-pointer:hover {
      color: #dc3545;
   }

   label {
      display: block;
   }

   .badge-pill {
        padding-right: .6em;
        padding-left: .6em;
        border-radius: 10rem;
    }

    .badge {
        display: inline-block;
        padding: .25em .4em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25rem;
    }

    .badge-light {
      color: #212529;
      background-color: #f8f9fa;
    }

    .form-control {
      display: block;
      width: 100%;
      font-size: 1rem;
      line-height: 1.7;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: .25rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .form-control:focus {
      color: #495057;
      background-color: #fff;
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ {
    provide : NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => KshListInputComponent),
    multi : true
  }]
})
export class KshListInputComponent implements OnInit {
  onChange: (value: Array<any>) => void;
  onTouched: () => {};

  controlValue: Array<any> = [];

  @Input() disabled: boolean;
  @Input() options: KInputOptions;

  constructor() { }

  ngOnInit(): void {
    if (this.options) {
      if (this.options.maxHeight < 30) {
        this.options.maxHeight = 70;
      }
    } else {
      this.options = {
        maxHeight: 70,
        regexp: null,
        valueLabel: null
      };
    }
  }
  onBlur() {
    this.onTouched();
  }

  valueChanged(event: any) {
    event.target.value = null;
    this.onChange(this.controlValue);
  }

  keyPressed(e: KeyboardEvent) {
    if (e.key === ',' || e.key === 'Enter') {
      const value = e.currentTarget['value'].split(',');
      this.setValue(value);
      this.controlValue = this.controlValue.filter(Boolean);
      e.currentTarget['value'] = null;
      this.controlValue = this.controlValue.filter(this.getUniqueArray);
      this.onChange(this.controlValue);
      return false;
    }
  }

  removeElement(element: any) {
    this.controlValue.splice( this.controlValue.indexOf(element), 1 );
  }

  writeValue(value: any): void {
    value = value.filter(this.getUniqueArray);
    if (value) {
      this.setValue(value);
    }
  }

  setValue(array: Array<any>) {
    array.forEach(element => {
      if (this.isValidInput(element.trim())) {
        this.controlValue.push(element.trim());
        setTimeout(() => $('#k-email-box').scrollTop($('#k-email-box')[0].scrollHeight), 0);
      }
    });
  }

  getUniqueArray(value, index, self) {
    return self.indexOf(value) === index;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.onChange(this.controlValue);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  isValidInput(value: string): any {
    if (this.options.regexp) {
      return value.match(this.options.regexp);
    } else {
      return true;
    }
  }
}

export interface KInputOptions {
  maxHeight: number;
  regexp: RegExp;
  valueLabel?: string;
}
