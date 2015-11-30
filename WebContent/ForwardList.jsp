<%@ page language="java" contentType="text/html; utf-8"
    pageEncoding="utf-8"%>
    <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; utf-8">
<title>Insert title here</title>
</head>
<body>
	<table >

		<tr>
			<th width="10%">本级节点</th>
			<th width="15%">上级节点</th>
			<th width="15%">本节点被转发数</th>
		</tr>

		<c:forEach var="f" items="${forwardList}">
			<tr>
					<td width="10%" style="background-color: FFFFFF;">${f.uname}</td>
					<td width="15%" style="background-color: FFFFFF;">${f.fathername}</td>
					<td width="15%" style="background-color: FFFFFF;">${f.forwardnum}</td>
			</tr>
		</c:forEach>

	</table>
</body>
</html>