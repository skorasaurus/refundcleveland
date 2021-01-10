(function() {
    let data = sort_budget_data(retrieve_budget_data());
    console.log(data);
    
    const MULTIPLIER = 2,  // add height to bars
        SHIFT = 2,  // bar height when data is 0
        margin = {top: 0, right: 0, bottom: 0, left: 0},
        height = 200 - margin.top - margin.bottom + SHIFT;

    // Select container div
    let container_div = d3.select("#budget_visualization");

    // Select all .bar_wrap divs
    let bar_divs = container_div.append("div").attr("class", "bars").selectAll("svg")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "bar_wrap");

    // Add SVG element to each .bar_wrap div
    let svgs = d3.selectAll(bar_divs).append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", "100%")
        .attr("y", 0);

    // Add bars to SVG
    let bars = svgs.append("rect")
        .attr("class", "bar")
        .attr("width", "100%")
        .attr("height", d => (100 * MULTIPLIER) + SHIFT)
        .attr("y", d => height - (100 * MULTIPLIER) - SHIFT)
        .attr("x", 0)
        // .attr("fill", (d, i) => colors[30 + (i * 15) % colors.length])
        .attr("fill", "#000");

    // Animate in bars on load
    bars.transition()
        .attr("height", d => (d.percentage * MULTIPLIER) + SHIFT)
        .attr("y", d => height - (d.percentage * MULTIPLIER) - SHIFT)
        //.delay((d, i) => 200 + i * 100)
        .delay((d, i) => 200)
        .duration(1500)
        .ease(d3.easeCubicOut);

    // Add text elements to SVG to display bar totals
    let bar_totals = svgs.append("text").style("opacity", 0);

    // Animate in bar totals on load
    bar_totals.html(d => d.percentage + "%")
        .transition()
        .attr("y", d => height - (d.percentage * MULTIPLIER) - SHIFT - 10)
        .style("opacity", 1)
        .delay((d, i) => 200)
        .duration(1500)
        .ease(d3.easeCubicOut);

    // Add placeholder programs below each bar
    bar_divs.append("div")
        .html( function(d) {
            content = "";
            content += `<p>${d.name}</p>`;

            // Add real programs if they exist in the data set
            if (d.children) {
                content += "<ul>";
                d.children.forEach(function(subdept, index) {
                    content += `<li>${subdept.name}</li>`;

                })
                content += "</ul>";
            }
            // otherwise add placeholders
            else {
                content += `<ul><li>Add sub-depts to JSON</li></ul>`;
            }
            return content;
        })
        .attr("y", height + margin.bottom);

    container_div.append("button")
        .html("<a href=\"/change-the-budget\">Change the budget &#8594;</a>" );

})();

