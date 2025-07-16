import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from './contact-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ConfigService } from '../../core/services/config.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/toast/toast.service';

@Component({
  selector: 'app-contact',
  imports: [RouterModule, FormsModule,CommonModule],
  standalone: true,
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {
  formData = {
    name: '',
    email: '',
    number: '',
    subject: '',
    recipient: '',
    body: ''
  };
  helloMessage = '';
   employees: any[] = []; 

  constructor(private contactService: ContactService, private configService: ConfigService, private router: Router, private toastService: ToastService) {}

  ngOnInit(): void {
    this.configService.employees$.subscribe(employees => {
      this.employees = employees;
    });
  }

submit(form: NgForm): void {
  console.log(form);
  if (form.valid) {
    this.contactService.sendMessage(this.formData).subscribe({
      next: (response) => {
        console.log('Request succeeded:', response);
        this.toastService.show('Message sent successfully!', 'success');
        form.resetForm();
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.error('Request failed:', err);
        this.toastService.show('Failed to send message. Please try again.', 'error');
      },
      complete: () => {
        console.log('POST request completed.');
      }
    });
  } else {
    this.toastService.show('Please fill out all required fields.', 'error');
  }
}
}
