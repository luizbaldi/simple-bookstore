<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Incluir Dados - Livraria</title>

	<!-- CSS Files -->
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/sweetalert.css">
	
	<!-- JavaScript Files -->
	<script src="js/lib/sweetalert.min.js"></script>
	<script src="js/getBooks.js"></script>
	<script src="js/deleteBook.js"></script>
</head>
<body onload="getBooks('delete')">
	<!-- Page Header -->
	<?php 
	require_once('templates/header.php'); 
	?>

	<div class="container">
	    <div class="jumbotron text-center">
	    	<h3>Selecione o livro que deseja excluir</h3>

	    	<div class="row">
	    		<div class="col-xs-2"></div>
	    		<div class="col-xs-8">
			    	<div class="list-group" id="booksList">
			    	</div>	
	    		</div>
	    		<div class="col-xs-2"></div>
	    	</div>
	    </div>
	</div>
</body>
</html>