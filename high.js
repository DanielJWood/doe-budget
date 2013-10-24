var test1 = [[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012]];

var items = [[1,2],[3,4],[5,6]];

$( document ).ready(function() {


onClickyhigh();

});

$(function () {
        $('#alaska').click(function(e) {
            map.fitBounds([
            [71.3516, -188.90491],[51.3516, -129.986]
            ]);
        });
        $('#hawaii').click(function(e) {
            map.fitBounds([
            [22.2289, -154.8],[18.948, -159.764]
            ]);
            selectstate();

        });
        $('#usa').click(function(e) {
            map.fitBounds([
            [42.461, -56.979],[32.536, -134.4]
            ]);
            var e = null;
            onClickyhigh();
            selectstate();
        });
    });

function selectstate() {
            if (activedom !== undefined) {
                activedom.setStyle({
                    weight: 1,
                    dashArray: '3',
                    fillOpacity: '0.7'
                });
            } 
}

function onClickyhigh(e) {

//why do i do this???
if (e != null) {
    var layer = e.target.feature;
}
else {
    var layer = statesData.features[51];
};

var expend = document.getElementById('expend');
var statename = document.getElementById('statename');
var legend_name = document.getElementById('legend_name');

//add current value to box at lower left.
///expend.innerHTML = '$' + layer.properties.datapoint[12];
statename.innerHTML = layer.properties.name;


//The below places the lab information into the table.


var tbody = document.getElementById('tbody1');    
while (tbody.firstChild) tbody.removeChild(tbody.firstChild)


var placeholderz = layer.properties.numid - 1;


if (raw[placeholderz][0] == undefined) {
        var tr1 = document.createElement('tr');
        var td1 = document.createElement('td');

        td1.innerHTML = "None";
        tbody.appendChild(tr1);
        tr1.appendChild(td1);   
    } else {
        for (var i = 0; i < raw[placeholderz].length; i++) {    
            var tr1 = document.createElement('tr');
            var td1 = document.createElement('td');     
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');

            td1.innerHTML = raw[placeholderz][i].lab;
            td2.innerHTML = raw[placeholderz][i].state;
            td3.innerHTML = raw[placeholderz][i].money;

            tbody.appendChild(tr1);
            tr1.appendChild(td1);   
            tr1.appendChild(td2);
            tr1.appendChild(td3);
        };
    }




    $('#containerz').highcharts({
        chart: {
            type: 'line',
            marginRight: 10,
            marginLeft: 50,
            marginBottom: 50,
            backgroundColor: null,
            borderRadius: 0        
            },
        title: {
            floating: true,
            text: 'DOE funding allocation in ' + layer.properties.name,
            style: {
                color: '#ffffff'
            }
        },
        subtitle: {
            text: '1900 - 2012',
            floating: true,
            style: {
                color: '#fff'
            }
        },
        xAxis: {
            categories: [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012],
            tickInterval: 1,
            endOnTick: false,
            startOnTick: false,
            tickPosition: 'inside',
            labels: {
                style: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            title: {
                text: '',
                style: {
                    color: '#ffffff'
                }   
            },labels: {
                style: {
                    color: '#fff'
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: ''
            }]
        },
        tooltip: {
            valueSuffix: ' dollars per person per year',
            borderRadius: 0,
            borderColor: '#444444'
        },
        legend: {
            enabled: false
        },
        series: [{
            name: layer.properties.name,
            data: layer.properties.datapoint,
            color: '#f02069', 
        }],
        plotOptions: {
            line: {
                lineWidth: 4,
                marker: {
                    enabled: false
                },
            }
        }
    });
};