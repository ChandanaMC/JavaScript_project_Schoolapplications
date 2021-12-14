let get_Students = async (URL) => {
  let response = await fetch(URL);
  let data = await response.json();
  return data;
};

async function getData() {
  let students_name = await get_Students(
    " https://api.mocki.io/v2/01047e91/students"
  );
  let school_info = await get_Students(
    " https://api.mocki.io/v2/01047e91/schools"
  );

  //print the first and last name of each of the student.
  function listStudents(students_name) {
    students_name.forEach((student) => {
      let li = document.createElement("li");
      li.textContent = student.firstName + " " + student.lastName;
      document.querySelector("#studentList").appendChild(li);
    });
  }

  //Select the group of radiobuttons by name.
  let inputs = document.getElementsByName("programme");
  let orders = document.getElementsByName("order");
  let getSchoolBtn = document.querySelector("#getSchool");
  let username = "";

  //Filter students based on education.
  function filterStudentsEdu() {
    let button = document.querySelector("#button1");
    let studentList_education = document.querySelector("#studentList_edu");

    button.addEventListener("click", () => {
      let prog;
      let sort_order;
      studentList_education.innerHTML = "";
      inputs.forEach((input) => {
        if (input.checked) {
          //Take the checked radiobutton (Frontend, Backend and .NET) value
          //and assign to "prog" variable.
          prog = input.value;
        }
      });
      orders.forEach((order) => {
        if (order.checked) {
          //Take the checked radiobutton (ascending and descending buttons) value
          //and assign to "sort_order" variable.
          sort_order = order.value;
        }
      });
      //Filter students based on their programme.
      let filteredStudents = students_name.filter(
        (student) => student.programme === prog
      );
      //Sort the filtered students in ascending order.
      if (sort_order === "ascending") {
        filteredStudents.sort((a, b) => {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });
        //Sort the filtered students in descending order.
      } else if (sort_order === "descending") {
        filteredStudents.sort((b, a) => {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });
      }
      //Print the names in DOM.
      filteredStudents.forEach((student) => {
        let studentName = document.createElement("li");
        studentName.textContent = student.firstName;
        studentList_education.appendChild(studentName);
        studentList_education.style.border = "solid";
        studentList_education.style.color = "darkcyan";
      });
    });
    inputs.checked = false;
  }
  //Filter the students based on age, first name and last name.
  function age_first_last_name() {
    let button2 = document.querySelector("#button2");
    let list = document.querySelector("#age_name_list");

    button2.addEventListener("click", () => {
      let btn_value;
      let sort_order;
      list.innerHTML = "";
      inputs.forEach((input) => {
        if (input.checked) {
          btn_value = input.value;
        }
      });
      orders.forEach((order) => {
        if (order.checked) {
          sort_order = order.value;
        }
      });
      //If the checked button's value is "age" and "ascending" or "descending", sort the
      //students age in ascending and descending order respectively.
      if (btn_value === "age") {
        if (sort_order === "ascending") {
          students_name.sort((a, b) => {
            return a.age - b.age;
          });
        } else if (sort_order === "descending") {
          students_name.sort((a, b) => {
            return b.age - a.age;
          });
        }
        //Sort students in ascending and descending order based on their first name.
      } else if (btn_value === "firstName") {
        if (sort_order === "ascending") {
          students_name.sort((a, b) => {
            if (a.firstName < b.firstName) {
              return -1;
            }
            if (a.firstName > b.firstName) {
              return 1;
            }
            return 0;
          });
        } else if (sort_order === "descending") {
          students_name.sort((b, a) => {
            if (a.firstName < b.firstName) {
              return -1;
            }
            if (a.firstName > b.firstName) {
              return 1;
            }
            return 0;
          });
        }
        //Sort students in ascending and descending order based on their last name.
      } else if (btn_value === "lastName") {
        if (sort_order === "ascending") {
          students_name.sort((a, b) => {
            if (a.lastName < b.lastName) {
              return -1;
            }
            if (a.lastName > b.lastName) {
              return 1;
            }
            return 0;
          });
        } else if (sort_order === "descending") {
          students_name.sort((b, a) => {
            if (a.lastName < b.lastName) {
              return -1;
            }
            if (a.lastName > b.lastName) {
              return 1;
            }
            return 0;
          });
        }
      }

      if (btn_value) {
        students_name.forEach((student) => {
          let names = document.createElement("li");
          if (btn_value === "age" || btn_value === "firstName") {
            names.textContent = student.firstName + "," + student.age;
          } else if (btn_value === "lastName") {
            names.textContent = student.lastName + " , " + student.firstName;
          }
          list.appendChild(names);
          list.style.border = "solid";
          list.style.color = "darkcyan";
        });
      }
    });
    inputs.checked = false;
  }
  //Check if the input field has a value or not.
  function validateInput() {
    username = document.querySelector("#name").value;
    if (username.trim() === "") {
      return false;
    } else {
      return true;
    }
  }
  // Show list of schools that matches student's hobbies and programme.
  getSchoolBtn.addEventListener("click", () => {
    let school_list = document.querySelector("#schools");
    school_list.innerHTML = "";
    if (validateInput() === false) {
      // console.log("Empty input");
      return;
    }
    let userfullname = username.toLowerCase().replaceAll(" ", "");
    let student_programme = "";
    let stu_hobby = [];
    let school_with_prog = [];
    let school_with_activity = [];
    let student_display_name = "";

    students_name.forEach((student) => {
      let fullname = student.firstName + student.lastName;
      fullname = fullname.toLowerCase();
      //Check the name entered by user with the full name of the student
      //for any matching letters( eg "han" = "hannah red"/ "gr" = "fiona grey")
      let regexp_name = fullname.match(userfullname);

      if (userfullname === fullname || regexp_name) {
        student_programme = student.programme;
        stu_hobby = student.hobbies;
        student_display_name = student.firstName + " " + student.lastName;
      }
      if (regexp_name) {
        student_display_name = student.firstName + " " + student.lastName;
      }
    });
    //Check if student programme matches with school's programmes.
    school_info.forEach((school) => {
      school.programmes.forEach((programme) => {
        if (student_programme === programme) {
          school_with_prog.push(school.name); //StuProg === SchProg
        }
      });
      //Check if school activities is an array, loop through each activity and
      //see if student hobbies matches with the school's activities.
      if (Array.isArray(school.activities)) {
        school.activities.forEach((activity) => {
          if (stu_hobby.includes(activity)) {
            school_with_activity.push(school.name);
          }
        });
      }
    });

    let display_name = document.createElement("p");
    display_name.textContent = student_display_name;
    school_list.appendChild(display_name);

    school_with_prog.forEach((school) => {
      if (school_with_activity.includes(school)) {
        let show_school = document.createElement("li");
        show_school.textContent = school;
        school_list.appendChild(show_school);
        school_list.style.color = "indianred";
        show_school.style.color = "darkcyan";
      }
    });
    document.querySelector("#name").value = "";
  });

  listStudents(students_name);
  filterStudentsEdu();
  age_first_last_name();
}
getData();
