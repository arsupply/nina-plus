google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
var data = google.visualization.arrayToDataTable([
    ['Concepto', 'Monto'],
    ['CxC',     500],
    ['CxP',      100]
]);
var options = {
    title: 'Estatus Administrativo'
};

var data2 = google.visualization.arrayToDataTable([
    ['Clientes', 'Cantidad'],
    ['Al Dia', 300],
    ['Morosos', 100]
    ['Suspendidos', 10]    
]);
var options2 = {
    title: 'Clientes'
};

var chart = new google.visualization.PieChart(document.getElementById('piechart'));
var chart2 = new google.visualization.PieChart(document.getElementById('clientes'));
chart.draw(data, options);
chart2.draw(data2, options2);
}


