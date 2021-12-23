// Populate employee table and initialize data tables
$(document).ready(function () {
  
  let data;
  let locData;
  let deptData;
  let editId;
 
  // Searchbar
  // $('.test').DataTable();
  // $('[data-toggle="tooltip"]').tooltip();
 
  var myModal = new bootstrap.Modal(document.getElementById('editEmployeeModal'), {
    keyboard: false,
  });
  var myModalAdd = new bootstrap.Modal(document.getElementById('addEmployeeModal'), {
    keyboard: false,
  });
  var myModalDelete = new bootstrap.Modal(document.getElementById('deleteEmployeeModal'), {
    keyboard: false,
  });
  var myModalAddDept = new bootstrap.Modal(document.getElementById('addDepartModal'), {
    keyboard: false,
  });
  var myModalEditDept = new bootstrap.Modal(document.getElementById('editDepartModal'), {
    keyboard: false,
  });
 
  getAll();
  getLocations();
  getDepartments();
 
 
  
  
  function getAll() {
  $.ajax({
    url: "libs/php/getAll.php",
    type: 'GET',
    success: function (result) {
      // console.log(result)
      data = null;
      $.each(result.data, function (index, value) {
        data += `<tr data-personnel-id='${value.id}'><td data-title='id'>${value.id}</td><td data-title='First Name'>${value.firstName}</td><td data-title=Last Name'>${value.lastName}</td><td data-title='Location'>${value.location}</td><td data-title='Email'>${value.email}</td><td data-title='Department'>${value.department}</td>`;
        // console.log(value.location);
        data += "\
                  <td data-title='Edit/Delete'><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal' data-bs-target='#editEmployeeModal'><i class='far fa-edit'\
                  data-toggle='tooltip' title='Edit'></i></a>\
                  <a href='#' class='delete'><i class='far fa-trash-alt'\
                  data-toggle='tooltip' title='Delete'></i></a></td></tr>";     
                  
                  
      })
      
      $('#user_data').html(data);
 
      $(".delete").click(function(){
        console.log('delete');
        console.log($(this).closest('tr').data('personnel-id'));
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
                data: { 'id': $(this).closest('tr').data('personnel-id') },
                success: function (data) {
                  console.log(data);
                  Swal.fire(
                    'Deleted!',
                    'The personnel file has been deleted.',
                    'success'
                  )   
                  getAll(1.5);
                  //myModalDelete.toggle();   
                },
                error: function(jqXHR){
                  console.log(jqXHR);
                }      
              });
            }
          })
        
      });
 
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
              // let departmentID = result.data.personnel[0]['departmentID'];
              // console.log(result);
              // console.log(result.data.personnel[0]['firstName']);
              // console.log(result.data.personnel[0]['departmentID']);
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
}

function getLocations() {
  $.ajax({
    url: "libs/php/getAllLocations.php",
    type: 'GET',
    success: function (result) {
      console.log(result);
      $.each(result.data, function (index, value) {
        console.log(value.id);
        locData += '<tr><td id="locationID" data-title="ID">' + value.id + '</td><td data-title="Location">' + value.name + '</td><td>NoD</td><td>' + 'NoP' + '</td>';
        locData += "\
                  <td data-title='Edit/Delete'><a href='#editLocationModal' class='edit' data-bs-toggle='modal'><i class='far fa-edit'\
                  data-toggle='tooltip' title='Edit'></i></a>\
                  <a href='#deleteEmployeeModal' class='delete' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                  data-toggle='tooltip' title='Delete'></i></a></td></tr>";
                  $('#location').append($("<option />").val(value.id).text(value.name));
                  $('#locationDept').append($("<option />").val(value.id).text(value.name));                  
                  $('#addNewLocation').append($("<option />").val(value.id).text(value.name));
                  
                  $('#addDepartmentLocation').append($("<option />").val(value.id).text(value.name));
                  $('#editDepartmentLocation').append($("<option />").val(value.id).text(value.name));


      })
      $('#locationData').html(locData);
      
    },
    error: function (jqXHR) {
      console.log(jqXHR);
    }
  })
}

