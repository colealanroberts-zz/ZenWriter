(function() {
    // Set Window Name
    MacGap.Window.title('ZenTasks');

    // Dev Env Var
    var DEV = true;

    // Quick Dev Log
    function logC(cmd) {
        if (DEV) {
            console.log(cmd);
        }
    }

    // Methods
    var $el = Element.prototype;

    $el.addClass = function(className) {
        this.classList.add(className);
    };

    $el.removeClass = function(className) {
        this.classList.remove(className);
    };

    $el.toggleClass = function(className) {
        this.classList.toggle(className);
    };

    $el.html = function(html) {
        this.innerHTML = html;
    };

    // Path to Users Resource
    var resPath = MacGap.documentsPath;

    // Elements
    var $inputTask     = document.querySelector('.js-input--task'),
        $btnCreateTask = document.querySelector('.js-btn--create-task'),
        $taskList      = document.querySelector('.js-task-list'),
        $overlay       = document.querySelector('.js-focus-overlay');

    // Saved Tasks
    var tasks = [];

    function updateBadgeCount(data) {
        // Count the number of keys in our returned obj
        var taskCount = Object.keys(data).length;

        // Set badge count
        MacGap.Dock.addBadge(taskCount);
    }

    function createTask() {

        var task = {
            detail: $inputTask.value
        };

        // Push the task to the tasks Array
        tasks.push(task);

        // Iterate and push to HTML list
        var taskLength = tasks.length;

        for (var i = 0; i < taskLength; i++) {
            var taskItem = '<li class="task__item">' + tasks[i].detail + '</li>';
        }

        // Add class to the $taskList
        $taskList.innerHTML += taskItem;
        
        // Save to local list
        MacGap.File.write(resPath + '/ZenTasksList', tasks, 'json');
        
        logC(tasks);

        // Clear input and hide overlay
        $inputTask.value = '';
        $overlay.removeClass('show');
        $btnCreateTask.removeClass('clickable');

        // Update the badge
        updateBadgeCount(tasks);
    }

    function notify(Title, Msg) {
        MacGap.notify({
            title: Title,
            content: Msg
        });
    }

    function getExistingList() {
        var existingData = MacGap.File.read(resPath + '/ZenTasksList', 'json');
        JSON.stringify(existingData);
        var taskCount = Object.keys(existingData).length;

        // Populate the list
        for (var i in existingData) {
            tasks.push(existingData[i].detail);
            var taskItem = '<li class="task__item">' + existingData[i].detail + '</li>';
            $taskList.innerHTML += taskItem;
        }
        
        // Concat the Array
        tasks.push(existingData);
        updateBadgeCount(existingData);
    }

    function createNewList() {
        // If we have no list then reset tasks array and create a new file
        MacGap.File.write(resPath + '/ZenTasksList', tasks, 'json');
        logC('Created a new list!');
    }

    function getAllLists() {
        var savedList = MacGap.File.exists(resPath + '/ZenTasksList');
        if (savedList === 0) {
            createNewList();
        } else  if (savedList === 1) {
            getExistingList();
        }
    }

    function validateInput() {

        // Show the focus overlay
        // $overlay.addClass('show');

        $inputTask.addEventListener('keydown', function(e) {

            var key = e.which || e.keyCode;
            if ($inputTask.value.length > 1) {
                $btnCreateTask.addClass('clickable');
                $btnCreateTask.addEventListener('click', createTask);

                if (key === 13) {
                    createTask();
                }

            } else {
                $btnCreateTask.removeClass('clickable');
            }
        });
    }

    // Test notification
    notify('ZenTasks', 'App is running!');

    // Load in lists
    getAllLists();

    // Validate our form
    $inputTask.addEventListener('focus', validateInput);

    $inputTask.addEventListener('blur', function() {
        $overlay.removeClass('show');
    });
})();