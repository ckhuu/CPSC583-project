var data = [
    ["Cash",10, 10],
    ["Small",20, 20],
    ["Mid", 35, 0],
    ["Large", 20, 55],
    ["Equity", 10, 10],
    ["Other",10, 10]
];


var chart = document.getElementById("chart"),
    axisMargin = 20,
    margin = 20,
    valueMargin = 4,
    width = chart.clientWidth,
    height = chart.clientHeight,
    barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
    barPadding = (height-axisMargin-margin*2)*0.6/data.length,
    data, bar, svg, scale, xAxis, labelWidth = 0;

max = d3.max(data.map(function(i){
    return i[1];
}));

svg = d3.select(chart)
    .append("svg")
    .attr("width", width)
    .attr("height", height);


bar = svg.selectAll("g")
    .data(data)
    .enter()
    .append("g");

bar.attr("class", "bar")
    .attr("cx",0)
    .attr("transform", function(d, i) {
        return "translate(" + 0 + "," + (i * (barHeight + barPadding) + barPadding) + ")";
    });

bar.append("text")
    .attr("class", "label")
    .attr("y", barHeight / 2)
    .attr("dy", ".35em") //vertical align middle
    .text(function(d){
        return d[1] + "%";
    }).each(function() {
    labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
});

scale = d3.scaleLinear()
    .domain([0, 100]) //.domain([0, max])
    .range([0, width - margin*2 - labelWidth]);

//xAxis = d3.svg.axis()
//.scale(scale)
//.tickSize(-height + 2*margin + axisMargin)
//.orient("bottom");

bar.append("rect")
    .attr("transform", "translate("+labelWidth+", 0)")
    .attr("height", barHeight)
    .attr("width", function(d){
        return scale(d[1]);
    });

bar.append("text")
    .attr("class", "value")
    .attr("y", barHeight / 2)
    .attr("dx", -valueMargin + labelWidth) //margin right
    .attr("dy", ".35em") //vertical align middle
    .attr("text-anchor", "end")
    .text(function(d){
        return d[1];
    })
    .attr("x", function(d){
        var width = this.getBBox().width;
        return Math.max(width + valueMargin, scale(d[1]));
    });

svg.insert("g",":first-child")
    .attr("class", "axis")
    .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")");
//.call(xAxis);





//-----------------
var chart1 = document.getElementById("chart1"),
    axisMargin1 = 20,
    margin1 = 20,
    valueMargin1 = 4,
    width1 = chart1.clientWidth,
    height1 = chart1.clientHeight,
    barHeight1 = (height1-axisMargin1-margin1*2)* 0.4/data.length,
    barPadding1 = (height1-axisMargin1-margin1*2)*0.6/data.length,
    data1, bar1, svg1, scale1, xAxis1, labelWidth1 = 0, labelWidth2= 0;

max1 = d3.max(data.map(function(i){
    return i[2];
}));

svg1 = d3.select(chart1)
    .append("svg")
    .attr("width", width1)
    .attr("height", height);


bar1 = svg1.selectAll("g")
    .data(data)
    .enter()
    .append("g");

bar1.attr("class", "bar")
    .attr("cx",0)
    .attr("transform", function(d, i) {
        return "translate(" + margin1 + "," + (i * (barHeight1 + barPadding1) + barPadding1) + ")";
    });

bar1.append("text")
    .attr("class", "label")
    .attr("y", barHeight1 / 2)
    .attr("dy", ".35em") //vertical align middle
    .text(function(d){
        return d[0];
    }).each(function() {
    labelWidth1 = Math.ceil(Math.max(labelWidth1, this.getBBox().width));
});

bar1.append("text")
    .attr("class", "label")
    .attr("y", barHeight1 / 2)
    .attr("x", 70)
    .attr("dy", ".35em") //vertical align middle
    .text(function(d){
        return d[2] + "%";
    }).each(function() {
    labelWidth2 = Math.ceil(Math.max(labelWidth2+5, this.getBBox().width));
});

scale1 = d3.scaleLinear()
    .domain([0, 100]) //.domain([0, max1])
    .range([0, width1 - margin1*2 - labelWidth1 -labelWidth2]);

xAxis1 = d3.axisBottom()
    .scale(scale1)
    .tickSize(-height1 + 2*margin1 + axisMargin1);

bar1.append("rect")
    .attr("transform", "translate("+(labelWidth1+labelWidth2)+", 0)")
    .attr("height", barHeight1)
    .attr("width", function(d){
        return scale1(d[2]);
    });

bar1.append("text")
    .attr("class", "value")
    .attr("y", barHeight1 / 2)
    .attr("dx", -valueMargin1 + labelWidth1+labelWidth2) //margin right
    .attr("dy", ".35em") //vertical align middle
    .attr("text-anchor", "end")
    .text(function(d){
        return d[2];
    })
    .attr("x", function(d){
        var width = this.getBBox().width;
        return Math.max(width + valueMargin1, scale1(d[2]));
    });

svg1.insert("g",":first-child")
    .attr("class", "axis")
    .attr("transform", "translate(" + (margin1 + labelWidth1+labelWidth2) + ","+ (height1 - axisMargin1 - margin1)+")");
//.call(xAxis1)
//.call(yAxis1);

bar1.append("line")
    .attr("class", "line")
    .style("stroke", "black")
    .attr("x1", width + labelWidth1)
    .attr("y1", -10).attr("y2", -10);

bar.append("line")
    .attr("class", "line")
    .style("stroke", "black")
    .attr("x1", 300)
    .attr("y1", -10).attr("y2", -10);