function getDepartments() {
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: 'GET',
    success: function (result) {
      console.log(result);
      $.each(result.data, function (index, value) {
        // console.log(value.id);
        // console.log(value.locationID);
 
        deptData += `<tr data-department-id='${value.id}'><td data-title="ID" id="departmentTableId">${value.id}</td><td data-title="Department">${value.name}</td><td id="deptLocation "data-title="Depts. Location">${value.location}</td><td id="numPersonnel" data-title="No Of Depts">${value.count}</td>`;
        deptData += "\
                  <td data-title='Edit/Delete'><a href='#editDepartModal' class='edit' data-bs-toggle='modal' data-bs-target='#editDepartModal'><i class='far fa-edit'\
                  data-toggle='tooltip' title='Edit'></i></a>\
                  <a href='#' class='delete' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                  data-toggle='tooltip' title='Delete'></i></a></td></tr>";
                  

                  
                  $('#addNewDepartment').append(`<option value="${value.id}">${value.name}</option>`); 
                  $('#addDepartment').append(`<option value="${value.id}">${value.name}</option>`);                  
                  $('#departmentEdit').append(`<option value="${value.id}">${value.name}</option>`);    
                  
                  $('#editDepartmentName').append(`<option value="${value.id}">${value.name}</option>`);    
                               
      })
      $('#departData').html(deptData);

      $('a[data-bs-target="#editDepartModal"]').click(function() {
 
        editId = $(this).closest('tr').data('department-id');
        console.log(editId);
 
        // Edit new employee modal -- department field populated
          $.ajax({
            url: "libs/php/getDepartmentByID.php",
            type: 'GET',
            data: {
              id: editId,
            },
            success: function (result) {
              console.log(result);
              console.log(result.data[0]['id']);
              console.log(result.data[0].locationID);
              // console.log(result.data.personnel[0]['departmentID']);
              $('#departmentId').attr("value", result.data[0]['id']);
              $('#editDepartmentName').attr("value", result.data[0]['name']);              
              $("#editDepartmentLocation").val(result.data[0].locationID).change();
              
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
}


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
        // $('#editEmployeeModal').modal('hide');
        Toast.fire({
          icon: 'success',
          title: 'Successfully edited an employee'
        })       
        // getAll();  
        $("#user_data").html('');
        getAll(1.5);
        myModal.toggle()
 
      },
      error:function(jqXHR){
        console.log(jqXHR);
      }
      
    });
    
  });
 
  // Add employee
  $("#addEmployeeSubmit").click(function(){
    // console.log($('#addFirstName').val());
    // console.log($("#addLastName").val());
    // console.log($("#addJobTitle").val());
    // console.log($("#addEmail").val());
    // console.log($("#addDepartment").val());
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
        // $('#addEmployeeModal').modal('hide');
        Toast.fire({
          icon: 'success',
          title: 'Successfully added an employee'
        })
        // getAll();
        $("#user_data").html('');
        getAll(1.5);
        myModalAdd.toggle();
      },
      error:function(jqXHR){
        console.log(jqXHR);
      }
    });
  });

// Add Department
  $("#addDepartmentSubmit").click(function(){
    console.log($('#addDepartmentName').val());
    console.log($('#addDepartmentLocation').val());

    $.ajax({
      url:"libs/php/insertDepartment.php",
      type: "POST",
      dataType: "JSON",
      data:{
              name:$('#addDepartmentName').val(),
              locationID:$('#addDepartmentLocation').val()              
      },
      success: function(result){
        console.log(result);
        Toast.fire({
          icon: 'success',
          title: 'Successfully added a department'
        })

        $("#departData").html('');
        getDepartments(1.5);
        myModalAddDept.toggle();
        
      },
      error:function(jqXHR){
        console.log(jqXHR);
      }
    });
  });

  // Edit Department
  $("#editDepartmentSubmit").click(function(){
    // console.log($(`td:contains("${$('#editDepartmentName').val()}")`).closest('tr').data('department-id'));
    console.log($('#departmentId').val());
    console.log($('#editDepartmentName').val());
    console.log($('#editDepartmentLocation').val());
    $.ajax({
      url:"libs/php/editDepartment.php",
      type: "POST",
      dataType: "JSON",
      data:{
        // id: $(`td:contains("${$('#editDepartmentName').val()}")`).closest('tr').data('department-id'),
        id: $('#departmentId').val(),
        name: $('#editDepartmentName').val(),
        locationId: $('#editDepartmentLocation').val()
   
      },
      success: function(result){
        console.log(result);
        Toast.fire({
          icon: 'success',
          title: 'Successfully edited a department'
        })       
        // getAll();  
        $("#departData").html('');
        getDepartments(1.5);
        myModalEditDept.toggle()
 
      },
      error:function(jqXHR){
        console.log(jqXHR);
      }
      
    });
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
});
