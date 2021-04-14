//
// var topLabel = document.getElementsByClassName("topLabel");
// topLabel.attr("")

// The starting code for this visualization was from the following source: https://codepen.io/parminderkaur/pen/ZWYawx
const render = data => {

    var chartWomen = document.getElementById("chartWomen"),
        axisMargin = 20,
        margin = 20,
        valueMargin = 4,
        width = chartWomen.clientWidth,
        height = chartWomen.clientHeight + 7000,
        barHeight = (height-axisMargin-margin*2)* 0.6/data.length, // determines the height of the bar
        barPadding = (height-axisMargin-margin*2)*0.4/data.length, // increase the padding by increasing the decimal value
        data, bar, svg, scale, xAxis, labelWidth1 = 0, labelWidth2 = 0, labelWidth = 0;;

    // default settings for major category and sorting
    var selectedOption = "All Majors";
    var sortNum = 2;
    var isDescending = true;

    // var max = 1;

    // Define the div for the tooltip
    var divToolTip = d3.select("body").append("div").attr("class", "tooltip")
        .style("opacity", 0);

    var majorTitles = document.getElementById("majorTitle"),
        majorWidth = majorTitles.clientWidth,
        majorHeight = majorTitles.clientHeight + 7200;

    // svg for college major title
    var svgMajor = d3.select(majorTitles)
        .append("svg")
        .attr("width", majorWidth)
        .attr("height", majorHeight);

    var barMajor = svgMajor.selectAll("g")
        .data(data)
        .enter()
        .append("g");

    barMajor.attr("class", "bar")
        .attr("cx",0)
        .attr("transform", function(d, i) {
            return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });

    // append y axis label for majors
    barMajor.append("text")
        .attr("class", "label")
        .attr("id", "majors")
        .attr("y", barHeight / 2)
        .attr("dy", ".35em") //vertical align middle
        .text(function(d){
            return (d.major);
        }).each(function() {
        labelWidth1 = Math.ceil(Math.max(labelWidth1, this.getBBox().width));
    });


    /** Code to generate first set of bars - women's share **/

    // add svg
    var svgWomen = d3.select(chartWomen)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // create bars
    var barWomen = svgWomen.selectAll("g")
        .data(data)
        .enter()
        .append("g");

    barWomen.attr("class", "bar")
        .attr("cx",0)
        .attr("transform", function(d, i) {
            return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });

    // // append y axis label for majors
    // barWomen.append("text")
    //     .attr("class", "label")
    //     .attr("id", "majors")
    //     .attr("y", barHeight / 2)
    //     .attr("dy", ".35em") //vertical align middle
    //     .text(function(d){
    //         return (d.major);
    //     }).each(function() {
    //     labelWidth1 = Math.ceil(Math.max(labelWidth1, this.getBBox().width));
    //     });

    // // add labels to the left of the bar
    // barWomen.append("text")
    //     .attr("class", "label")
    //     .attr("x", 300)
    //     .attr("y", barHeight / 2)
    //     .attr("dy", ".35em") //vertical align middle
    //     .text(function(d){
    //         return (d.women*100) + "%";
    //     }).each(function() {
    //     labelWidth2 = Math.ceil(Math.max(labelWidth2+5, this.getBBox().width));
    // });

    var scaleWomen = d3.scaleLinear()
        .domain([0, 1])
        .range([0, width - margin*2 - labelWidth]);

    var xAxis1 = d3.axisBottom()
        .scale(scaleWomen)
        .tickSize(-height + 2*margin + axisMargin);

    barWomen.append("rect")
        .attr("transform", "translate("+(labelWidth)+", 0)")
        .attr("height", barHeight)
        .attr("width", function(d){
            return scaleWomen(d.women);
        })
        .attr("fill", "#b09cff")
        .attr("class", function(d){
            return (d.majorCategory);
        })
        .on("mouseover", function(d) {
            divToolTip.transition()
                .duration(200)
                .style("opacity", .9);
            divToolTip.html((d3.format(".3n")(d.women*100)) + "%")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // text for label overlapping the bar
    barWomen.append("text")
        .attr("class", "value")
        .attr("y", barHeight / 2)
        .attr("dx", -valueMargin + labelWidth) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .attr("fill", "#5c5282")
        .text(function(d){
            return d3.format(".3n")(d.women*100) + "%";
        })
        .attr("x", function(d){
            var width = this.getBBox().width;
            return Math.max(width + valueMargin, scaleWomen(d.women));
        })
        .on("mouseover", function(d) {
            divToolTip.transition()
                .duration(200)
                .style("opacity", .9);
            divToolTip.html((d3.format(".3n")(d.women*100)) + "%")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svgWomen.insert("g",":first-child")
        .attr("class", "axis")
        .attr("transform", "translate(" + (margin + labelWidth1+labelWidth2) + ","+ (height - axisMargin - margin)+")");

    // append horizontal lines
    barWomen.append("line")
        .attr("class", "line")
        .attr("x0", -50)
        .attr("x1", width + labelWidth)
        .attr("y1", -10).attr("y2", -10);

    /** End of women's share code **/


    /** Code to create second column of bars - Median income **/
    var chartMedian = document.getElementById("chartMedian"),
        // axisMargin = 20,
        // margin = 20,
        // valueMargin = 4,
        width2 = chartMedian.clientWidth,
        height = chartMedian.clientHeight + 7000
    // barHeight = (height-axisMargin-margin*2)* 0.6/data.length, // determines the height of the bar
    // barPadding = (height-axisMargin-margin*2)*0.4/data.length, // increase the padding by increasing the decimal value
    // data, bar, svg, scale, xAxis, labelWidth1 = 0, labelWidth2 = 0;


    // add svg
    var svgMedian = d3.select(chartMedian)
        .append("svg")
        .attr("width", width2)
        .attr("height", height);

    // create bars
    var barMedian = svgMedian.selectAll("g")
        .data(data)
        .enter()
        .append("g");

    barMedian.attr("class", "bar")
        .attr("cx",0)
        .attr("transform", function(d, i) {
            return "translate(" + 0 + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });

    scaleMedian = d3.scaleLinear()
        .domain([0, 1])
        .range([0, width2 - margin*2 - labelWidth]);

    barMedian.append("rect")
        .attr("transform", "translate("+(labelWidth)+", 0)")
        .attr("height", barHeight)
        .attr("width", function(d){
            return scaleMedian(d.median);
        })
        .attr("fill", "#66C1D2")
        .on("mouseover", function(d) {
            divToolTip.transition()
                .duration(200)
                .style("opacity", .9);
            divToolTip.html("$" + (d3.format(",d")(d.median*110000)))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // text for label overlapping the bar
    barMedian.append("text")
        .attr("class", "value")
        .attr("y", barHeight / 2)
        .attr("dx", -valueMargin + labelWidth) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .attr("fill", "#045D6E")
        .text(function(d){
            return "$" + d3.format(",d")(d.median*110000); // 110000 is the value we divided to get this value, multiplying to get the original median
        })
        .attr("x", function(d){
            var width = this.getBBox().width;
            return Math.max(width + valueMargin, scaleMedian(d.median));
        })
        .on("mouseover", function(d) {
            divToolTip.transition()
                .duration(200)
                .style("opacity", .9);
            divToolTip.html("$" + (d3.format(",d")(d.median*110000)))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svgMedian.insert("g",":first-child")
        .attr("class", "axis")
        .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")");

    // append lines
    barMedian.append("line")
        .attr("class", "line")
        .attr("x0", -50)
        .attr("x1", width + labelWidth)
        .attr("y1", -10).attr("y2", -10);

    /** End of median income code **/

    /** Code for third column of bars - Percentage Employed FullTime **/
    var chartFt = document.getElementById("chartFt"),
        width = chartFt.clientWidth,
        height = chartFt.clientHeight + 7000,
        labelWidth = 0;

    // add svg
    svgFt = d3.select(chartFt)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // create bars
    barFt = svgFt.selectAll("g")
        .data(data)
        .enter()
        .append("g");

    barFt.attr("class", "bar")
        .attr("cx",0)
        .attr("transform", function(d, i) {
            return "translate(" + 0 + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });

    scaleFt = d3.scaleLinear()
        .domain([0, 1])
        .range([0, width - margin*2 - labelWidth]);

    // create rectangles for bars
    barFt.append("rect")
        .attr("transform", "translate("+(labelWidth)+", 0)")
        .attr("height", barHeight)
        .attr("width", function(d){
            return scaleFt(d.fulltime);
        })
        .attr("fill", "#A2C6A1")
        .on("mouseover", function(d) {
            divToolTip.transition()
                .duration(200)
                .style("opacity", .9);
            divToolTip.html((d3.format(".3n")(d.fulltime*100)) + "%")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // text for label overlapping the bar
    barFt.append("text")
        .attr("class", "value")
        .attr("y", barHeight / 2)
        .attr("dx", -valueMargin + labelWidth) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .attr("fill", "#1E5D1B")
        .text(function(d){
            return d3.format(".3n")(d.fulltime*100) + "%";
        })
        .attr("x", function(d){
            var width = this.getBBox().width;
            return Math.max(width + valueMargin, scaleFt(d.fulltime));
        })
        .on("mouseover", function(d) {
            divToolTip.transition()
                .duration(200)
                .style("opacity", .9);
            divToolTip.html((d3.format(".3n")(d.fulltime*100)) + "%")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svgFt.insert("g",":first-child")
        .attr("class", "axis")
        .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")");

    // append lines
    barFt.append("line")
        .attr("class", "line")
        .attr("x0", -10)
        .attr("x1", width + labelWidth)
        .attr("y1", -10).attr("y2", -10);

    /** End of percentage full time code **/

    /** Code for fourth column of bars - Percentage of the total requiring a college degree **/
    var chartCollege = document.getElementById("chartCollege"),
        width = chartCollege.clientWidth,
        height = chartCollege.clientHeight + 7000,
        labelWidth = 0;

    // add svg
    svgCollege = d3.select(chartCollege)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // create bars
    barCollege = svgCollege.selectAll("g")
        .data(data)
        .enter()
        .append("g");

    barCollege.attr("class", "bar")
        .attr("cx",0)
        .attr("transform", function(d, i) {
            return "translate(" + 0 + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });

    scaleCollege = d3.scaleLinear()
        .domain([0, 1])
        .range([0, width - margin*2 - labelWidth]);

    // create rectangles for bars
    barCollege.append("rect")
        .attr("transform", "translate("+(labelWidth)+", 0)")
        .attr("height", barHeight)
        .attr("width", function(d){
            return scaleCollege(d.college);
        })
        .attr("fill", "#f0a156")
        .on("mouseover", function(d) {
            divToolTip.transition()
                .duration(200)
                .style("opacity", .9);
            divToolTip.html(d3.format(".3n")(d.college*100) + "%")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // text for label overlapping the bar
    barCollege.append("text")
        .attr("class", "value")
        .attr("y", barHeight / 2)
        .attr("dx", -valueMargin + labelWidth) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .attr("fill", "#914f10")
        .text(function(d){
            return d3.format(".3n")(d.college*100) + "%";
        })
        .attr("x", function(d){
            var width = this.getBBox().width;
            return Math.max(width + valueMargin, scaleCollege(d.college));
        })
        .on("mouseover", function(d) {
            divToolTip.transition()
                .duration(200)
                .style("opacity", .9);
            divToolTip.html(d3.format(".3n")(d.college*100) + "%")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svgCollege.insert("g",":first-child")
        .attr("class", "axis")
        .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")");

    // append lines
    barCollege.append("line")
        .attr("class", "line")
        .attr("x0", -10)
        .attr("x1", width + labelWidth)
        .attr("y1", -10).attr("y2", -10);

    /** End of percentage college jobs code **/


    /** Code for fifth column of bars - Unemploymen Rate **/
    var chartUnemployed = document.getElementById("chartUnemployed"),
        width = chartUnemployed.clientWidth,
        height = chartUnemployed.clientHeight + 7000,
        labelWidth = 0;

    // add svg
    svgUnemployed = d3.select(chartUnemployed)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // create bars
    barUnemployed = svgUnemployed.selectAll("g")
        .data(data)
        .enter()
        .append("g");

    barUnemployed.attr("class", "bar")
        .attr("cx",0)
        .attr("transform", function(d, i) {
            return "translate(" + 0 + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });

    scaleUnemployed = d3.scaleLinear()
        .domain([0, 1])
        .range([0, width - margin*2 - labelWidth]);

    // create rectangles for bars
    barUnemployed.append("rect")
        .attr("transform", "translate("+(labelWidth)+", 0)")
        .attr("height", barHeight)
        .attr("width", function(d){
            return scaleUnemployed(d.unemploymentRate);
        })
        .attr("fill", "#c0392b")
        .on("mouseover", function(d) {
            divToolTip.transition()
                .duration(200)
                .style("opacity", .9);
            divToolTip.html(d3.format(".3n")(d.unemploymentRate*100) + "%")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 0);
        });

// text for label overlapping the bar
    barUnemployed.append("text")
        .attr("class", "value")
        .attr("y", barHeight / 2)
        .attr("dx", -valueMargin + labelWidth) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .attr("fill", "#c0392b")
        .text(function(d){
            return d3.format(".3n")(d.unemploymentRate*100) + "%";
        })
        .attr("x", function(d){
            var width = this.getBBox().width;
            return Math.max(width + valueMargin, (scaleUnemployed(d.unemploymentRate)+width+(valueMargin*2)));
        });

    svgUnemployed.insert("g",":first-child")
        .attr("class", "axis")
        .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")");

    // append lines
    barUnemployed.append("line")
        .attr("class", "line")
        .attr("x0", -10)
        .attr("x1", width/1.5)
        .attr("y1", -10).attr("y2", -10);

    /** End of unemployment rate code **/


    // List of majors
    var allMajors = ["All Majors", "Agriculture & Natural Resources", "Arts", "Biology & Life Science", "Business", "Communications & Journalism",
            "Computers & Mathematics", "Education", "Engineering", "Health", "Humanities & Liberal Arts", "Industrial Arts & Consumer Services",
            "Interdisciplinary", "Law & Public Policy", "Physical Sciences", "Psychology & Social Work", "Social Science"]

    // add the options to the majors dropdown button
    d3.select("#major-dropdown")
        .selectAll('myOptions')
        .data(allMajors)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // event upon selecting a dropdown option
    d3.select("#major-dropdown").on("change", function(d) {
        // recover the option that has been chosen
        selectedOption = d3.select(this).property("value")
        updateFilter(selectedOption);

        // let filteredData = identifyFilter(selectedOption);
        // redrawBars(filteredData);
    });

    /** Identify what to filter the data by based on the dropdown menu **/
    function identifyFilter(selectedOption) {
        // don't use filter if all majors are chosen
        if (selectedOption === "All Majors") {
            return data;
        } else {
            return (data.filter(function(d){return d.majorCategory === selectedOption }));
        }
    }

    function updateFilter(selectedOption) {
        console.log("selected: " + selectedOption);
        let dataFilter = identifyFilter(selectedOption);

        // if it's being sorted by descending, keep the sort
        if (isDescending) {
            sortDescending(dataFilter, sortNum);
        } else {
            // if it's not being sorted by descending, keep ascending sort
            sortAscending(dataFilter, sortNum);
        }



        // // don't use filter if all majors are chosen
        // if (selectedOption === "All Majors") {
        //     var dataFilter = data;
        // } else {
        //     var dataFilter = data.filter(function(d){return d.majorCategory === selectedOption });
        // }
        // redrawBars(dataFilter);
    }

    function redrawBars(dataFilter) {
        // removes everything inside the svg for each div
        svgMajor.selectAll("g").remove("g");
        svgWomen.selectAll("g").remove("g");
        svgMedian.selectAll("g").remove("g");
        svgFt.selectAll("g").remove("g");
        svgCollege.selectAll("g").remove("g");
        svgUnemployed.selectAll("g").remove("g");

        /** Major column: recreate text **/
        barMajor = svgMajor.selectAll("g")
            .data(dataFilter)
            .enter()
            .append("g");

        barMajor.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        // append y axis label for majors
        barMajor.append("text")
            .attr("class", "label")
            .attr("id", "majors")
            .attr("y", barHeight / 2)
            .attr("dy", ".35em") //vertical align middle
            .text(function(d){
                return (d.major);
            }).each(function() {
            labelWidth1 = Math.ceil(Math.max(labelWidth1, this.getBBox().width));
        });

        /** Column 1: recreate bars **/
        // create bars
        barWomen = svgWomen.selectAll("g")
                .data(dataFilter)
                .enter()
                .append("g");

        barWomen.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        barWomen.append("rect")
            .attr("transform", "translate("+(labelWidth)+", 0)")
            .attr("height", barHeight)
            .attr("width", function(d){
                return scaleWomen(d.women);
            })
            .attr("fill", "#b09cff")
            .attr("class", function(d){
                return (d.majorCategory);
            })
            .on("mouseover", function(d) {
                divToolTip.transition()
                    .duration(200)
                    .style("opacity", .9);
                divToolTip.html((d3.format(".3n")(d.women*100)) + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // text for label overlapping the bar
        barWomen.append("text")
            .attr("class", "value")
            .attr("y", barHeight / 2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .attr("fill", "#5c5282")
            .text(function(d){
                return d3.format(".3n")(d.women*100) + "%";
            })
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin, scaleWomen(d.women));
            })
            .on("mouseover", function(d) {
                divToolTip.transition()
                    .duration(200)
                    .style("opacity", .9);
                divToolTip.html((d3.format(".3n")(d.women*100)) + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgWomen.insert("g",":first-child")
            .attr("class", "axis")
            .attr("transform", "translate(" + (margin + labelWidth1+labelWidth2) + ","+ (height - axisMargin - margin)+")");

        // append horizontal lines
        barWomen.append("line")
            .attr("class", "line")
            .attr("x0", -50)
            .attr("x1", width + labelWidth)
            .attr("y1", -10).attr("y2", -10);


        /** Column 2: recreate bars **/

        barMedian = svgMedian.selectAll("g")
            .data(dataFilter)
            .enter()
            .append("g");

        barMedian.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(" + 0 + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        barMedian.append("rect")
            .attr("transform", "translate("+(labelWidth)+", 0)")
            .attr("height", barHeight)
            .attr("width", function(d){
                return scaleMedian(d.median);
            })
            .attr("fill", "#66C1D2")
            .on("mouseover", function(d) {
                divToolTip.transition()
                    .duration(200)
                    .style("opacity", .9);
                divToolTip.html("$" + (d3.format(",d")(d.median*110000)))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // text for label overlapping the bar
        barMedian.append("text")
            .attr("class", "value")
            .attr("y", barHeight / 2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .attr("fill", "#045D6E")
            .text(function(d){
                return "$" + d3.format(",d")(d.median*110000); // 110000 is the value we divided to get this value, multiplying to get the original median
            })
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin, scaleMedian(d.median));
            })
            .on("mouseover", function(d) {
                divToolTip.transition()
                    .duration(200)
                    .style("opacity", .9);
                divToolTip.html("$" + (d3.format(",d")(d.median*110000)))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgMedian.insert("g",":first-child")
            .attr("class", "axis")
            .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")");

        // append lines
        barMedian.append("line")
            .attr("class", "line")
            .attr("x0", -50)
            .attr("x1", width2 + labelWidth)
            .attr("y1", -10).attr("y2", -10);

        /** Column 3: recreate bars **/

        // create bars
        barFt = svgFt.selectAll("g")
            .data(dataFilter)
            .enter()
            .append("g");

        barFt.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(" + 0 + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        // create rectangles for bars
        barFt.append("rect")
            .attr("transform", "translate("+(labelWidth)+", 0)")
            .attr("height", barHeight)
            .attr("width", function(d){
                return scaleFt(d.fulltime);
            })
            .attr("fill", "#A2C6A1")
            .on("mouseover", function(d) {
                divToolTip.transition()
                    .duration(200)
                    .style("opacity", .9);
                divToolTip.html((d3.format(".3n")(d.fulltime*100)) + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // text for label overlapping the bar
        barFt.append("text")
            .attr("class", "value")
            .attr("y", barHeight / 2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .attr("fill", "#1E5D1B")
            .text(function(d){
                return d3.format(".3n")(d.fulltime*100) + "%";
            })
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin, scaleFt(d.fulltime));
            })
            .on("mouseover", function(d) {
                divToolTip.transition()
                    .duration(200)
                    .style("opacity", .9);
                divToolTip.html((d3.format(".3n")(d.fulltime*100)) + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgFt.insert("g",":first-child")
            .attr("class", "axis")
            .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")");

        // append lines
        barFt.append("line")
            .attr("class", "line")
            .attr("x0", -10)
            .attr("x1", width + labelWidth)
            .attr("y1", -10).attr("y2", -10);

        /** Column 4: recreate bars **/

        barCollege = svgCollege.selectAll("g")
            .data(dataFilter)
            .enter()
            .append("g");

        barCollege.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(" + 0 + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        // create rectangles for bars
        barCollege.append("rect")
            .attr("transform", "translate("+(labelWidth)+", 0)")
            .attr("height", barHeight)
            .attr("width", function(d){
                return scaleCollege(d.college);
            })
            .attr("fill", "#f0a156")
            .on("mouseover", function(d) {
                divToolTip.transition()
                    .duration(200)
                    .style("opacity", .9);
                divToolTip.html(d3.format(".3n")(d.college*100) + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // text for label overlapping the bar
        barCollege.append("text")
            .attr("class", "value")
            .attr("y", barHeight / 2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .attr("fill", "#914f10")
            .text(function(d){
                return d3.format(".3n")(d.college*100) + "%";
            })
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin, scaleCollege(d.college));
            })
            .on("mouseover", function(d) {
                divToolTip.transition()
                    .duration(200)
                    .style("opacity", .9);
                divToolTip.html(d3.format(".3n")(d.college*100) + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgCollege.insert("g",":first-child")
            .attr("class", "axis")
            .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")");

        // append lines
        barCollege.append("line")
            .attr("class", "line")
            .attr("x0", -10)
            .attr("x1", width + labelWidth)
            .attr("y1", -10).attr("y2", -10);

        /** Column 5: recreate bars **/

        barUnemployed = svgUnemployed.selectAll("g")
            .data(dataFilter)
            .enter()
            .append("g");

        barUnemployed.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(" + 0 + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        // create rectangles for bars
        barUnemployed.append("rect")
            .attr("transform", "translate("+(labelWidth)+", 0)")
            .attr("height", barHeight)
            .attr("width", function(d){
                return scaleUnemployed(d.unemploymentRate);
            })
            .attr("fill", "#c0392b")
            .on("mouseover", function(d) {
                divToolTip.transition()
                    .duration(200)
                    .style("opacity", .9);
                divToolTip.html(d3.format(".3n")(d.unemploymentRate*100) + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // text for label overlapping the bar
        barUnemployed.append("text")
            .attr("class", "value")
            .attr("y", barHeight / 2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .attr("fill", "#c0392b")
            .text(function(d){
                return d3.format(".3n")(d.unemploymentRate*100) + "%";
            })
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin, (scaleUnemployed(d.unemploymentRate)+width+(valueMargin*2)));
            });

        svgUnemployed.insert("g",":first-child")
            .attr("class", "axis")
            .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")");

        // append lines
        barUnemployed.append("line")
            .attr("class", "line")
            .attr("x0", -10)
            .attr("x1", width/1.5)
            .attr("y1", -10).attr("y2", -10);

    }

    /** function to sort each column by ascending values **/
    function sortAscending(dataSort, num) {
        console.log("selected value: " + selectedOption);
        console.log("sort ascending button selected");
        let sortedData;

        // sort ascending % women column
        if (num == 1) {
            sortedData = dataSort.sort(function(a, b) {
                return a.women - b.women;
            });
        } else if (num == 2) {
            // sort ascending Median Income column
            sortedData = dataSort.sort(function(a, b) {
                return a.median - b.median;
            });
        } else if (num == 3) {
            // sort ascending % Employed Full-time column
            sortedData = dataSort.sort(function(a, b) {
                return a.fulltime - b.fulltime;
            });
        } else if (num == 4) {
            // sort ascending % with Jobs Requiring a Degree column
            sortedData = dataSort.sort(function(a, b) {
                return a.college - b.college;
            });
        } else {
            // sort ascending Unemployment Rate column
            sortedData = dataSort.sort(function(a, b) {
                return a.unemploymentRate - b.unemploymentRate;
            });
        }

        redrawBars(sortedData);
        // console.log(sortedData);
    }

    /** Sorts each column by descending values **/
    function sortDescending(dataSort, num) {
        let sortedData;

        if (num == 1) {
            sortedData = dataSort.sort(function(a, b) {
                return b.women - a.women;
            });
        } else if (num == 2) {
            // sort ascending Median Income column
            sortedData = dataSort.sort(function(a, b) {
                return b.median - a.median;
            });
        } else if (num == 3) {
            // sort ascending % Employed Full-time column
            sortedData = dataSort.sort(function(a, b) {
                return b.fulltime - a.fulltime;
            });
        } else if (num == 4) {
            // sort ascending % with Jobs Requiring a Degree column
            sortedData = dataSort.sort(function(a, b) {
                return b.college - a.college;
            });
        } else {
            // sort ascending Unemployment Rate column
            sortedData = dataSort.sort(function(a, b) {
                return b.unemploymentRate - a.unemploymentRate;
            });
        }

        redrawBars(sortedData);
    }

    /** Button clicks for ascending columns **/
    d3.select("#sortAscendingWomen")
        .on("click", function() {
            console.log("selected value: " + selectedOption);
            console.log("sort ascending button selected");

            let dataOption = identifyFilter(selectedOption);

            // console.log("data returned: " + dataOption);

            sortNum = 1;
            isDescending = false;
            sortAscending(dataOption, sortNum);
        });

    d3.select("#sortAscendingMedian")
        .on("click", function() {
            let dataOption = identifyFilter(selectedOption);
            sortNum = 2;
            isDescending = false;
            sortAscending(dataOption, sortNum);
        });

    d3.select("#sortAscendingFt")
        .on("click", function() {
            let dataOption = identifyFilter(selectedOption);
            sortNum = 3;
            isDescending = false;
            sortAscending(dataOption, sortNum);
        });

    d3.select("#sortAscendingDegree")
        .on("click", function() {
            let dataOption = identifyFilter(selectedOption);
            sortNum = 4;
            isDescending = false;
            sortAscending(dataOption, sortNum);
        });

    d3.select("#sortAscendingUnemp")
        .on("click", function() {
            let dataOption = identifyFilter(selectedOption);
            sortNum = 5;
            isDescending = false;
            sortAscending(dataOption, sortNum);
        });

    /** Button click for descending columns **/
    d3.select("#sortDescendingWomen")
        .on("click", function() {
            let dataOption = identifyFilter(selectedOption);
            sortNum = 1;
            isDescending = true;
            sortDescending(dataOption, sortNum);
        });

    d3.select("#sortDescendingMedian")
        .on("click", function() {
            let dataOption = identifyFilter(selectedOption);
            sortNum = 2;
            isDescending = true;
            sortDescending(dataOption, sortNum);
        });

    d3.select("#sortDescendingFt")
        .on("click", function() {
            let dataOption = identifyFilter(selectedOption);
            sortNum = 3;
            isDescending = true;
            sortDescending(dataOption, sortNum);
        });

    d3.select("#sortDescendingDegree")
        .on("click", function() {
            let dataOption = identifyFilter(selectedOption);
            sortNum = 4;
            isDescending = true;
            sortDescending(dataOption, sortNum);
        });

    d3.select("#sortDescendingUnemp")
        .on("click", function() {
            let dataOption = identifyFilter(selectedOption);
            sortNum = 5;
            isDescending = true;
            sortDescending(dataOption, sortNum);
        });

}

function initializeData() {
    // parse and render csv
    d3.csv("recent-grads-cleaned.csv")
        .then(data => {
            data.forEach(d => {
                d.major = d.major
                d.women = +d.women;
                d.median = +d.median;
                d.fulltime = +d.fulltime;
                d.college = +d.college;
                d.unemploymentRate = +d.unemploymentRate;
                d.majorCategory = d.majorCategory;
            });
            // console.log(data);
            render(data);
        })
}

initializeData();