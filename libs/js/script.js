// Populate employee table and initialize data tables
$(document).ready(function () {
  
  let data;
  let locData;
  let deptData;
  let editId;

  // Searchbar
  $('.test').DataTable();
  $('[data-toggle="tooltip"]').tooltip();
  
//   $('#personnelTable').DataTable({
  
//     // Enable the searching
//     // of the DataTable
//     searching: true
// });
  $.ajax({
    url: "libs/php/getAll.php",
    type: 'GET',
    success: function (result) {
      // console.log(result)
      $.each(result.data, function (index, value) {
        data += "<tr data-personnel-id='" + value.id + "'><td data-title='id'>" + value.id + "</td><td data-title='First Name'>" + value.firstName + "</td><td data-title=Last Name'>" + value.lastName + "</td><td data-title='Location'>" + value.location + "</td><td data-title='Email'>" + value.email + "</td><td data-title='Department'>" + value.department + "</td>";
        // console.log(value.location);
        data += "\
                  <td data-title='Edit/Delete'><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal' data-bs-target='#editEmployeeModal'><i class='far fa-edit'\
                  data-toggle='tooltip' title='Edit'></i></a>\
                  <a href='#' class='delete' onclick='getId(" + value.id + ")' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                  data-toggle='tooltip' title='Delete'></i></a></td></tr>";

                  
      })

      
      $('#user_data').html(data);

      $('a[data-bs-target="#editEmployeeModal"]').click(function() {
 
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
              console.log(result);
              let departmentID = result.data.personnel[0]['departmentID'];
              // console.log(result);
              // console.log(result.data.personnel[0]['firstName']);
              console.log(result.data.personnel[0]['departmentID']);
              $('#idEdit').attr("value", result.data.personnel[0]['id']);
              $('#firstNameEdit').attr("value", result.data.personnel[0]['firstName']);
              $('#lastNameEdit').attr("value", result.data.personnel[0]['lastName']);
              $('#jobEdit').attr("value", result.data.personnel[0]['jobTitle']);
              $('#emailEdit').attr("value", result.data.personnel[0]['email']);
              $("#departmentEdit").val(result.data.personnel[0].departmentID).change();
              
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
        locData += '<tr><td data-title="ID">' + value.id + '</td><td data-title="Location">' + value.name + '</td><td>NoD</td><td>' + 'NoP' + '</td>';
        locData += "\
                  <td data-title='Edit/Delete'><a href='#editLocationModal' class='edit' data-bs-toggle='modal'><i class='far fa-edit'\
                  data-toggle='tooltip' title='Edit'></i></a>\
                  <a href='#deleteEmployeeModal' class='delete' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                  data-toggle='tooltip' title='Delete'></i></a></td></tr>";
                  $('#location').append($("<option />").val(value.id).text(value.name));
                  $('#editDepartLocation').append($("<option />").val(value.id).text(value.name));
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
      console.log(result);
      $.each(result.data, function (index, value) {
        // console.log(value.id);
        // console.log(value.location);

        deptData += '<tr><td data-title="ID">' + value.id + '</td><td data-title="Department">' + value.name + '</td><td data-title="Depart. Location">' + value.location + '</td><td data-title="No Of Depts">' + value.count + "</td>";
        deptData += "\
                  <td data-title='Edit/Delete'><a href='#editDepartModal' class='edit' data-bs-toggle='modal' data-bs-target='#editDepartModal'><i class='far fa-edit'\
                  data-toggle='tooltip' title='Edit'></i></a>\
                  <a href='#' class='delete' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                  data-toggle='tooltip' title='Delete'></i></a></td></tr>";
                  $('#addDepartment').append(`<option value="${value.id}">${value.name}</option>`);
                  $('#departmentEdit').append(`<option value="${value.id}">${value.name}</option>`);
                  

      })
      $('#departData').html(deptData);
    },
    error: function (jqXHR) {
      console.log(jqXHR);
    }
  })
  

  // Add new employee modal -- department field populated
  // $.ajax({
  //   url: "libs/php/getAllDepartments.php",
  //   type: 'GET',
  //   success: function (result) {
  //     $.each(result.data, function (index, value) {
  //       // console.log(value.id)

  //       $('#department').append($("<option />").val(value.id).text(value.name));
  //     })
  //   },
  // })
  // Add new employee modal -- location field populated
  // $.ajax({
  //   url: "libs/php/getAllLocations.php",
  //   type: 'GET',
  //   success: function (result) {
  //     $.each(result.data, function (index, value) {
  //       // console.log(value.id)
  //       $('#location').append($("<option />").val(value.id).text(value.name));
  //       $('#editDepartLocation').append($("<option />").val(value.id).text(value.name));

  //     })
  //   },
  // })

  // Edit Employee
  $("#editEmployeeSubmit").click(function(){
    $.ajax({
      url:"libs/php/editEmployee.php",
      type: "POST",
      dataType: "JSON",
      data:{
        id: $(`td:contains("${$('#firstNameEdit').val()}")`).closest('tr').data('personnel-id'),
              firstName:$('#firstNameEdit').val(),
              lastName:$('#lastNameEdit').val(),
              jobTitle:$('#jobEdit').val(),
              email:$('#emailEdit').val(),
              deptId:$("#departmentEdit").val()
      },
      success: function(result){
        console.log(result);
      },
      error:function(jqXHR){
        console.log(jqXHR);
      }
    });
  });

  // Add employee
  $("#addEmployeeSubmit").click(function(){
    $.ajax({
      url:"libs/php/insertEmployee.php",
      type: "POST",
      dataType: "JSON",
      data:{
              firstName:$('#addFirstName').val(),
              lastName:$('#addLastName').val(),
              jobTitle:$('#addJobTitle').val(),
              email:$('#addEmail').val(),
              deptId:$("#addDepartment").val()
      },
      success: function(result){
        console.log(result);
        Toast.fire({
          icon: 'success',
          title: 'Successfully added an employee'
        })
      },
      error:function(jqXHR){
        console.log(jqXHR);
      }
    });
  });

  // $("#addNewEmployee").submit(function (e) {
  //   e.preventDefault();
  
  //   var form = $(this);
  //   var url = form.attr('action');
  //   // console.log(form)
  //   $.ajax({
  //     type: "POST",
  //     url: url,
  //     data: form.serialize(), // serializes the form's elements.
  //     success: function (data) {
  //       $('#addEmployeeModal').modal('hide');
  //       Toast.fire({
  //         icon: 'success',
  //         title: 'Successfully added an employee'
  //       })
  //     }
  //   });
  
  
  // });


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

    
