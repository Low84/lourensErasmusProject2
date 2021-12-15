body {
  color: #566787;
  /* background: #f5f5f5; */
  font-family: 'Rokkitt', serif;
  font-size: 16px;
}

.nav-tabs {
  font-size: 1.3rem;
  display:inline-flex;
}

.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
  color: #fff;
  background-color: #435d7d;
  border-color: #dee2e6 #dee2e6 #fff;
}

.nav-tabs .nav-link {
  color: black;
  border-color: #dee2e6 #dee2e6 #fff;
}

.table-title {        
    padding-bottom: 15px;
    background: #435d7d;
    color: #fff;
    padding: 16px 30px;
    margin: 0px -25px 10px;
    border-radius: 3px 3px 0 0;
    display: -webkit-box;
}
.table-title h2 {
    margin: 5px 0 0;
    font-size: 2rem;
}
.table-title .btn-group {
    float: right;
}
.table-title .btn {
    color: #fff;
    float: right;
    font-size: 13px;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
}
.table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
}
.table-title .btn span {
    float: left;
    margin-top: 2px;
}

.buttonText {
    padding-left: 10px;
}

.addEmployee {
    float: right;
}

.justifyTable {
  align-items: flex-start;
}

th {
  font-size: 1rem;
}

table.table tr th, table.table tr td {
    border-color: #e9e9e9;
    padding: 12px 15px;
    vertical-align: middle;
}
table.table tr th:first-child {
    width: 60px;
}
table.table tr th:last-child {
    width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
    background: #f5f5f5;
}
table.table th i {
    font-size: 1.5rem;
    margin: 0 5px;
    cursor: pointer;
}	
table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
}
/* table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
    outline: none !important;
} */
table.table td a:hover {
    color: #2196F3;
}
table.table td a.edit {
    color: #FFC107;
}
table.table td a.delete {
    color: #F44336;
}
table.table td i {
    font-size: 2.1rem;
}
table.table .avatar {
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
}

/* Searchbar */
input[type=text] {
  /* float: right; */
  
  padding: 6px;
  border: 1px solid black;
  border-radius: 3px;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

#searchBtn {
  padding: 2px 6px;
  border-radius: 3px;
  background-color: rgb(192, 191, 191);
}

.pagination {
    float: right;
    margin: 0 0 5px;
}
.pagination li a {
    border: none;
    font-size: 1rem;
    min-width: 30px;
    min-height: 30px;
    color: #999;
    margin: 0 2px;
    line-height: 30px;
    border-radius: 2px !important;
    text-align: center;
    padding: 0 6px;
}
.pagination li a:hover {
    color: #666;
}	
.pagination li.active a, .pagination li.active a.page-link {
    background: #03A9F4;
}
.pagination li.active a:hover {        
    background: #0397d6;
}
.pagination li.disabled i {
    color: #ccc;
}
.pagination li i {
    font-size: 1rem;
    padding-top: 6px
}
.hint-text {
    float: left;
    margin-top: 10px;
    font-size: 1.2rem;
}    

/* Modal styles */
.modal .modal-dialog {
    max-width: 400px;
}
.modal .modal-header, .modal .modal-body, .modal .modal-footer {
    padding: 20px 30px;
}
.modal .modal-content {
    border-radius: 3px;
}
.modal .modal-footer {
    background: #ecf0f1;
    border-radius: 0 0 3px 3px;
}
.modal .modal-title {
    display: inline-block;
}
.modal .form-control {
    border-radius: 2px;
    box-shadow: none;
    border-color: #dddddd;
}
.modal textarea.form-control {
    resize: vertical;
}
.modal .btn {
    border-radius: 2px;
    min-width: 100px;
}	
.modal form label {
    font-weight: normal;
}

/* Hiding the ID column */
th:nth-of-type(1) {
  display: none;
}

td:nth-of-type(1) {
  display: none;
}

@media only screen and (max-width: 800px) {
	
	/* Force table to not be like tables anymore */
	 table, 
	 thead, 
   tbody, 
	 th, 
	 td, 
	 tr { 
		display: block; 
	}
 
	/* Hide table headers (but not display: none;, for accessibility) */
   thead tr { 
		position: absolute;
		top: -9999px;
		left: -9999px;
	}
 
	 tr { 
     margin: 0 0 1rem 0;
     border: 1px solid #ccc; 
    }
 
	 td { 
		/* Behave  like a "row" */
		border: none;
		border-bottom: 1px solid #eee; 
		position: relative;
		padding-left: 50%; 
		white-space: normal;
		text-align: right;
	}
 
	 td:before { 
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 27%;
		left: 6px;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
		text-align:left;
		font-weight: bold;
	}
 
	/* Label the data */
	
  td:before { 
    content: attr(data-title); 
  }
}
