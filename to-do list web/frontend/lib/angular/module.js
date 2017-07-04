angular.module("tasklist",[]);
	angular.module("tasklist").controller("lista", function($scope, $http){
		$scope.app = "To-Do List";
		var contador = 0;
		var importants = [];
		var concluded = [];
		var tasks = [];

		$scope.objectsTasks = [];
		$scope.importantTasks = [];
		$scope.concludedTasks = [];

		var isImportant = function(task){
			return importants.filter(function (thisTask){
				return task === thisTask;
			});
		}

		var isDeleted = function(task){
			var arrayOfTasks = tasks.filter(function (thisTask){
				return task === thisTask;
			});
			return arrayOfTasks.length <= 0;
		}

		$scope.adicionarTask = function(task){
			var Check = document.querySelector('input[id="addImportant"]');
  			var arrayToUse = Check.checked ? importants : tasks;
 			var whereTo = Check.checked ? $scope.importantTasks : $scope.objectsTasks;
  			task.id = arrayToUse.length;
  			task.datetime = new Date(task.datetime).toLocaleString('pt-BR', {
  				style: 'datetime'
  			});
  			arrayToUse.push(task);
  			delete $scope.task;
 			whereTo = arrayToUse.slice(0);
 			if(Check.checked){
 				$scope.importantTasks = arrayToUse;
 			} else {
 				$scope.objectsTasks = arrayToUse;
 			}
		};

		$scope.important = function(task){
			importants.push(angular.copy(task));
			tasks.splice(tasks.indexOf(task), 1);
			$scope.importantTasks = importants;
		};

		$scope.notImportant = function(important){
			tasks.push(angular.copy(important));
			importants.splice(importants.indexOf(important), 1);
			$scope.objectsTasks = tasks;
		};

		$scope.conclude = function(task){
			if(isDeleted(task)){
				alert('Error');
			} else {
				concluded.push(task);
				$scope.concludedTasks = concluded;
				tasks.splice(tasks.indexOf(task), 1);
			}
		};

		$scope.importantConclude = function(important){
			concluded.push(important);
			$scope.concludedTasks = concluded;
			importants.splice(importants.indexOf(important), 1);
		};

		$scope.delete = function(task){
			if(isDeleted(task)){
				alert('Error');
			} else {
				tasks.splice(tasks.indexOf(task), 1);
			}
		};

		$scope.importantDelete = function(task){
			importants.splice(importants.indexOf(task), 1);
		};

		$(document).ready(function(){
			$('#goImp').click(function(){
				$('#important').removeClass('hidden');
				$('#available').addClass('hidden');
				$('#concluded').addClass('hidden');
			});
			$('#goCon').click(function(){
				$('#important').addClass('hidden');
				$('#available').addClass('hidden');
				$('#concluded').removeClass('hidden');
			});
			$('#showImp').click(function(){
				$('#important').removeClass('hidden');
				$('#available').addClass('hidden');
				$('#concluded').addClass('hidden');
			});
			$('#showAva').click(function(){
				$('#important').addClass('hidden');
				$('#available').removeClass('hidden');
				$('#concluded').addClass('hidden');
			});
			$('#showCon').click(function(){
				$('#important').addClass('hidden');
				$('#available').addClass('hidden');
				$('#concluded').removeClass('hidden');
			});
		});
	});