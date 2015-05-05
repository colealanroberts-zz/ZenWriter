zen.controller('homeCtrl', function($scope, $http) {

	// Path to Users Resource
    var resPath = MacGap.documentsPath;

	var existingData = MacGap.File.read(resPath + '/ZenTasksList', 'json');
    JSON.stringify(existingData);

    $scope.docs = existingData;

	JSON.stringify($scope.docs);

	$scope.loadDoc = function(doc) {
		var $editorTextArea = document.getElementById('editor-area');


		MacGap.Window.title('ZenWriter - ' + doc.name);

		$editorTextArea.innerHTML = doc.content;
	};
});

zen.controller('editorCtrl', function($scope, $http) {

	// Path to Users Resource
    var resPath = MacGap.documentsPath;

	var existingData = MacGap.File.read(resPath + '/ZenTasksList', 'json');
    JSON.stringify(existingData);

    $scope.docs = existingData;
	JSON.stringify($scope.docs);
});