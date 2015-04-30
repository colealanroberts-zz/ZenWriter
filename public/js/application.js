(function() {
    // Set Window Name
    MacGap.Window.title('ZenTasks');

    // Dev Env Var
    var DEV = true;

    // Path to Users Resource
    var resPath = MacGap.documentsPath;

    if (DEV) { console.log(resPath); }

    // Elements
    var $inputTask     = document.querySelector('.js-input--task'),
        $btnCreateTask = document.querySelector('.js-btn--create-task'),
        $taskList      = document.querySelector('.js-task-list'),
        $overlay       = document.querySelector('.js-focus-overlay'),
        $proverbText   = document.querySelector('.js-proverb-text');

    // Saved Tasks
    var tasks = [];

    function createTask() {

        var task = {
            detail: $inputTask.value
        };

        // Push the task to the tasks Array
        tasks.push(task);
        console.log('current tasks are: ' + tasks);

        // Iterate and push to HTML list
        var taskLength = tasks.length;
        console.log(taskLength);

        console.log(tasks);

        for (var i = 0; i < taskLength; i++) {
            var taskItem = '<li class="task__item">' + tasks[i].detail + '</li>';
        }

        $taskList.innerHTML += taskItem;
        
        // Save to local list
        MacGap.File.write(resPath + '/ZenTasksList', tasks, 'json');
        updateList();

        // Clear input and hide overlay
        $inputTask.value = '';
        $overlay.classList.remove('show');
    }

    function setProverbText(msg) {
        $proverbText.innerHTML = msg;
    }

    function notify(Title, Msg) {
        MacGap.notify({
            title: Title,
            content: Msg
        });
    }

    function disableWebViewBounce() {
        document.ontouchmove = function(event) {
            event.preventDefault();
        };
    }

    function updateList() {
        var savedList = MacGap.File.exists(resPath + '/ZenTasksList');

        if (savedList === 0) {
            MacGap.File.write(resPath + '/ZenTasksList', tasks, 'json');
            console.log('Created a new list');
        } else  if (savedList > 0) {
            var fileDataString = MacGap.File.read(resPath + '/ZenTasksList', 'json');
            console.log('Reading in list');

            JSON.stringify(fileDataString);

            // Populate array with tasks
            tasks.push(fileDataString);

            // Count the number of keys in our returned obj
            var taskCount = Object.keys(fileDataString).length;

            if (taskCount === 0) {
                setProverbText('Zen stuff....');

            } else if (taskCount > 0) {
                
                // Set badge count
                MacGap.Dock.addBadge(taskCount);

                // Hide proverb text
                $proverbText.style.display = 'none';
            }
        }
    }

    function validateInput() {

        // Show the focus overlay
        $overlay.classList.add('show');

        $inputTask.addEventListener('keydown', function(e) {

            var key = e.which || e.keyCode;
            console.log($inputTask.value.length);

            if ($inputTask.value.length > 0) {
                $btnCreateTask.classList.add('clickable');
                $btnCreateTask.addEventListener('click', createTask);

                if (key === 13) {
                    createTask();
                }

            } else {
                $btnCreateTask.classList.remove('clickable');
            }
        });
    }

    // Test notification
    notify('ZenTasks', 'App is running!');

    // Load in lists
    updateList();
    disableWebViewBounce();

    // Validate our form
    $inputTask.addEventListener('focus', validateInput);

    $inputTask.addEventListener('blur', function() {
        $overlay.classList.remove('show');
    });
})();