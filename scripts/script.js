//-----get year and last modified-----//
const year = document.querySelector("#currentYear");
const modified = document.querySelector("#lastModified");

const today = new Date();

year.innerHTML = today.getFullYear();
modified.innerHTML = document.lastModified;

//-----Hamburger menu-----//
const navButton = document.querySelector("#menu");
const nav = document.querySelector("nav");

navButton.addEventListener("click", () => {
    nav.classList.toggle("show");
    navButton.classList.toggle("show");
});

//-----courses and credits for certificate section-----//
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]
const courseDetails = document.querySelector("#course-details");
const credits = document.querySelector("#credits"); 

addCourseContent(courses);

credits.innerHTML = `${calculateCompletedCredits(courses)}/${calculateTotalCredits(courses)}`

//filter courses on button click//
document.querySelector("#all").addEventListener("click", () => {
    addCourseContent(courses)
    credits.innerHTML = `${calculateCompletedCredits(courses)}/${calculateTotalCredits(courses)}`

});
document.querySelector("#cse").addEventListener("click", () => {
    const cseCourses = courses.filter((course) => course.subject[0] == "C");
    addCourseContent(cseCourses);
    credits.innerHTML = `${calculateCompletedCredits(cseCourses)}/${calculateTotalCredits(cseCourses)}`

});
document.querySelector("#wdd").addEventListener("click", () => {
    const wddCourses = courses.filter((course) => course.subject[0] == "W");
    addCourseContent(wddCourses);
    credits.innerHTML = `${calculateCompletedCredits(wddCourses)}/${calculateTotalCredits(wddCourses)}`

});

// modal close//




//-----Functions-----//

function calculateCompletedCredits(array) {
    //calculates course credits of completed courses in an array//
    const completed = array.filter((course) => course.completed == true);
    const total = completed.reduce((sum, current) => sum + current.credits, 0);
    return total;
}

function calculateTotalCredits(array) {
    //calculates total course credits//
    const total = array.reduce((sum, current) => sum + current.credits, 0);
    return total;
}

function addCourseContent(array) {
    const coursesElement = document.querySelector("#courses");
    coursesElement.innerHTML = "";

    array.forEach((item) => {
        const courseDiv = document.createElement("div");
        
        courseDiv.classList.add("course");

        if (item.completed == true) {
            courseDiv.classList.add("complete");
        };

        courseDiv.innerHTML = `${item.subject} ${item.number}`;
        courseDiv.addEventListener("click", () => {
            displayCourseDetails(item);
        });

        coursesElement.appendChild(courseDiv);
    });

    document.querySelectorAll(".complete").forEach((item) => item.style.backgroundColor = "#b6938b");
}
    //adds course template to HTML//
    // const courseArray = array.map((course) => {
    //     if (course.completed == true) {
    //         `<a href="#!"><div class="course complete" >${course.subject} ${course.number}</div></a>`;
    //     } else {
    //         `<a href="#!"><div class="course">${course.subject} ${course.number}</div></a>`;
    //     }
    //     document.querySelector(".course").addEventListener("click", () => {
    //         displayCourseDetails(course)
    //     });
    // });
    // document.querySelector("#courses").innerHTML = courseArray.join("");


// function createCourseTemplate(course) {
//     //creates course HTML template and sets class if completed //
//     if (course.completed == true) {
//         return `<a href="#!"><div class="course complete" >${course.subject} ${course.number}</div></a>`;
//     } else {
//         return `<a href="#!"><div class="course">${course.subject} ${course.number}</div></a>`;
//     }
// }

function displayCourseDetails(course) {
    courseDetails.innerHTML = "";
    courseDetails.innerHTML = `<h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p><strong>Technologies:</strong> ${course.technology}</p>
        <button id="closeButton">Close</button>`;
    courseDetails.showModal();
    closeButton.addEventListener("click", () =>
        courseDetails.close());
}