<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Livros Disponíveis - Livraria</title>

	<!-- CSS Files -->
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/sweetalert.css">

	<!-- JavaScript Files -->
	<script src="js/script.js"></script>
	<script src="js/sweetalert.min.js"></script>
</head>
<body>
	<!-- Page Header -->
	<?php 
		require_once('templates/header.php'); 
	?>

	<div class="container">
	    <div class="jumbotron text-center">
			<h3>Livros Disponíveis</h3>
	    	<button class="btn btn-default btn-lg" id="listBooks" onclick="getBooks()">Listar livros</button>
	    	
	    	<!-- The book is on the table -->
			<table class="table table-hover hidden" id="books-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
						<th>Autor</th>
						<th>Editora</th>
						<th>Ano Lançamento</th>
						<th>Preço</th>
						<th>Está Disponível</th>
						<th>Quantidade</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
	    </div>
	</div>
</body>
</html>