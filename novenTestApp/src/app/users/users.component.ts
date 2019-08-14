import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private apiService: UserServiceService) { }

  usersArray:any = [];
	usersEmptyArray:boolean = false;
	allTodoList:any = [];
	allTodosEmpty:boolean = false;
	selectedUser:any;
	completedArray = [];
  pendingArray = [];
  type:any;
	staticData:any = [];

  ngOnInit() {

      this.usersList();
      this.apiService.getUserDetails().subscribe(res => {
        // console.log("response:: " ,res);
        this.allTodoList = res;
        // console.log("allToDoList:: " ,this.allTodoList);

        if(this.allTodoList.length == 0){
          this.allTodosEmpty = true;
          return false;
        }
        setTimeout(()=>{this.getUserDetails(this.usersArray[0])},500)
      })
    }

      usersList(){
          this.apiService.getUsers().subscribe(res =>{
              this.staticData = res;
              this.staticData.forEach(resp => resp['isSelected'] = false);
              this.staticData[0]['isSelected'] = true;
              this.usersArray = this.staticData;
              if(this.usersArray.length == 0){
                this.usersEmptyArray = true;
                return false;
              }
      
          })
      }

      getUserDetails(data){
          this.usersArray.forEach(res => {
            (res['id'] == data.id) ? res['isSelected'] = true : res['isSelected'] = false;
          });
      
          this.completedArray = [];
          this.pendingArray = [];
          this.selectedUser = this.allTodoList.filter(res => res['userId'] == data.id);
          this.selectedUser.forEach(res => {
              (res['completed'] == true) ? this.completedArray.push(res) : this.pendingArray.push(res);
          });
          console.log('userDetails::::::43', this.selectedUser, this.completedArray, this.pendingArray);
      }

}
