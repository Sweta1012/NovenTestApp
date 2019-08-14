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
	selectUsergraphData = [];
	showGraph = false;
	isDesc: boolean = true;
	column: string = 'id';
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
		this.graphJSON();
	}

	sortBy(array,type, property){
		this.isDesc = !this.isDesc; //change the direction    
		this.column = property;
		this.type = type;
		let direction = this.isDesc ? 1 : -1;

		array.sort(function(a, b){
			if(a[property] < b[property]){
				return -1 * direction;
			}
			else if( a[property] > b[property]){
				return 1 * direction;
			}
			else{
				return 0;
			}
		});

		if(type == 'completed'){
			this.completedArray = [...array];
		} else {
			this.pendingArray = [...array];
		}
	};

	graphJSON(){
		this.selectUsergraphData = [];
		const array = [{name:'Todo',data:[]}];
		array[0].data.push( { y: this.completedArray.length, color: '#227306'});
		array[0].data.push({ y: this.pendingArray.length, color: '#f4f70e'});
		this.selectUsergraphData = [...array];
	}
}
