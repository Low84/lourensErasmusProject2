// Populate employee table and initialize data tables
$(document).ready(function () {
  
  let data;
  let locData;
  let deptData;
  let editId;
  let userDeptId;

  // Searchbar
  $('.test').DataTable();
  $('[data-toggle="tooltip"]').tooltip();

  $.ajax({
    url: "libs/php/getAll.php",
    type: 'GET',
    success: function (result) {
      // console.log(result)
      $.each(result.data, function (index, value) {
        data += "<tr like data-personnel-id='" + value.id + "'><td data-title='id'>" + value.id + "</td><td data-title='First Name'>" + value.firstName + "</td><td data-title=Last Name'>" + value.lastName + "</td><td data-title='Location'>" + value.location + "</td><td data-title='Email'>" + value.email + "</td><td data-title='Department'>" + value.department + "</td>";
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

        // console.log(editId);

        // Edit new employee modal -- department field populated
          $.ajax({
            url: "libs/php/getPersonnelByID.php",
            type: 'GET',
            data: {
              id: editId,
            },
            success: function (result) {
              let departmentID = result.data.personnel[0]['departmentID'];
              // console.log(result);
              // console.log(result.data.personnel[0]['firstName']);
              // console.log(result.data.personnel[0]['departmentID']);
              $('#idEdit').attr("value", result.data.personnel[0]['id']);
              $('#firstNameEdit').attr("value", result.data.personnel[0]['firstName']);
              $('#lastNameEdit').attr("value", result.data.personnel[0]['lastName']);
              $('#jobEdit').attr("value", result.data.personnel[0]['jobTitle']);
              $('#emailEdit').attr("value", result.data.personnel[0]['email']);

              $.ajax({
                url: "libs/php/getDepartmentByID.php",
                type: 'GET',
                data: {
                  id: result.data.personnel[0]['departmentID']
                },
                success: function (result) {
                  let departmentName = result.data[0]['name'];
                  // console.log(result);
                  // console.log(result.data[0]['locationID']);
                  let locationNameId = (result.data[0]['locationID']);
                  // console.log(result.data[0]['name']);

                  $.ajax({
                    url: "libs/php/getAllDepartments.php",
                    type: 'GET',
                    success: function (result) {
                      $.each(result.data, function (index, value) {
                        // console.log(value.id)
                        $('#departmentEdit').append($("<option />").val(value.id).text(value.name));
                        // console.log(locationNameId);
                      })
                        $.ajax({
                          url: "libs/php/getLocationByID.php",
                          type: 'GET',
                          data: {
                            id: locationNameId
                          },
                          success: function (result) {
                            // console.log(result);
                            let locationName = result.data[0]['name'];

                            $.ajax({
                              url: "libs/php/getAllLocations.php",
                              type: 'GET',
                              success: function (result) {
                                $.each(result.data, function (index, value) {
                                  // console.log(value.id)
                                  $('#locationEdit').append($("<option />").val(value.id).text(value.name));
                                })
                                $('#locationEdit').append($("<option selected/>").val(locationNameId).text(locationName));

                              },
                            })                                                       
                          },
                          error: function (jqXHR) {
                            console.log(jqXHR);
                          }
                        // })
                      })
                      $('#departmentEdit').append($("<option selected/>").val(departmentID).text(departmentName));

                    },
                  })

                  $('#editEmployeeModal').modal('show');
                },
                error: function (jqXHR) {
                  console.log(jqXHR);
                }
              })
              
            },
            error: function (jqXHR) {
              console.log(jqXHR);
            }
          })
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
          // console.log(data)
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

    
