import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  newUser: User;

  public selectedUser: User;

  closeResult='';

  constructor(private userService: UserService, private modalService: NgbModal) {
    this.userForm = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl('')
    });
    this.newUser= new User;
  }
  
  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      console.log(users);
      this.users = users
    });
  }
  deleteUser(content:any,selUser: User) {
    this.selectedUser = selUser;
    console.log(selUser);
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `${result}`;
      console.log(this.closeResult);
      if(this.closeResult=='confirmar'){
        this.confirmarDelete(selUser.id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  confirmarDelete(id: number){
    this.userService.deleteUser(id).subscribe({
      next: data => {
        console.log('Delete successful');
        this.getUsers();
      },
      error: error => {
        console.error('There was an error!', error);
        this.getUsers();
      }
    });
  }
  openAdd(content: any) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `${result}`;
      if(this.closeResult=='confirmar'){
        this.validarDataNew();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editUser(content: any,selUser: User){
    this.selectedUser = selUser;
    console.log(selUser);

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `${result}`;
      console.log(this.closeResult);
      if(this.closeResult=='confirmar'){
        console.log(selUser.id);
        this.validarData(selUser);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  validarDataNew(){
    this.newUser.username=this.userForm.get('userName')?.value;
    this.newUser.email=this.userForm.get('email')?.value;

    this.userService.postUser(this.newUser).subscribe(result=>{
      console.log(result);
      this.users.push(result);
      this.getUsers;
    });
  }
  validarData(selUser:User){
    selUser.username=this.userForm.get('userName')?.value;
    selUser.email=this.userForm.get('email')?.value;
    
    this.userService.postUser(selUser).subscribe(result=>{
      console.log(result);
      this.getUsers;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

