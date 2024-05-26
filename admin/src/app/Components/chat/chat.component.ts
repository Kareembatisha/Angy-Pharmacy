import { Component } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  messagedata: any[] = [];
  messageForm: FormGroup;
  constructor(
    private _ChatService: ChatService,
    private formbuilder: FormBuilder
  ) {
    this.messageForm = this.formbuilder.group({
      message: new FormControl('', [
        Validators.required,
        // Validators.minLength(6),
      ]),
    });
  }

  get message() {
    return this.messageForm.get('message');
  }

  ngOnInit(): void {
    this.getAllmessages();
  }

  getAllmessages() {
    this._ChatService.getAllChat().subscribe({
      next: (data) => {
        console.log(data.unansweredPrescriptions);
        this.messagedata = data.unansweredPrescriptions;
        console.log(this.messagedata);
      },
    });
  }
  answer(id: number) {
    console.log(id);
    this.messageForm.patchValue({
      // Populate all form fields with selected medicine details

    });
  }
}
