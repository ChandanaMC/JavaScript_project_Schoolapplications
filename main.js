let get_Students = async (URL) => {
  let response = await fetch(URL);
  let data = await response.json();
  return data;
};

async function renderData() {
  let students_name = [
    {
      firstName: "Marcus",
      lastName: "Green",
      age: "29",
      hobbies: ["football"],
      programme: "Frontend"
    },
    {
      firstName: "Cassandra",
      lastName: "White",
      age: "18",
      hobbies: ["chess", "gaming", "drawing"],
      programme: "Backend"
    },
    {
      firstName: "Hannah",
      lastName: "Red",
      age: "24",
      hobbies: ["basketball", "gaming"],
      programme: ".NET"
    },
    {
      firstName: "Winston",
      lastName: "Black",
      age: "21",
      hobbies: ["basketball", "football"],
      programme: "Frontend"
    },
    {
      firstName: "Maria",
      lastName: "Scarlet",
      age: "19",
      hobbies: ["drawing", "chess"],
      programme: "Backend"
    },
    {
      firstName: "Ash",
      lastName: "Yellow",
      age: "35",
      hobbies: ["gaming", "football"],
      programme: ".NET"
    },
    {
      firstName: "Leona",
      lastName: "Grey",
      age: "42",
      hobbies: ["chess"],
      programme: ".NET"
    },
    {
      firstName: "Fiona",
      lastName: "Grey",
      age: "29",
      hobbies: ["football"],
      programme: "Backend"
    },
    {
      firstName: "Anna",
      lastName: "Forest",
      age: "21",
      hobbies: ["drawing"],
      programme: "Frontend"
    },
    {
      firstName: "Neshin",
      lastName: "Pink",
      age: "20",
      hobbies: ["chess"],
      programme: "Backend"
    },
    {
      firstName: "Orlando",
      lastName: "Beige",
      age: "24",
      hobbies: ["basketball", "drawing"],
      programme: "Frontend"
    }
  ];
  // let students_name = await get_Students(
  //   " https://api.mocki.io/v2/01047e91/students"
  // );
  let student_education = students_name;

  let school_info = [
    {
      name: "Fun School",
      activities: ["drawing", "chess", "football", "basketball", "gaming"],
      programmes: []
    },
    {
      name: "Data School",
      activities: ["drawing", "chess", "gaming"],
      programmes: [".NET", "Frontend"]
    },
    {
      name: "Makrosoft School",
      activities: ["football", "gaming"],
      programmes: ["Backend", ".NET"]
    },
    {
      name: "Boring School",
      activities: "No activities",
      programmes: ["Frontend", "Backend"]
    },
    {
      name: "Frontend School",
      activities: ["drawing", "basketball"],
      programmes: ["Frontend"]
    }
  ];

  // let school_info = await get_Students(
  //   " https://api.mocki.io/v2/01047e91/schools"
  // );

  let edu_list = document.querySelector("#education");
  let sort_list = document.querySelector("#age_names");
  let getSchoolBtn = document.querySelector("#getSchool");

  students_name.forEach((student) => {
    let li = document.createElement("li");
    li.textContent = student.firstName + " " + student.lastName;
    document.querySelector("#studentList").appendChild(li);
  });

  let frontend = document.createElement("button");
  let backend = document.createElement("button");
  let net = document.createElement("button");
  let age_button = document.createElement("button");
  let firstname_btn = document.createElement("button");
  let lastname_btn = document.createElement("button");

  frontend.textContent = "Frontend";
  backend.textContent = "Backend";
  net.textContent = ".NET";
  age_button.textContent = "Age";
  firstname_btn.textContent = "Firstname";
  lastname_btn.textContent = "Lastname";

  document.querySelector("#filters").append(frontend, backend, net);
  document
    .querySelector("#other_buttons")
    .append(age_button, firstname_btn, lastname_btn);
  let student_edu;
  //show students based on education == frontend
  frontend.addEventListener("click", () => {
    edu_list.innerHTML = "";
    student_education.forEach((edu) => {
      if (edu.programme === "Frontend") {
        student_edu = document.createElement("li");
        student_edu.textContent = edu.firstName;
        edu_list.appendChild(student_edu);
      }
    });
  });
  //show students based on education == backend
  backend.addEventListener("click", () => {
    edu_list.innerHTML = "";
    student_education.forEach((edu) => {
      if (edu.programme === "Backend") {
        student_edu = document.createElement("li");
        student_edu.textContent = edu.firstName;
        edu_list.appendChild(student_edu);
      }
    });
  });
  //show students based on education == .net

  net.addEventListener("click", () => {
    edu_list.innerHTML = "";
    student_education.forEach((edu) => {
      if (edu.programme === ".NET") {
        student_edu = document.createElement("li");
        student_edu.textContent = edu.firstName;
        edu_list.appendChild(student_edu);
      }
    });
  });
  //sort students by age (ascending order)
  age_button.addEventListener("click", () => {
    sort_list.innerHTML = "";
    students_name.sort((a, b) => {
      return a.age - b.age;
    });
    students_name.forEach((student) => {
      let student_age = document.createElement("li");
      student_age.textContent = student.firstName + " " + student.age;
      sort_list.appendChild(student_age);
    });
  });

  //sort firstname of students alphabetically
  firstname_btn.addEventListener("click", () => {
    sort_list.innerHTML = "";
    students_name.sort((a, b) => {
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.firstName > b.firstName) {
        return 1;
      }
      return 0;
    });

    students_name.forEach((student) => {
      let firstName = document.createElement("li");
      firstName.textContent = student.firstName;
      sort_list.appendChild(firstName);
    });
  });

  //sort lastname of students alphabetically
  lastname_btn.addEventListener("click", () => {
    sort_list.innerHTML = "";
    students_name.sort((a, b) => {
      if (a.lastName < b.lastName) {
        return -1;
      }
      if (a.lastName > b.lastName) {
        return 1;
      }
      return 0;
    });

    students_name.forEach((student) => {
      let lastName = document.createElement("li");
      lastName.textContent = student.lastName + "," + student.firstName;
      sort_list.appendChild(lastName);
    });
  });

  getSchoolBtn.addEventListener("click", () => {
    let username = document.querySelector("#name").value;
    let userfullname = username.toLowerCase().replaceAll(" ", "");
    let student_programme = "";
    let stu_hobby = [];
    let school_with_prog = [];
    let school_with_activity = [];
    let student_display_name = "";
    students_name.forEach((student) => {
      let fullname = student.firstName + student.lastName;
      fullname = fullname.toLowerCase();
      let regexp_name = fullname.match(userfullname);

      if (userfullname === fullname || regexp_name) {
        student_programme = student.programme;
        stu_hobby = student.hobbies;
        student_display_name = student.firstName + " " + student.lastName;
      }
      if (regexp_name) {
        //console.log("Did you mean " + fullname + "?");
        student_display_name = student.firstName + " " + student.lastName;
      }
    });

    school_info.forEach((school) => {
      school.programmes.forEach((programme) => {
        if (student_programme === programme) {
          // console.log(school.name);

          school_with_prog.push(school.name);
          // console.log(school_with_prog);
        }
      });

      if (Array.isArray(school.activities)) {
        school.activities.forEach((activity) => {
          if (stu_hobby.includes(activity)) {
            // console.log(school.name);
            school_with_activity.push(school.name);
          }
        });
      }
    });
    let display_name = document.createElement("p");
    display_name.textContent = student_display_name;
    document.querySelector("#display_name").appendChild(display_name);
    school_with_prog.forEach((school) => {
      if (school_with_activity.includes(school)) {
        // console.log(school);
        let show_school = document.createElement("p");
        show_school.textContent = school;
        document.querySelector("#schools").appendChild(show_school);
      }
    });
  });
}

renderData();
