//học js 

var coursetAPi = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);
    handleCreateForm();
}

start();

function getCourses(callback) {
    fetch(coursetAPi)
        .then(function (response) {
            return response.json()
            // json.parse ; json - js types
        })

        .then(callback)
        .catch(function (err) {
            console.log(err)
        })
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');

    var htmls = courses.map(function (course) {
        return `
        <li class="course-item-${course.id}">
        <h4>${course.name}</h4>
        <p>${course.description}</p>
        </li>
        <button onclick="handleDeleteCourse(${course.id})">Delete</button>
        <button onclick="getCourseUpdate(${course.id})">Edit</button>
        `;
    });

    listCoursesBlock.innerHTML = htmls.join('');
}

function createCourses(data, callback) {
    var options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            // content type là dạng x-www-form-urlencoded
        }
    }
    fetch(coursetAPi, options)
        .then(function (response) {
            response.json
        })
        .then(callback)
}

function handleDeleteCourse(id) {
    var options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
            // content type là dạng x-www-form-urlencoded
        }
    }
    fetch(coursetAPi + '/' + id, options)
        .then(function (response) {
            response.json
        })
        .then(function () {
            var courseItem = document.querySelector('.course-item-' + id);
            if (courseItem) {
                courseItem.remove()
            }
        })
}

function handleEditCourse(id, data, callback) {
    debugger
    var options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            // content type là dạng x-www-form-urlencoded
        }
    }
    fetch(coursetAPi + '/' + id, options)
        .then(function (response) {
            response.json
        })
        .then(callback)
}

function getCourseUpdate(courseid) {

    var courseitem = document.querySelector('.course-item-' + courseid);
    var h4 = courseitem.querySelector('h4').innerText;//get name trong li có id ..
    var p = courseitem.querySelector('p').innerText;//get description trong li có id ..
    document.querySelector('input[name="name"]').value = h4;
    document.querySelector('input[name="description"]').value = p;
    document.querySelector('#update').style.visibility = '';


    document.querySelector('#update').onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        debugger
        if (name != h4 || description != p) {
            var formData =
            {
                name: name,
                description: description
            };
            handleEditCourse(courseid, formData, function () {
            });
        }
    }
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value

        var formData = {
            name: name,
            description: description,
        }

        createCourses(formData, function () {

        })
    }
}
