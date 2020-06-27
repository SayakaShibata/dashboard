//open sideber





// Define a plugin to provide data labels
var dataLabelPlugin = {   afterDatasetsDraw: function (chart, easing) {
        // To only draw at the end of animation, check for easing === 1
        var ctx = chart.ctx;

        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                    // Draw the text in black, with the specified font
                    ctx.fillStyle = 'rgb(255, 255, 255)';

                    var fontSize = 16;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    // Just naively convert to string for now
                    var dataString = dataset.data[index].toString();

                    // Make sure alignment settings are correct
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                });
            }
        });
    }
};



//Project Activity main data
var ctx1 = document.getElementById('p-activity');
var pActivity = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['','MONDAY', 'TUESDAY', 'YWEDNESDAY', 'THURSDAY', 'FRYDAY', 'SATURDAY',''],
        datasets: [{
            label: '',
            data: [22,14, 25, 11, 34, 30, 37,34],
            backgroundColor: [
                'rgba(248, 228, 53, 0.8)',
                'rgba(248, 228, 53, 0.8)',
                'rgba(248, 228, 53, 0.8)',
                'rgba(248, 228, 53, 0.8)',
                'rgba(248, 228, 53, 0.8)',
                'rgba(248, 228, 53, 0.8)',
                'rgba(248, 228, 53, 0.8)',
                'rgba(248, 228, 53, 0.8)'
            ],
            borderColor: [

            ],
            pointRadius: 10,
            borderWidth: 0
        },
        {
            label: '',
            data: [37,34, 26, 32, 24, 14, 16, 4],
            backgroundColor: [
                'rgba(213, 131, 220, 0.8)',
                'rgba(213, 131, 220, 0.8)',
                'rgba(213, 131, 220, 0.8)',
                'rgba(213, 131, 220, 0.8)',
                'rgba(213, 131, 220, 0.8)',
                'rgba(213, 131, 220, 0.8)',
                'rgba(213, 131, 220, 0.8)',
                'rgba(213, 131, 220, 0.8)'
            ],
            borderColor: [

            ],
            pointRadius: 0, 
            borderWidth: 0
        }
        ]
    },
    options: {
        responsive: true,
        legend: {
                display: false       
        },
        offset: true,
        scales: {                          
            xAxes: [                           // Ｘrow
                    {
                        scaleLabel: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
//                            fontColor: "white",
                        },
                        position:'top'
                    }
                ],
            yAxes: [                           // Ｙ
                    {
                        scaleLabel: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            min: 0,
                            max: 50,
                            display: false
                        }
                    }
                ]
        },
        layout: {
            padding: {
                left: -10,
                right: 0,
                top: 20,
        }    
    }

}
,
//plugins: [dataLabelPlugin],
});



//Project Activity day parts
function getToday() { 
      var d = new Date;
      var mon = d.getMonth();
      var day = d.getDate();
      var dow = d.getDay();

      var month = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
      var dows =['Sunday','Monday','Thursday','Wednesday','Thursday','Fryday','Saturday'];
}

//var pNumber = pActivity.data.datasets[1].data;

//document.getElementById(`pDay`).innerHTML= dows[dow] + pNumber;
//document.getElementById(`pDay`).innerHTML= dows[dow] + day + month[mon] +pNumber;


//finance part1 main data

var ctx2 = document.getElementById('f-activity1');
var fActivity1 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['EXPENSE','REVENUE'],
        datasets: [{
            label: '',
            data: [1300,5200],
            backgroundColor: [
                'rgba(223, 255, 47, 1)',
                'rgba(85, 216, 253, 1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        cutoutPercentage: 90,
        responsive: true,
        legend: {
                display: false       
        },               
        maintainAspectRatio: false,
        scales: {                          
            xAxes: [                           // Ｘrow
                    {
                        scaleLabel: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        },
                    }
                ],
            yAxes: [                           // Ｙ
                    {
                        scaleLabel: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }
                ]
        },
        elements: {
            center: {
            text: '',
            color: '#ffffff',
            fontStyle: 'Helvetica',
            sidePadding: 15
            }
          }

    }
});



//Center wrighting plugin
Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      var ctx = chart.chart.ctx;
      var centerConfig = chart.config.options.elements.center;
      var lab = chart.data.labels[0];
      var pay = chart.data.datasets[0].data[0];
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text + lab + ' $'+pay;
      var color = centerConfig.color || '#000';
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
      ctx.font = "30px " + fontStyle;

      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 2);

      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = fontSizeToUse+"px " + fontStyle;
      ctx.fillStyle = color;

      ctx.fillText(txt, centerX, centerY);
    }
  }
});

//finance part2

var ctx3 = document.getElementById('f-activity2');
var fActivity2 = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        labels: ['INCOME','OUTCOME'],
        datasets: [{
            label: '',
            data: [2900,8200],
            backgroundColor: [
                'rgba(255, 204, 51, 1)',
                'rgba(248, 228, 53, 1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        cutoutPercentage: 90,
        responsive: true,
        legend: {
                display: false       
        },               
        maintainAspectRatio: false,
        scales: {                          
            xAxes: [                           // Ｘrow
                    {
                        scaleLabel: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        },
                    }
                ],
            yAxes: [                           // Ｙ
                    {
                        scaleLabel: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }
                ]
        },
        elements: {            
            center: {
            text:'',
            color: '#ffffff',
            fontStyle: 'Helvetica',
            sidePadding: 15
            }
          }

    }
});


//finance part3

var ctx4 = document.getElementById('f-activity3');
var fActivity3 = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        labels: ['TRANSFER','ACCEPT'],
        datasets: [{
            label: '',
            data: [1300,5200],
            backgroundColor: [
                'rgba(255, 102, 153, 1)',
                'rgba(255, 153, 153, 1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        cutoutPercentage: 90,
        responsive: true,
        legend: {
                display: false       
        },               
        maintainAspectRatio: false,
        scales: {                          
            xAxes: [                           // Ｘrow
                    {
                        scaleLabel: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        },
                    }
                ],
            yAxes: [                           // Ｙ
                    {
                        scaleLabel: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }
                ]
        },
        elements: {            
            center: {
            text: '',
            color: '#ffffff',
            fontStyle: 'Helvetica',
            sidePadding: 15
            }
          }

    }
});

//team javascript
var teams =[
{
  'img': 'user1.jpg',
  'name': 'Name 1',
  'position':'position1'
},
{
  'img': 'user2.jpg',
  'name': 'Name 2',
  'position':'position2'
},
{
  'img': 'user3.jpg',
  'name': 'Name 3',
  'position':'position3'
}
];

function teamList(){
        html = '';
          for(var i=0; i<teams.length; i++){ 
            html+= '<div class="team-member"><img src="images/'+teams[i].img+'" class="team-img"><p class="team-name">'+teams[i].name+'</p><br><p class="team-position">'+teams[i].position+'</p></div>';
          }
        html+=``;
        document.getElementById(`teamUser`).innerHTML=html
     } 
teamList();

function addToList(){
        var addImg = document.getElementById('addImg').value;
        var addName = document.getElementById('addName').value;
        var addPosition = document.getElementById('addPosition').value;        
        var who = {
          'img': addImg,
          'name':addImgName,
          'position':addPosition
        };
        teams.push(who);   
        teamList();
        document.getElementById(`addImg`).value="";
        document.getElementById(`addName`).value="";
        document.getElementById(`addPosition`).value="";        
}




























