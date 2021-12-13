// Populate employee table and initialize data tables
$(document).ready(function () {
  // $('.test').DataTable();
  // $('[data-toggle="tooltip"]').tooltip();
  let data;
  let locData;
  let deptData;
  let editId;
  let editModalData;

  $.ajax({
    url: "libs/php/getAll.php",
    type: 'GET',
    success: function (result) {
      // console.log(result)
      $.each(result.data, function (index, value) {
        data += "<tr like data-personnel-id='" + value.id + "'><td data-title='First Name'>" + value.firstName + "</td><td data-title=Last Name'>" + value.lastName + "</td><td data-title='Location'>" + value.location + "</td><td data-title='Email'>" + value.email + "</td><td data-title='Department'>" + value.department + "</td>";
        // console.log(value.location);
        data += "\
                  <td><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal'  data-bs-target='editEmployeeModal'><i class='far fa-edit'\
                  data-toggle='tooltip' title='Edit'></i></a>\
                  <a href='#' class='delete' onclick='getId(" + value.id + ")' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                  data-toggle='tooltip' title='Delete'></i></a></td></tr>";

                  
      })

      
      $('#user_data').html(data);
      $('a[data-bs-target="editEmployeeModal"]').click(function() {
        editId = $(this).closest('tr').data('personnel-id');
        console.log(editId);

        // Edit new employee modal -- department field populated
          $.ajax({
            url: "libs/php/getPersonnelByID.php",
            type: 'GET',
            data: {
              id: editId,
            },
            success: function (result) {
              console.log(result);
              console.log(result.data.personnel[0]['firstName']);
              console.log(result.data.personnel[0]['departmentID']);
              $('#firstNameEdit').attr("value", result.data.personnel[0]['firstName']);
              $('#lastNameEdit').attr("value", result.data.personnel[0]['lastName']);
              $('#jobEdit').attr("value", result.data.personnel[0]['jobTitle']);
              $('#emailEdit').attr("value", result.data.personnel[0]['email']);

              // editModalData = '<div id="editEmployeeModal" class="modal fade">\
              //                   <div class="modal-dialog">\
              //                     <div class="modal-content">\
              //                       <form>\
              //                         <div class="modal-header">\
              //                           <h4 class="modal-title">Edit Employee</h4>\
              //                           <a type="button" class="close" data-bs-dismiss="modal" aria-hidden="true"><i\
              //                               class="far fa-window-close fa-2x"></i></a>\
              //                         </div>\
              //                         <div class="modal-body">\
              //                           <div class="form-group">\
              //                             <label>First Name</label>\
              //                             <input id="firstNameEdit" type="text" class="form-control" value="' + result.data.personnel[0]['firstName'] + '" required>\
              //                           </div>\
              //                           <div class="form-group">\
              //                             <label>Last Name</label>\
              //                             <input id="lastNameEdit" type="text" class="form-control" value="' + result.data.personnel[0]['lastName'] + '" required>\
              //                           </div>\
              //                           <div class="form-group">\
              //                             <label>Job Title</label>\
              //                             <input id="jobEdit" type="text" class="form-control" value="' + result.data.personnel[0]['jobTitle'] + '" required>\
              //                           </div>\
              //                           <div class="form-group">\
              //                             <label>Email</label>\
              //                             <input id="emailEdit" type="email" class="form-control" value="' + result.data.personnel[0]['email'] + '" required>\
              //                           </div>\
              //                           <div class="form-group">\
              //                             <label for="location">Location</label>\
              //                             <select id="locationEdit" class="form-control" name="locationID">\
              //                             </select>\
              //                           </div>\
              //                           <div class="form-group">\
              //                             <label for="department">Department</label>\
              //                             <select id="departmentEdit" class="form-control" name="departmentID">\
              //                             </select>\
              //                           </div>\
              //                         </div>\
              //                         <div class="modal-footer">\
              //                           <input type="button" class="btn btn-default" data-bs-dismiss="modal" value="Cancel">\
              //                           <input type="submit" class="btn btn-info" value="Save">\
              //                         </div>\
              //                       </form>\
              //                     </div>\
              //                   </div>\
              //                 </div>';
              // $.each(result.data, function (index, value) {
                // console.log(value.id)
                // $('#departmentEdit').append($("<option />").val(value.id).text(value.name));
              // })
            },
            error: function (jqXHR) {
              console.log(jqXHR);
            }
          })
          // $.ajax({
          //   url: "libs/php/getAllDepartments.php",
          //   type: 'GET',
          //   success: function (result) {
          //     $.each(result.data, function (index, value) {
          //       // console.log(value.id)
          //       $('#departmentEdit').append($("<option />").val(value.id).text(value.name));
          //     })
          //   },
          //   error: function (jqXHR) {
          //     console.log(jqXHR);
          //   }
          // })
          // // Edit new employee modal -- location field populated
          // $.ajax({
          //   url: "libs/php/getAllLocations.php",
          //   type: 'GET',
          //   success: function (result) {
          //     $.each(result.data, function (index, value) {
          //       // console.log(value.id)
          //       $('#locationEdit').append($("<option />").val(value.id).text(value.name));
          //     })
          //   },
          //   error: function (jqXHR) {
          //     console.log(jqXHR);
          //   }
          // })
        })

    },
    error: function (jqXHR) {
      console.log(jqXHR);
    }
  })

  $.ajax({
    url: "libs/php/getAllLocations.php",
    type: 'GET',
    success: function (result) {
      // console.log(result);
      $.each(result.data, function (index, value) {
        // console.log(value.name);
        locData += '<tr><td data-title="Location">' + value.name + "</td><td>" + "NoD" + "</td><td>" + "NoP" + "</td>";
        locData += "\
                  <td><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal'><i class='far fa-edit'\
                  data-toggle='tooltip' title='Edit'></i></a>\
                  <a href='#deleteEmployeeModal' class='delete' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                  data-toggle='tooltip' title='Delete'></i></a></td></tr>";
      })
      $('#locationData').html(locData);
      
    },
    error: function (jqXHR) {
      console.log(jqXHR);
    }
  })

  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: 'GET',
    success: function (result) {
      // console.log(result);
      $.each(result.data, function (index, value) {
        // console.log(value.name);
        deptData += '<tr><td data-title="Department">' + value.name + "</td><td data-title='Depart. Location'>" + value.location + "</td><td data-title='No Of Depts'>" + value.count + "</td>";
        deptData += "\
                  <td class='col-sm'><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal'><i class='far fa-edit'\
                  data-toggle='tooltip' title='Edit'></i></a>\
                  <a href='#' class='delete' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                  data-toggle='tooltip' title='Delete'></i></a></td></tr>";
      })
      $('#departData').html(deptData);
    },
    error: function (jqXHR) {
      console.log(jqXHR);
    }
  })
  

  // Add new employee modal -- department field populated
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: 'GET',
    success: function (result) {
      $.each(result.data, function (index, value) {
        // console.log(value.id)
        $('#department').append($("<option />").val(value.id).text(value.name));
      })
    },
  })
  // Add new employee modal -- location field populated
  $.ajax({
    url: "libs/php/getAllLocations.php",
    type: 'GET',
    success: function (result) {
      $.each(result.data, function (index, value) {
        // console.log(value.id)
        $('#location').append($("<option />").val(value.id).text(value.name));
      })
    },
  })

  






})

