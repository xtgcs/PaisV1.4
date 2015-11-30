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
			<th width="10%">序列号</th>
			<th width="15%">UCL标签</th>
			<th width="15%">转发</th>
		</tr>

		<c:forEach var="l" items="${uclList}">
			<tr>
					<td width="10%" style="background-color: FFFFFF;">${l.id}</td>
					<td width="15%" style="background-color: FFFFFF;">${l.topic}</td>
					<td width="15%" style="background-color: FFFFFF;"><a href="/Forward/getForwardList.do?topic=${l.id}">转发路径</a></td>
			</tr>
		</c:forEach>

	</table>
</body>
</html>