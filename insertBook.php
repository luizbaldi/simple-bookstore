<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Incluir Dados - Livraria</title>

	<!-- CSS Files -->
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/sweetalert.css">

	<!-- JavaScript Files -->
	<script src="js/insertBook.js"></script>
	<script src="js/lib/sweetalert.min.js"></script>
</head>
<body>
	<!-- Page Header -->
	<?php 
		require_once('templates/header.php'); 
	?>

    <div class="container">
    	<div class="jumbotron">
    		<h2 class="text-center">Cadastrar novo livro</h2>

    		<form>
	    		<div class="input-group">
					<span class="input-group-addon">Nome </span>
					<input type="text" class="form-control" name="name">
				</div>
				<br />
				<div class="input-group">
					<span class="input-group-addon">Autor </span>
					<input type="text" class="form-control" name="author">
				</div>
				<br />
				<div class="input-group">
					<span class="input-group-addon">Editora </span>
					<input type="text" class="form-control" name="company">
	    		</div>
	    		<br />
				<div class="input-group">
					<span class="input-group-addon">Ano de lançamento </span>
					<input type="text" class="form-control" name="launchDate">
	    		</div>
	    		<br />
				<div class="input-group">
					<span class="input-group-addon">Preço (R$) </span>
					<input type="text" class="form-control" name="price">
	    		</div>
	    		<br />
				<div class="input-group">
					<span class="input-group-addon">Está disponivel </span>
					<!-- <input type="text" class="form-control" name="isAvaible" placeholder="Sim/Nao">		 -->
					<div class="radio">
						<label>
							<input type="radio" name="isAvaible" id="optionYes" value="1">
							Sim
						</label>
						<label>
							<input type="radio" name="isAvaible" id="optionNo" value="0">
							Não
						</label>
					</div>
				</div>
				<br />
				<div class="input-group">
					<span class="input-group-addon">Quantidade </span>
					<input type="text" class="form-control" name="quantity">
	    		</div>

	    		<br />
	    		<div class="btn-group btn-group-justified" role="group">
	    			<div class="btn-group" role="group">
	    				<button type="button" class="btn btn-primary" onclick="saveBook()">Enviar</button>
	    				<br /><br />
	    				<button type="button" class="btn btn-default">Limpar</button>
	    			</div>
	    		</div>
    		</form>
    	</div>
    </div>
</body>
</html>