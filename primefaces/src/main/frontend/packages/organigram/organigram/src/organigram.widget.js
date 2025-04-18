/**
 * __PrimeFaces Organigram Widget__
 * 
 * Organigram is a data component to display an organizational hierarchy.
 * 
 * @implements {PrimeFaces.widget.ContextMenu.ContextMenuProvider<PrimeFaces.widget.Organigram>}
 * 
 * @prop {boolean} redraw Whether the organigram requires redrawing.
 * @prop {JQuery} source The DOM elements for the source nodes when drawing the lines connecting two nodes.
 * @prop {JQuery} target The DOM elements for the target nodes when drawing the lines connecting two nodes.
 * @prop {number} zoomFactor The current zoom factor of the organigram.
 * 
 * @interface {PrimeFaces.widget.OrganigramCfg} cfg The configuration for the {@link  Organigram| Organigram widget}.
 * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this
 * configuration is usually meant to be read-only and should not be modified.
 * @extends {PrimeFaces.widget.BaseWidgetCfg} cfg
 * 
 * @prop {string} cfg.event Base namespace for the events triggered by this widget.
 * @prop {number} cfg.leafNodeConnectorHeight The height of the connector line for leaf nodes.
 * @prop {boolean} cfg.zoom Whether zooming is enabled.
 */