function getId(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "libs/php/deleteEmployee.php",
        data: { 'id': id },
        success: function (data) {
          console.log(data)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      });

    }
  })
}


// $('#employeeDeleteBtn').click(function (event) {
//   alert(id)
//   $.ajax({
//     type: "POST",
//     url: "libs/php/deleteEmployee.php",
//     data: { 'id': id },
//     success: function (data) {
//       console.log(data)
//       Toast.fire({
//         icon: 'success',
//         title: 'Great Success'
//       })
//     }
//   });
// })



// Handle employee add form with Ajax
// Still need to add a proper response when added successfully. Check out sweet alerts or if Bootstrap's toasts work
$("#addNewEmployee").submit(function (e) {
  e.preventDefault();

  var form = $(this);
  var url = form.attr('action');
  // console.log(form)
  $.ajax({
    type: "POST",
    url: url,
    data: form.serialize(), // serializes the form's elements.
    success: function (data) {
      $('#addEmployeeModal').modal('hide');
      Toast.fire({
        icon: 'success',
        title: 'Successfully added an employee'
      })
    }
  });


});

// Sweetalert toast initialize
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


    // $.ajax({
    //   url: "libs/php/deleteEmployee.php",
    //   type: 'GET',
    //   success: function (result) {
    //    console.log(result)
    //   },
    // })

    
