angular.module('storyCtrl', ['storyService'])

.controller('StoryController', function(Story){

	var vm = this;


	Story.allMyStory()
		.success(function(data){

			vm.stories = data;

		});

	vm.createStory = function(){

		vm.message = '';
		Story.create(vm.storyData)
			.success(function(data){

				vm.storyData = ''; /// clear up the form

				vm.message = data.message;

				vm.stories.push(data);
			});

	};

	

		


})

.controller('AllStoryController', function(Story, $rootScope){

	var vm = this;



	Story.all_lobs()
		.success(function(data){

			vm.lobs = data;
			$rootScope.lobs = data;
			console.log($rootScope.lobs);

		});

	vm.get_sub_lob = function(lob_id){
		console.log(lob_id);

		Story.sub_lobs_by_lob(lob_id)
		.success(function(data){

			vm.sublobs = data;
			$rootScope.sublobs = data;
			console.log($rootScope.sublobs);

		});

	};

	vm.get_projects = function(sub_lob_id){
		console.log(sub_lob_id);
		$rootScope.selectedSubLob = sub_lob_id;

		Story.projects_by_sub_lob(sub_lob_id)
		.success(function(data){

			vm.projects = data;
			$rootScope.projects = data;
			console.log($rootScope.projects);

		});

	};

	vm.get_projects_by_title = function(project){
		console.log(project);
		console.log($rootScope.selectedSubLob);
		$rootScope.selectedProject = project;

		Story.get_projects_by_title($rootScope.selectedSubLob, project)
		.success(function(data){

			vm.projects = data;
			$rootScope.projects = data;
			console.log($rootScope.projects);

		});

	};

	vm.get_projects_by_year = function(year){
		console.log(year);
		console.log($rootScope.selectedSubLob);
		$rootScope.selectedYear = year;

		Story.get_projects_by_year($rootScope.selectedSubLob, $rootScope.selectedProject, year)
		.success(function(data){

			vm.projects = data;
			$rootScope.projects = data;
			console.log($rootScope.projects);

		});

	};

	vm.get_projects_by_quarter = function(quarter){
		console.log(quarter);
		console.log($rootScope.selectedSubLob);
		$rootScope.selectedQuarter = quarter;

		Story.get_projects_by_quarter($rootScope.selectedSubLob, $rootScope.selectedProject, $rootScope.selectedYear, quarter)
		.success(function(data){

			vm.projects = data;
			$rootScope.projects = data;
			console.log($rootScope.projects);

		});

	};

	vm.get_projects_by_month = function(month){
		console.log(month);
		console.log($rootScope.selectedSubLob);
		$rootScope.selectedMonth = month;

		Story.get_projects_by_month($rootScope.selectedSubLob, $rootScope.selectedProject, $rootScope.selectedYear, $rootScope.selectedQuarter, month)
		.success(function(data){

			vm.projects = data;
			$rootScope.noOfMembers = data[0].no_of_members;
			console.log(data);

		});

	};
	
})