PrimeFaces.widget.Organigram = class Organigram extends PrimeFaces.widget.BaseWidget {

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
     */
    init(cfg) {
        super.init(cfg);

        this.draw();
    }

    /**
     * Draws (renders) the organigram with the current nodes.
     * @private
     */
    draw() {
        this.source = this.jq.children('ul');
        this.target = this.jq.children('div');
        this.target.empty();

        this.drawNode(this.source.find('li:first').data("rowkey"), this.source.find('li:first'), this.target, 0, 0);

        this.setupSelection();
        this.setupDragAndDrop();
        this.setupControls();
    }

    /**
     * Sets up the event listeners for when a node is selected.
     * @private
     */
    setupSelection() {
        var widget = this;

        var selectableNodes = this.target.find(".ui-organigram-node.selectable");
        selectableNodes.on("click", function() {
            widget.selectNode(widget, $(this), "select");
        });

        if (this.cfg.autoScrollToSelection === true) {
            this.scrollToSelection();
        }
    }

    /**
     * Selects the given organigram node.
     * @private
     * @param {PrimeFaces.widget.Organigram} widget This widget instance.
     * @param {JQuery} node The node to select, with the class `.ui-organigram-node`.
     * @param {string} event Name of the event that triggered the selection, usually `select` or `contextmenu`.
     */
    selectNode(widget, node, event) {
        if (!node.hasClass("selected")) {
            widget.target.find(".ui-organigram-node.selected").removeClass("selected");
            node.addClass("selected");

            if (widget.hasBehavior(event)) {
                var options = {
                    params: [
                                { name: widget.id + "_selectNode", value: node.data("rowkey") }
                            ]
                };
                widget.cfg.behaviors[event].call(widget, options);
            }
        }
    }

    /**
     * Sets up the event listeners for dragging and dropping nodes.
     * @private
     */
    setupDragAndDrop() {
        var widget = this;

        var nodes = this.target.find(".ui-organigram-node");
        var draggableNodes = nodes.filter(".draggable");
        var droppableNodes = nodes.filter(".droppable");

        var initialDragPosition = {
            x: 0,
            y: 0
        };
        draggableNodes.draggable({
            zIndex: 100,
            opacity: 0.7,
            cursor: "move",
            helper: "clone",
            distance: 60,
            revert: "invalid",
            revertDuration: 200,
            snapMode: "inner",
            // overwrite start/drag to support browser scaling/zooming
            start: function(event) {
                initialDragPosition.x = event.clientX;
                initialDragPosition.y = event.clientY;
            },
            drag: function(event, ui) {
                var original = ui.originalPosition;
                var zoomFactor = widget.zoomFactor || 1.0;
                ui.position = {
                    left: (event.clientX - initialDragPosition.x + original.left) / zoomFactor,
                    top:  (event.clientY - initialDragPosition.y + original.top ) / zoomFactor
                };
            }
        });

        droppableNodes.droppable({
            accept: ".ui-organigram-node.draggable",
            tolerance: "pointer",
            activeClass: "drag-active",
            hoverClass: "drop-hover",
            zoomFactor: function() {return widget.zoomFactor || 1.0}
        });

        // drop & drop happens in the target dom
        // but moving the actual nodes happens in the source li/ul dom
        // after dropping, we redraw the organigram from the source
        droppableNodes.on("drop", function (event, ui) {

            // lookup target node in source DOM
            var targetId = $(this).data("rowkey");
            var targetLi = widget.source.find("li").filter(function () {
                return $(this).data("rowkey") === targetId;
            });
            var targetUl = targetLi.children("ul");

            // lookup source node in source DOM
            var sourceId = ui.draggable.data("rowkey");
            var sourceLi = widget.source.find("li").filter(function () {
                return $(this).data("rowkey") === sourceId;
            });
            var sourceUl = sourceLi.parent("ul");

            // ignore the current drop?
            var ignore = false;

            // ignore moving to the current parent
            if (sourceLi.data("parent-rowkey") === targetId)
            {
                ignore = true;
            }

            // ignore moving to the direct child
            if (targetLi.data("parent-rowkey") === sourceId)
            {
                ignore = true;
            }

            // ignore moving to childs
            targetLi.parents().each(function() {
                if ($(this).data("parent-rowkey") === sourceId) {
                    ignore = true;
                    return false;
                }
            });

            if (ignore) {
                return false;
            }

            // add new children
            if (targetUl.length > 0) {
                targetUl.append(sourceLi);
            }
            else {
                targetLi.append("<ul></ul>");
                targetLi.children("ul").append(sourceLi);
            }

            // remove children if empty
            if (sourceUl.children().length === 0) {
                sourceUl.remove();
            }

            // add "leaf" class if the last item was removed from the parent
            var oldParent = widget.source.find("li").filter(function () {
                return $(this).data("rowkey") === sourceLi.data("parent-rowkey");
            });
            if (oldParent.children("ul").length === 0) {
                oldParent.addClass("leaf");
            }

            // remove leave class if a node was added to a leaf node
            targetLi.removeClass("leaf");

            // update parent
            sourceLi.data("parent-rowkey", targetId);
            sourceLi.attr("data-parent-rowkey", targetId);

            // call behavior
            if (widget.hasBehavior("dragdrop")) {
                var options = {
                    params: [
                                { name: widget.id + "_dragNode", value: sourceId },
                                { name: widget.id + "_dropNode", value: targetId }
                            ]
                };
                widget.cfg.behaviors["dragdrop"].call(widget, options);
            }

            widget.redraw = true;
        });

        // redraw from source after drop
        draggableNodes.on("dragstop", function (event, ui) {
            // redraw only if the item was dropped successfully
            if (widget.redraw) {
                widget.draw();

                widget.redraw = false;
            }
        });
    }

    /**
     * Sets up the buttons for the global controls, such as the buttons for zooming in and out.
     * @private
     */
    setupControls() {
        var widget = this;

        if (this.cfg.zoom) {

            this.jq.children(".controls").remove();

            var controls = $("<div class='controls'></div>").appendTo(this.jq);
            var controlsTable = $("<table></table>").appendTo(controls);

            if (!this.zoomFactor) {
                this.zoomFactor = 1.0;
            }
            else {
                this.zoom(this.zoomFactor);
            }

            var zoomIn = $("<tr><td><div class='control zoom-in' title='Zoom In'>&nbsp;</div></td></tr>").appendTo(controlsTable);
            zoomIn.on("click", function() {
                widget.zoomFactor += 0.1;
                widget.zoom(widget.zoomFactor);
            });

            var zoomOut = $("<tr><td><div class='control zoom-out' title='Zoom Out'>&nbsp;</div></td></tr>").appendTo(controlsTable);
            zoomOut.on("click", function() {
                widget.zoomFactor -= 0.1;
                widget.zoom(widget.zoomFactor);
            });
        }
    }

    /**
     * Applies the given zoom factor (scaling) to the organigram.
     *
     * @param {number} zoom The zoom factor. Must be a positive number. `1.0` means no zoom, `2.0` means zoomed-in,
     * `0.5` means zoomed-out.
     */
    zoom(zoom) {
        var element = this.target.find(">:first-child");
        element.css("-moz-transform", "scale(" + zoom + ")");
        element.css("-moz-transform-origin", "0 0");
        element.css("-o-transform", "scale(" + zoom + ")");
        element.css("-o-transform-origin", "0 0");
        element.css("-webkit-transform", "scale(" + zoom + ")");
        element.css("-webkit-transform-origin", "0 0");
        element.css("transform", "scale(" + zoom + ")");
        element.css("transform-origin", "0 0");
    }

    /**
     * Draws the given organigram node.
     * @private
     * @param {string} parentRowKey Row key of the node to draw.
     * @param {JQuery} nodeSource Element of the node to draw.
     * @param {JQuery} appendTo Element to which the node is appended.
     * @param {number} level Nesting level of the node.
     */
    drawNode(parentRowKey, nodeSource, appendTo, level) {

        var childNodes = nodeSource.children("ul:first").children("li");
        var isLastLevel = childNodes.length === 0;

        // clone node content - ignore subnodes
        var nodeContent = nodeSource.clone()
                .children("ul,li")
                .remove()
                .end()
                .html();

        var node = $("<div>");

        // copy class and style from source
        node.attr("class", nodeSource.attr("class"));
        node.attr("style", nodeSource.attr("style"));

        // styling
        node.addClass("ui-organigram-node");
        node.addClass("level-" + level);

        // set metadata
        node.attr("data-level", level);
        node.attr("data-rowkey", nodeSource.data("rowkey"));
        node.attr("data-parent-rowkey", parentRowKey);

        // top icons
        var topIconContainer = $("<div class='ui-organigram-icon-container'></div>").appendTo(node);
        if (nodeSource.data("icon")) {
            var icon = $("<div class='ui-organigram-icon ui-icon'></div>").appendTo(topIconContainer);
            icon.addClass(nodeSource.data("icon"));

            var iconPos = nodeSource.data("icon-pos");
            if (iconPos && (iconPos === "left" || iconPos === "right")) {
                icon.addClass(nodeSource.data("icon-pos"));
            }
        }

        // content
        node.append(nodeContent);

        // bottom icons
        var bottomIconContainer = $("<div class='ui-organigram-icon-container'></div>").appendTo(node);

        // we don't need to render a table in the last level as it can't have further childs
        if (isLastLevel) {
            appendTo.append(node);
        }
        else if (childNodes.length > 0) {
            var table = $("<table cellpadding='0' cellspacing='0' border='0'></table>").appendTo(appendTo);
            var row = $("<tr></tr>").appendTo(table);

            var leafChildNodes = childNodes.filter(".leaf:not(.skip-leaf)");
            var nonLeafChildNodes = childNodes.filter(":not(.leaf),.skip-leaf");
            var childNodeCount = nonLeafChildNodes.length;
            if (leafChildNodes && leafChildNodes.length > 0) {
                childNodeCount += 1;
            }

            var cell = $("<td colspan='" + (childNodeCount * 2) + "'></td>").appendTo(row);
            cell.append(node);

            this.addExpander(nodeSource, node, bottomIconContainer);
            this.drawLines(childNodeCount, table);
            this.drawChildNodes(nodeSource.data("rowkey"), leafChildNodes, nonLeafChildNodes, table, level);

            // handle initial collapsed state
            if (nodeSource.hasClass("collapsed")) {
                var collapsedIcon = "ui-icon-plusthick";
                if (nodeSource.data("collapsed-icon")) {
                    collapsedIcon = nodeSource.data("collapsed-icon");
                }
                var expandedIcon = "ui-icon-minusthick";
                if (nodeSource.data("expanded-icon")) {
                    expandedIcon = nodeSource.data("expanded-icon");
                }

                // hide childs
                row.nextAll("tr").hide();

                // switch expander icons
                node.find(".expander").removeClass(expandedIcon).addClass(collapsedIcon);
            }
            else {
                if (!nodeSource.hasClass("expanded")) {
                    node.addClass("expanded");
                }
            }
        }
    }

    /**
     * Adds an expander button for expanding or collapsing the given node.
     * @private
     * @param {JQuery} nodeSource Node to use as a source.
     * @param {JQuery} node Node to collapse and expand.
     * @param {JQuery} bottomIconContainer Container element to which the expander button is added.
     */
    addExpander(nodeSource, node, bottomIconContainer) {

        if (node.hasClass("collapsible")) {

            var collapsedIcon = nodeSource.data("collapsed-icon") ? nodeSource.data("collapsed-icon") : "ui-icon-plusthick";
            var expandedIcon = nodeSource.data("expanded-icon") ? nodeSource.data("expanded-icon") : "ui-icon-minusthick";
            var initialIcon = node.hasClass("collapsed") ? collapsedIcon : expandedIcon;

            var widget = this;
            var expander = $("<div class='expander ui-icon " + initialIcon + "'>&nbsp;</div>").appendTo(bottomIconContainer);

            expander.on("click", function (e) {
                // reinit dom references - they are lost sometimes
                var expander = $(this);
                var node = expander.closest(".ui-organigram-node");
                var row = node.closest("tr");

                if (node.hasClass("collapsed")) {
                    node.removeClass("collapsed").addClass("expanded");
                    expander.removeClass(collapsedIcon).addClass(expandedIcon);

                    row.nextAll("tr").show();

                    // maintain state in source
                    nodeSource.removeClass("collapsed");

                    // call behavior
                    if (widget.hasBehavior("expand")) {
                        var options = {
                            params: [
                                        { name: widget.id + "_expandNode", value: node.data("rowkey") }
                                    ]
                        };
                        widget.cfg.behaviors["expand"].call(widget, options);
                    }
                }
                else {
                    node.removeClass("expanded").addClass("collapsed");
                    expander.removeClass(expandedIcon).addClass(collapsedIcon);

                    row.nextAll("tr").hide();

                    // maintain state in source
                    nodeSource.addClass("collapsed");

                    // call behavior
                    if (widget.hasBehavior("collapse")) {
                        var options = {
                            params: [
                                        { name: widget.id + '_collapseNode', value: node.data("rowkey") }
                                    ]
                        };
                        widget.cfg.behaviors["collapse"].call(widget, options);
                    }
                }

                // avoid bubbling to the parent select click handler
                e.stopPropagation();
            });
        }
    }

    /**
     * Draws the lines connecting the nodes.
     * @private
     * @param {number} childNodeCount Number of children in the sub table.
     * @param {JQuery} table The DOM element for the sub table for which to draw the children.
     */
    drawLines(childNodeCount, table) {

        // draw vertical row
        var verticalColspan = childNodeCount * 2;
        var verticalRow = $("<tr></tr>").appendTo(table);
        var verticalCell = $("<td colspan='" + verticalColspan + "'></td>").appendTo(verticalRow);
        verticalCell.append($("<div class='line down'></div>"));


        // draw horizontal row/cells
        var horizontalRow = $("<tr></tr>").appendTo(table);
        for (var i = 0; i < childNodeCount; i++) {
            horizontalRow.append($("<td class='line left top'></td>"));
            horizontalRow.append($("<td class='line right top'></td>"));
        }

        // remove the line from the first and last cell
        horizontalRow.find("td:first").removeClass("top");
        horizontalRow.find("td:last").removeClass("top");
    }

    /**
     * Draws the child nodes of the given parent node.
     * @private
     * @param {string} parentRowKey Row key of the parent node with children to draw.
     * @param {JQuery} leafChildNodes  Children of the parent that are leaf nodes, i.e. do no have any children.
     * @param {JQuery} nonLeafChildNodes Children of the parent that are not leaf nodes, i.e. do have at least one
     * child.
     * @param {JQuery} table The DOM element for the sub table for which to draw the children.
     * @param {number} level The nesting level of the parent node.
     */
    drawChildNodes(parentRowKey, leafChildNodes, nonLeafChildNodes, table, level) {
        var row = $("<tr></tr>").appendTo(table);

        // draw leaf nodes in a different way
        if (leafChildNodes && leafChildNodes.length > 0) {
            var cell = $("<td colspan='2'></td>").appendTo(row);

            var leafTable = $("<table cellpadding='0' cellspacing='0' border='0'></table>").appendTo(cell);

            for (var j = 0; j < leafChildNodes.length; j++) {
                // add connector line
                if (j !== 0 && this.cfg.leafNodeConnectorHeight > 0) {
                    leafTable.append($("<tr><td><div class='line down' style='height:" + this.cfg.leafNodeConnectorHeight + "px'></div></td></tr>"));
                }

                var leafRow = $("<tr></tr>").appendTo(leafTable);
                var leafCell = $("<td></td>").appendTo(leafRow);

                var childNode = $(leafChildNodes[j]);
                this.drawNode(parentRowKey, childNode, leafCell, level + 1);
            }
        }

        // draw normal nodes
        for (var i = 0; i < nonLeafChildNodes.length; i++) {
            var cell = $("<td colspan='2'></td>").appendTo(row);

            var childNode = $(nonLeafChildNodes[i]);
            this.drawNode(parentRowKey, childNode, cell, level + 1);
        }
    }

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.widget.ContextMenu} menuWidget
     * @param {PrimeFaces.widget.Organigram} targetWidget
     * @param {string} targetId
     * @param {PrimeFaces.widget.ContextMenuCfg} cfg
     */
    bindContextMenu(menuWidget, targetWidget, targetId, cfg) {
        var selector = targetId + " .ui-organigram-node.selectable",
        event = cfg.event + ".organigram" + this.id;

        if (cfg.nodeType) {
            selector += "." + cfg.nodeType;
        }

        $(document).off(event, selector).on(event, selector, null, function(e) {
            targetWidget.selectNode(targetWidget, $(this), "contextmenu");
            menuWidget.show(e);
        });
        this.addDestroyListener(function() {
            $(document).off(event);
        });
    }

    /**
     * Scrolls the organigram to the currently selected node, so that the node is in view.
     */
    scrollToSelection() {
        var selection = this.target.find(".ui-organigram-node.selected");
        if (selection.length > 0) {
            var offset = selection.offset();
            this.target.animate({
                scrollTop: offset.top ,
                scrollLeft: offset.left
            },{
                easing: 'easeInCirc'
            },1000);
        }
    }
}