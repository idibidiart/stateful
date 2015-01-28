var chartWidget = function(extent) {
    "use strict";
    // default settings
    var margin = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    var padding = {
        top: 30,
        bottom: 10,
        left: 40,
        right: 40
    }

    var width = 960;
    var height = 300;
    var contextHeight = 40;
    var areaSpace = 60;

    function widget(selection) {
        selection.each(function(data) {
            var availableWidth = width - padding.left - padding.right;
            var availableHeight = height - padding.top - padding.bottom;

            var container = d3.select(this);
            var svg = container.append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            var x = d3.time.scale().range([0, availableWidth]);
            var x2 = d3.time.scale().range([0, availableWidth]);
            var y = d3.scale.linear().range([availableHeight - contextHeight - areaSpace, 0]);
            var y2 = d3.scale.linear().range([contextHeight, 0]);

            var xAxis = d3.svg.axis().scale(x).orient('bottom');
            var xAxis2 = d3.svg.axis().scale(x2).orient('bottom');
            var yAxis = d3.svg.axis().scale(y).orient('left');
            var yAxis2 = d3.svg.axis().scale(y).orient('right');

            var brush = d3.svg.brush()
                .x(x2)
                .on('brush', brushed);

            var line =d3.svg.line()
                .interpolate('monotone')
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return y(d[1]); });

            var line2 = d3.svg.line()
                .interpolate('monotone')
                .x(function(d) { return x2(d[0]); })
                .y(function(d) { return y2(d[1]); });

            svg.append('defs').append('clipPath')
                .attr('id', 'clip')
                .append('rect')
                .attr('width', availableWidth)
                .attr('height', height - contextHeight - areaSpace);

            var wrap = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var focus = wrap.append('g')
                .attr('class', 'focus')
                .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')');

            var context = wrap.append('g')
                .attr('class', 'context')
                .attr('transform', 'translate(' + padding.left + ',' + (availableHeight - contextHeight) + ')');

            var xDomain = data.map(function(d) { return d[0]; });
            var yMax = d3.max(data.map(function(d) { return d[1]; } ));

            x.domain(d3.extent(xDomain));
            y.domain([0, yMax]);
            x2.domain(x.domain());
            y2.domain(y.domain());

            focus.append('path')
                .datum(data)
                .attr('class', 'line')
                .attr('d', line);

            focus.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + (availableHeight - contextHeight - areaSpace) + ')')
                .call(xAxis);

            focus.append('g')
                .attr('class', 'y axis')
                .call(yAxis);

            focus.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + availableWidth + ',0)')
                .call(yAxis2);

            context.append('path')
                .datum(data)
                .attr('class', 'line')
                .attr('d', line2);

            context.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + contextHeight + ')')
                .call(xAxis2);

            context.append('g')
                .attr('class', 'x brush')
                .call(brush)
                .selectAll('rect')
                .attr('y', -6)
                .attr('height', contextHeight + 7); 
            
            brush.extent(extent)
            context.select('.brush').call(brush);
            brushed();
            
            function brushed() { 
                x.domain(brush.extent());
                focus.select('.line').attr('d', line);
                focus.select('.x.axis').call(xAxis);

                // save brush extent to state object
                var comp = Stateful.getComponent(selection.node())
                comp.state(selection.node()).byReference().extent = brush.extent().map(function(v){ return +new Date(v)})
            }
        });

        return widget;
    }

    // Expose Public Variables

    widget.margin = function(arg) {
        if (!arguments.length) return margin;
        margin.top = typeof arg.top !== 'undefined' ? arg.top : margin.top;
        margin.right = typeof arg.right !== 'undefined' ? arg.right : margin.right;
        margin.left = typeof arg.left !== 'undefined' ? arg.left : margin.left;
        margin.bottom = typeof arg.bottom !== 'undefined' ? arg.bottom : margin.bottom;
        return widget;
    };

    widget.padding = function(arg) {
        if (!arguments.length) return padding;
        padding.top = typeof arg.top !== 'undefined' ? arg.top : padding.top;
        padding.right = typeof arg.right !== 'undefined' ? arg.right : padding.right;
        padding.left = typeof arg.left !== 'undefined' ? arg.left : padding.left;
        padding.bottom = typeof arg.bottom !== 'undefined' ? arg.bottom : padding.bottom;
        return widget;
    };
    
    widget.width = function(arg) {
        if (!arguments.length) return width;
        width = arg;
        return widget;
    };
    
    widget.height = function(arg) {
        if (!arguments.length) return height;
        height = arg;
        return widget;
    };
    
    widget.contextHeight = function(arg) {
        if (!arguments.length) return contextHeight;
        contextHeight = arg;
        return widget;
    };
    
    widget.areaSpace = function(arg) {
        if (!arguments.length) return areaSpace;
        areaSpace = arg;
        return widget;
    };
    return widget;
};

