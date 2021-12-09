// Populate employee table and initialize data tables
$(document).ready(function () {
  $('.test').DataTable();
  $('[data-toggle="tooltip"]').tooltip();
  let data;
  let locData;
  let deptData;


  $.ajax({
    url: "libs/php/getAll.php",
    type: 'GET',
    success: function (result) {
      $.each(result.data, function (index, value) {
        data += "<tr><td>" + value.firstName + "</td><td>" + value.lastName + "</td><td>" + value.jobTitle + "</td><td>" + value.email + "</td><td>" + value.department + "</td>";
        // console.log(value.location);
     
        // data += '<tr><td class="hiddenColumn">' + value.id + "</td><td>" + value.firstName + "</td><td>" + value.lastName + "</td><td>" + value.jobTitle + "</td><td>" + value.email + "</td><td>" + value.department + "</td>";
        data += "\
                  <td><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal'><i class='far fa-edit'\
                  data-toggle='tooltip' title='Edit'></i></a>\
                  <a href='#' class='delete' onclick='getId(" + value.id + ")' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                  data-toggle='tooltip' title='Delete'></i></a></td></tr>";
      })
      $('#user_data').html(data);
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
        // console.log(value.location);
        locData += '<tr><td>' + value.name + "</td><td>" + "NoD" + "</td><td>" + "NoP" + "</td><td>";
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
        deptData += '<tr><td>' + value.name + "</td><td>" + "NoL" + "</td><td>" + "NoP" + "</td><td>";
        deptData += "\
                  <td><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal'><i class='far fa-edit'\
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

  // Add new employee model -- department field populated
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
  // Add new employee model -- location field populated
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

