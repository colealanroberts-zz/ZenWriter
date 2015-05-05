(function() {
    // Set Window Name
    MacGap.Window.title('ZenWriter');

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
        $btnFocusMode  = document.querySelector('.js-btn--focus-mode'),
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

    var area = document.getElementById('editor-area');
    var $countSentences  = document.getElementById('js-editor__count--sentences');
    var $countWords      = document.getElementById('js-editor__count--words');
    var $countParagraphs = document.getElementById('js-editor__count--paragraphs');

    function countWords (counter) {
        $countSentences.innerHTML = counter.sentences;
        $countWords.innerHTML = counter.words;
        $countParagraphs.innerHTML = counter.paragraphs;
    }

    Countable.live(area, countWords);

    function enableFocusMode() {
        var $editorWindow = document.querySelector('.editor');
        var $commandBar   = document.querySelector('.command-bar');
        var transitionStyle =  'all cubic-bezier(0.215, 0.61, 0.355, 1) 300ms';

        var clicked = false;

        if (!clicked) {
            $editorWindow.style.transition = transitionStyle;
            $commandBar.style.transition = transitionStyle;
            clicked = true;

            // Toggle this
            $editorWindow.toggleClass('focus-mode');
            $commandBar.toggleClass('focus-mode');
            $btnFocusMode.toggleClass('active');
        }
    }

    function getExistingList() {
        var existingData = MacGap.File.read(resPath + '/ZenTasksList', 'json');
        JSON.stringify(existingData);
        var taskCount = Object.keys(existingData).length;
        
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

    $btnFocusMode.addEventListener('click', enableFocusMode);

})();