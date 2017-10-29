/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */
 
var width = document.body.clientWidth;
var height = 700;
var margin = 12;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// filters go in defs element
var defs = svg.append("defs");

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
        
svg.append("rect")
    .attr("width", width/2-margin*2)
    .attr("height", height-margin)
    .attr("x", margin)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", "#fee")
    .style("filter", "url(#drop-shadow)"); 

svg.append("rect")
    .attr("width", width/2-margin*2)
    .attr("height", height-margin)
    .attr("x", width/2+margin)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", "#fff")
    .style("filter", "url(#drop-shadow)"); 


