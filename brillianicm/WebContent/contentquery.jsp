<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<title>CAKE - Node Content Browser</title>
</head>
<body>
	<h1>Content Browser</h1>
	<hr />
	<h4>Hier könnt ihr die ID des Knotens eingeben, dessen Code ihr
		anschauen möchtet.</h4>
	<h5>Die Konvention für die ID ist lxxxeyyy, also z.B. l001e001.</h5>
	<hr />
	<br />
	<form name="viewnode" id="viewnode" action="Node" method="get"
		enctype="multipart/form-data">
		<table border="0">
			<tr>
				<td>Type Node ID</td>
				<td><input type="text" name="uniqueId" id="uniqueId" size="10" /></td>
			</tr>
			<tr>
				<td>&nbsp;</td>
				<td><input type="submit" value="Senden"></td>
			</tr>
		</table>
	</form>
	<hr />
	<!-- 	<form name="viewnode" id="viewnode" action="Node"  method="get" enctype="multipart/form-data">
		<table border="0">
			<tr>
				<td>Type Node level</td>
				<td><input type="text" name="level" id="level" size="10" /></td>
			</tr>
			<tr>
				<td>Type Node element</td>
				<td><input type="text" name="element" id="element" size="10" /></td>
			</tr>
			<tr>
				<td>&nbsp;</td>
				<td><input type="submit" value="Senden"></td>
			</tr>
		</table>
	</form> 
	<div id="content">
	<h4>Please type the node ID or the level and element above.</h4></div> -->
</body>
</html>