// Populate employee table and initialize data tables
$(document).ready(function () {
  
  let data;
  let locData;
  let deptData;
  let editId;
  let searchData;
 
  // Searchbar
  // $('.test').DataTable();
  // $('[data-toggle="tooltip"]').tooltip();
  
  // Employee Modals
  var myModal = new bootstrap.Modal(document.getElementById('editEmployeeModal'), {
    keyboard: false,
  });
  var myModalAdd = new bootstrap.Modal(document.getElementById('addEmployeeModal'), {
    keyboard: false,
  });
  
  // Department Modals
  var myModalAddDept = new bootstrap.Modal(document.getElementById('addDepartModal'), {
    keyboard: false,
  });
  var myModalEditDept = new bootstrap.Modal(document.getElementById('editDepartModal'), {
    keyboard: false,
  });

  // Location Modals
  var myModalAddLocation = new bootstrap.Modal(document.getElementById('addLocationModal'), {
    keyboard: false,
  });
  var myModalEditLocation = new bootstrap.Modal(document.getElementById('editLocationModal'), {
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
        // console.log(result);
        data = null;
        $.each(result.data, function (index, value) {
          data += `<tr data-personnel-id='${value.id}'><td data-title='id'>${value.id}</td><td data-title='First Name'>${value.firstName}</td><td data-title=Last Name'>${value.lastName}</td><td data-title='Location'>${value.location}</td><td data-title='Email'>${value.email}</td><td data-title='Department'>${value.department}</td>`;
          // console.log(value.location);
          data += "\
                    <td data-title='Edit/Delete'><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal' data-bs-target='#editEmployeeModal'><i class='far fa-edit'\
                    data-toggle='tooltip' title='Edit'></i></a>\
                    <a href='#' class='delete'><i class='far fa-trash-alt'\
                    data-toggle='tooltip' title='Delete'></i></a></td></tr>";     
                                        
        });
      
        $('#user_data').html(data);
  
        $(".delete").click(function(){
          // console.log('delete');
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
                    );
                    getAll(1.5);
                    //myModalDelete.toggle();   
                  },
                  error: function(jqXHR){
                    console.log(jqXHR);
                  }      
                });
              }
            });          
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
                // console.log(result);
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
            });         
        });
      },
      error: function (jqXHR) {
        console.log(jqXHR);
      }
    });
  }

  function getLocations() {
    let locationCount;
    $.ajax({
      url: "libs/php/getAllLocations.php",
      type: 'GET',
      success: function (result) {
        locData = null;
        // console.log(result);
        $.each(result.data, function (index, value) {

          $.ajax({
            url: "libs/php/countLocationEmployees.php",
            type: 'GET',
            data: {
              id: value.id
            },
            success: function (resultEmp) {
              // console.log(value.id);
              // console.log(resultEmp);
              // console.log(resultEmp.data[0]['people']);
              let peopleCount = 0;

              if(resultEmp.data.length > 0 ) 
                {
                  peopleCount = resultEmp.data[0]['people'];
                }
              else
                {
                  peopleCount = 0;
                }
    
              $.ajax({
                url: "libs/php/countLocations.php",
                type: 'GET',
                data: {
                  id: value.id
                },
                success: function (result) {
                  // console.log(result);
                  // console.log(peopleCount);
                  
                  // console.log(result.data[0]['locationCount'])
                  locationCount = 0;
                  if(resultEmp.data.length > 0) 
                    {
                      locationCount = result.data[0]['locationCount'];
                    }
                  else
                    {
                      locationCount = 0;
                    }
                  // locationCount = result.data[0]['locationCount'];
                  // console.log(value.name);

                  locData += `<tr data-location-id='${value.id}'><td id="locationID" data-title="ID">${value.id}</td><td data-title="Location">${value.name}</td><td id="numDepartments" data-title="No. Departments" >${locationCount}</td><td data-title="No. Employees" id="numPeople">${peopleCount}</td>`;
                  locData += "\
                        <td data-title='Edit/Delete'><a href='#editLocationModal' class='edit' data-bs-toggle='modal' data-bs-target='#editLocationModal'><i class='far fa-edit'\
                        data-toggle='tooltip' title='Edit'></i></a>\
                        <a href='#' class='delete deleteLocation' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                        data-toggle='tooltip' title='Delete'></i></a></td></tr>";
                        $('#location').append($("<option />").val(value.id).text(value.name));
                        $('#locationDept').append($("<option />").val(value.id).text(value.name));                  
                        $('#addNewLocation').append($("<option />").val(value.id).text(value.name));
                        
                        $('#addDepartmentLocation').append($("<option />").val(value.id).text(value.name));
                        $('#editDepartmentLocation').append($("<option />").val(value.id).text(value.name));
                        $('#locationFilterSelect').append($("<option />").val(value.id).text(value.name));


                        $('#locationData').html(locData);                                              

                        // Delete Location Function
                        $(".deleteLocation").click(function(){
                          console.log('delete');
                          console.log($(this).closest('tr').data('location-id'));
                          let deleteId = $(this).closest('tr').data('location-id');
                          // See if any employee dependency
                          $.ajax({
                            url:"libs/php/countLocationEmployees.php",
                            type: "POST",
                            dataType: "JSON",
                            data:{
                              id: deleteId
                            },
                            success: function(result){
                              console.log(result);
                              // console.log(result.data[0]['people']);
                              let numEmployees;
                              // numEmployees = 0;

                              if (result.data.length > 0 ) 
                              {
                                numEmployees = result.data[0]['people'];
                              } 
                              else 
                              {
                                numEmployees = 0;
                              }
                              // numEmployees = result.data[0]['people'];
                              console.log(numEmployees);
                              console.log(deleteId);
                              // See if any department dependency
                              $.ajax({
                                url:"libs/php/countLocations.php",
                                type: "POST",
                                dataType: "JSON",
                                data:{
                                  id: deleteId
                                },
                                success: function(resultLoc){
                                  let numOfDepartments;
                                  // console.log(resultLoc);
                                  numOfDepartments = 0;
                                  if (resultLoc.data.length > 0 ) 
                                  {
                                    numOfDepartments = resultLoc.data[0]['locationCount'];
                                  } 
                                  else 
                                  {
                                    numOfDepartments = 0;
                                  }
                                  console.log(numOfDepartments);
                                
                                  if((numEmployees > 0) && (numOfDepartments > 0)) 
                                  {
                                    // console.log(numEmployees);
                                    // console.log(numOfDepartments);
                                    // console.log("You can not delete this Location!");
                                    Toast.fire({
                                      icon: 'error',
                                      title: 'Location has dependencies',
                                      text: "You can't delete this location!"
                                    }); 
                                  } 
                                  else {
                                    // console.log("Go ahead Delete me!")
                                    // console.log(deleteId);                      
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
                                          url: "libs/php/deleteLocationByID.php",
                                          data: { id: deleteId },
                                          success: function (data) {
                                            // console.log(data);
                                            Swal.fire(
                                              'Deleted!',
                                              'This location has been deleted.',
                                              'success'
                                            );
                                            getLocations(1.5);
                                          },
                                          error: function(jqXHR){
                                            console.log(jqXHR);
                                          }      
                                        });
                                      }
                                    });
                                  }
                                },
                                error: function(jqXHR){
                                console.log(jqXHR);
                                }      
                              });
                            },
                            error:function(jqXHR){
                              console.log(jqXHR);
                            }                          
                          });
                                                                  
                        });
                        // 
                        // Edit Location Function
                        $('a[data-bs-target="#editLocationModal"]').click(function() {
  
                          editId = $(this).closest('tr').data('location-id');
                          console.log(editId);
                  
                          // Edit new location modal
                            $.ajax({
                              url: "libs/php/getLocationByID.php",
                              type: 'GET',
                              data: {
                                id: editId,
                              },
                              success: function (result) {
                                console.log(result);
                                console.log(result.data[0]['id']);
                                console.log(result.data[0]['name']);
                                $('#editLocationId').attr("value", result.data[0]['id']);
                                $('#editLocationName').attr("value", result.data[0]['name']);                                            
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

  function getDepartments() {
    $.ajax({
      url: "libs/php/getAllDepartments.php",
      type: 'GET',
      success: function (result) {
        deptData = null;
        // console.log(result);
        $.each(result.data, function (index, value) {
          // console.log(value.id);
          // console.log(value.locationID);
  
          deptData += `<tr data-department-id='${value.id}'><td data-title="ID" id="departmentTableId">${value.id}</td><td data-title="Department">${value.name}</td><td id="deptLocation "data-title="Dept. Location">${value.location}</td>`;
          deptData += "\
                    <td data-title='Edit/Delete'><a href='#editDepartModal' class='edit' data-bs-toggle='modal' data-bs-target='#editDepartModal'><i class='far fa-edit'\
                    data-toggle='tooltip' title='Edit'></i></a>\
                    <a href='#' class='delete deleteDepartment' data-bs-toggle='modal'><i class='far fa-trash-alt'\
                    data-toggle='tooltip' title='Delete'></i></a></td></tr>";                
                    
                    $('#addNewDepartment').append(`<option value="${value.id}">${value.name}</option>`); 
                    $('#addDepartment').append(`<option value="${value.id}">${value.name}</option>`);                  
                    $('#departmentEdit').append(`<option value="${value.id}">${value.name}</option>`);
                    $('#departmentFilterSelect').append(`<option value="${value.id}">${value.name}</option>`);    
    
                    
                    $('#editDepartmentName').append(`<option value="${value.id}">${value.name}</option>`);    
                                
        })
        $('#departData').html(deptData);

        $(".deleteDepartment").click(function(){
          // console.log('delete');
          // console.log($(this).closest('tr').data('department-id'));
          let deleteId = $(this).closest('tr').data('department-id');
          let numEmployees;
          $.ajax({
            url:"libs/php/countEmployees.php",
            type: "POST",
            dataType: "JSON",
            data:{
              // deptId: $(this).closest('tr').data('department-id')
              deptId: deleteId

            },
            success: function(result){
              // console.log(result);
              // console.log(result.data[0]['count']);
              numEmployees = 0;
              numEmployees += result.data[0]['count'];
              console.log(numEmployees);
              if(numEmployees > 0) 
              {
                console.log("You can not delete this Department!");
                Toast.fire({
                  icon: 'error',
                  title: 'Department has dependencies',
                  text: "You can't delete this department!"
                }) 
              } 
              else {
                // console.log("Go ahead Delete me!")
                // console.log(result.data[0]['count']);              
                // console.log(deleteId);

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
                      url: "libs/php/deleteDepartmentByID.php",
                      data: { id: deleteId },
                      success: function (data) {
                        console.log(data);
                        Swal.fire(
                          'Deleted!',
                          'This department has been deleted.',
                          'success'
                        )   
                        getDepartments(1.5);
                        //myModalDelete.toggle();   
                      },
                      error: function(jqXHR){
                        console.log(jqXHR);
                      }      
                    });
                  }
                })
              }
      
            },
            error:function(jqXHR){
              console.log(jqXHR);
            }            
          });                  
        });

        $('a[data-bs-target="#editDepartModal"]').click(function() {
  
          editId = $(this).closest('tr').data('department-id');
          // console.log(editId);
  
          // Edit new employee modal
            $.ajax({
              url: "libs/php/getDepartmentByID.php",
              type: 'GET',
              data: {
                id: editId,
              },
              success: function (result) {
                // console.log(result);
                // console.log(result.data[0]['id']);
                // console.log(result.data[0].locationID);
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
        // console.log(result);
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
    // console.log($('#addDepartmentName').val());
    // console.log($('#addDepartmentLocation').val());
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
    // console.log($('#departmentId').val());
    // console.log($('#editDepartmentName').val());
    // console.log($('#editDepartmentLocation').val());
    $.ajax({
      url:"libs/php/editDepartment.php",
      type: "POST",
      dataType: "JSON",
      data:{
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
   
        $("#departData").html('');
        getDepartments(1.5);
        myModalEditDept.toggle()
 
      },
      error:function(jqXHR){
        console.log(jqXHR);
      }
      
    });
  });

  // Add Location
  $("#addLocationSubmit").click(function(){
    console.log($('#addLocationName').val());

    $.ajax({
      url:"libs/php/insertLocation.php",
      type: "POST",
      dataType: "JSON",
      data:{
              name:$('#addLocationName').val()
      },
      success: function(result){
        console.log(result);
        Toast.fire({
          icon: 'success',
          title: 'Successfully added a location'
        })

        $("#locationData").html('');
        getLocations(1.5);
        myModalAddLocation.toggle();
        
      },
      error:function(jqXHR){
        console.log(jqXHR);
      }
    });
  });

  // Edit Location
  $("#editLocationSubmit").click(function(){
    console.log($('#editLocationId').val());
    console.log($('#editLocationName').val());
    $.ajax({
      url:"libs/php/editLocation.php",
      type: "POST",
      dataType: "JSON",
      data:{
        id: $('#editLocationId').val(),
        name: $('#editLocationName').val()
      },
        success: function(result){
          console.log(result);
          Toast.fire({
            icon: 'success',
            title: 'Successfully edited a location'
          })       
    
          $("#locationData").html('');
          getLocations(1.5);
          myModalEditLocation.toggle()

        },
        error:function(jqXHR){
          console.log(jqXHR);
        }
      
    });
  });

  search();
  function search() {
    let locationSelect;
    let departmentSelect;
    console.log($('#departmentFilterSelect').val());
    console.log($('#locationFilterSelect').val());

    $('#searchValue').keyup(function(e) {
      console.log($('#departmentFilterSelect').val());
      departmentSelect = $('#departmentFilterSelect option:selected').val();
      console.log(departmentSelect);

      console.log($('#locationFilterSelect').val());
      locationSelect = $('#locationFilterSelect option:selected').val();
      console.log(locationSelect);

      let value = $('#searchValue').val();
      console.log(value);
      if ((value) && (departmentSelect === 'anyDepartment') && (locationSelect === 'anyLocation')) {
        $.ajax({
          url:"libs/php/searchPersonnel.php",
          type: "POST",
          dataType: "JSON",
          data:{
            value: value
          },
            success: function(result){
              $("#user_data").html('');
              console.log(result);
              searchData = 0;
              $.each(result.data, function (index, value) {
                searchData += `<tr data-personnel-id='${value.id}'><td data-title='id'>${value.id}</td><td data-title='First Name'>${value.firstName}</td><td data-title=Last Name'>${value.lastName}</td><td data-title='Location'>${value.location}</td><td data-title='Email'>${value.email}</td><td data-title='Department'>${value.department}</td>`;
                // console.log(value.location);
                searchData += "\
                          <td data-title='Edit/Delete'><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal' data-bs-target='#editEmployeeModal'><i class='far fa-edit'\
                          data-toggle='tooltip' title='Edit'></i></a>\
                          <a href='#' class='delete'><i class='far fa-trash-alt'\
                          data-toggle='tooltip' title='Delete'></i></a></td></tr>";     
                                              
              });
            
              $('#user_data').html(searchData);
      
            },
            error:function(jqXHR){
              console.log(jqXHR);
            }
          
        });
      } 
      else if ((value) && (departmentSelect !== 'anyDepartment') && (locationSelect === 'anyLocation')) {
        $.ajax({
          url:"libs/php/searchDepartmentFilter.php",
          type: "POST",
          dataType: "JSON",
          data:{
            value: value,
            id: departmentSelect
          },
            success: function(result){
              $("#user_data").html('');
              console.log(result);
              searchData = 0;
              $.each(result.data, function (index, value) {
                searchData += `<tr data-personnel-id='${value.id}'><td data-title='id'>${value.id}</td><td data-title='First Name'>${value.firstName}</td><td data-title=Last Name'>${value.lastName}</td><td data-title='Location'>${value.location}</td><td data-title='Email'>${value.email}</td><td data-title='Department'>${value.department}</td>`;
                // console.log(value.location);
                searchData += "\
                          <td data-title='Edit/Delete'><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal' data-bs-target='#editEmployeeModal'><i class='far fa-edit'\
                          data-toggle='tooltip' title='Edit'></i></a>\
                          <a href='#' class='delete'><i class='far fa-trash-alt'\
                          data-toggle='tooltip' title='Delete'></i></a></td></tr>";     
                                              
              });
            
              $('#user_data').html(searchData);
      
            },
            error:function(jqXHR){
              console.log(jqXHR);
            }
          
        });
      } 
      else if ((value) && (departmentSelect === 'anyDepartment') && (locationSelect !== 'anyLocation')) {
        $.ajax({
          url:"libs/php/searchLocationFilter.php",
          type: "POST",
          dataType: "JSON",
          data:{
            value: value,
            id: locationSelect
          },
            success: function(result){
              $("#user_data").html('');
              console.log(result);
              searchData = 0;
              $.each(result.data, function (index, value) {
                searchData += `<tr data-personnel-id='${value.id}'><td data-title='id'>${value.id}</td><td data-title='First Name'>${value.firstName}</td><td data-title=Last Name'>${value.lastName}</td><td data-title='Location'>${value.location}</td><td data-title='Email'>${value.email}</td><td data-title='Department'>${value.department}</td>`;
                // console.log(value.location);
                searchData += "\
                          <td data-title='Edit/Delete'><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal' data-bs-target='#editEmployeeModal'><i class='far fa-edit'\
                          data-toggle='tooltip' title='Edit'></i></a>\
                          <a href='#' class='delete'><i class='far fa-trash-alt'\
                          data-toggle='tooltip' title='Delete'></i></a></td></tr>";     
                                              
              });
            
              $('#user_data').html(searchData);
      
            },
            error:function(jqXHR){
              console.log(jqXHR);
            }
          
        });
      }
      else if ((value) && (departmentSelect !== 'anyDepartment') && (locationSelect !== 'anyLocation')) {
        $.ajax({
          url:"libs/php/searchBothFilters.php",
          type: "POST",
          dataType: "JSON",
          data:{
            value: value,
            locationId: locationSelect,
            departmentId: departmentSelect
          },
            success: function(result){
              $("#user_data").html('');
              console.log(result);
              searchData = 0;
              $.each(result.data, function (index, value) {
                searchData += `<tr data-personnel-id='${value.id}'><td data-title='id'>${value.id}</td><td data-title='First Name'>${value.firstName}</td><td data-title=Last Name'>${value.lastName}</td><td data-title='Location'>${value.location}</td><td data-title='Email'>${value.email}</td><td data-title='Department'>${value.department}</td>`;
                // console.log(value.location);
                searchData += "\
                          <td data-title='Edit/Delete'><a href='#editEmployeeModal' class='edit' data-bs-toggle='modal' data-bs-target='#editEmployeeModal'><i class='far fa-edit'\
                          data-toggle='tooltip' title='Edit'></i></a>\
                          <a href='#' class='delete'><i class='far fa-trash-alt'\
                          data-toggle='tooltip' title='Delete'></i></a></td></tr>";     
                                              
              });
            
              $('#user_data').html(searchData);
      
            },
            error:function(jqXHR){
              console.log(jqXHR);
            }
          
        });
      }
      else {
        $('#user_data').html("");
        $('#user_data').html(data);
        
      }
    })
  }



});

// Sweetalert toast initialize
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});


