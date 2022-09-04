DrawTankTypesPieUtils = {
    PrintTankTypeCountsToMetadataDiv: function(){   

        d3.select("#moredata").selectAll("*").remove();
        var x = d3.select("#moredata").append("div").attr("class", "piemoredata col-md-12");
        var count=[0,0,0,0,0];
        for (let step = 0; step < tankCount; step++) {
            if(tankTypes[step]=="Light Tank"){
                count[0]++;
            }
            if(tankTypes[step]=="Medium Tank"){
                count[1]++;
            }
            if(tankTypes[step]=="Heavy Tank"){
                count[2]++;
            }
            if(tankTypes[step]=="Tank Destroyer"){
                count[3]++;
            }
            if(tankTypes[step]=="SPG"){
                count[4]++;
            }
        }
        
        x.append("p").text("Light Tanks: "+count[0]);
        x.append("p").text("Medium Tanks: "+count[1]);
        x.append("p").text("Heavy Tanks: "+count[2]);
        x.append("p").text("Tank Destroyers: "+count[3]);
        x.append("p").text("SPGs: "+count[4]);

    }
}




function DrawTankTypesPie(){
    d3.select("#moredata").selectAll("*").remove();

    DrawTankTypesPieUtils.PrintTankTypeCountsToMetadataDiv();
    
    var data = [
        {name: 'LT', value: 0},
        {name: 'MT', value: 0},
        {name: 'HT', value: 0},
        {name: 'TD', value: 0},
        {name: 'SPG', value: 0}
        ];
        
    for (let step = 0; step < tankCount; step++) {
        if(tankTypes[step]=="Light Tank"    ){data[0].value=data[0].value+tankBattles[step];}
        if(tankTypes[step]=="Medium Tank"   ){data[1].value=data[1].value+tankBattles[step];}
        if(tankTypes[step]=="Heavy Tank"    ){data[2].value=data[2].value+tankBattles[step];}
        if(tankTypes[step]=="Tank Destroyer"){data[3].value=data[3].value+tankBattles[step];}
        if(tankTypes[step]=="SPG"           ){data[4].value=data[4].value+tankBattles[step];}
    }

    var pie = d3.pie()
    .value(function(d) { return d.value; });

    pie(data);

    var margin = {top: 20, bottom: 70, left:40, right: 20};
    var width = 1000 - margin.left - margin.right;
    var height = 700- margin.top - margin.bottom;
    var outerRadius = 200;
    var innerRadius = 120;

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    var pieArcs = svg.selectAll("g.pie")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "pie")
    .attr("transform", "translate(" + (width / 2) + ", " + (height / 2) + ")");

    pieArcs.append("path")
    .attr("fill", function(d) { return color(d); })
    .attr("d", arc);

    pieArcs.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; }) 
    .attr("text-anchor", "middle")
    .text(function(d) { 
        if(d.data.value!=0){
            return d.value;             
        }
        else{
            return "";
        }
    });

    pieArcs.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d)[0]*1.4 + "," + (arc.centroid(d)[1]*1.4) + ")" }) 
    .attr("text-anchor", "middle")
    .text(function(d) { 
        if(d.data.value!=0){
            return d.data.name;             
        }
        else{
            return "";
        }
    });

    pieArcs.append("text")    
    .attr("class", "piemiddle")
    .attr("text-anchor", "middle")
    .text("Battles per tank type");

    // TheObject.DrawLegend(svg);

    pieArcs.on('mouseover',function(d, i){
        d3.select(this).transition()            
            .duration('50')
            .attr('opacity','.85')
            .duration(50)
            .style("opacity",1);            

        }).on('mouseout',function(d, i){
            d3.select(this).transition()
            .duration('50')
            .attr('opacity','1');
        }).on('click',function(d, i){


      }); 
}
