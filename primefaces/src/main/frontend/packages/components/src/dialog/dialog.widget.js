/**
 * __PrimeFaces Dialog Widget__
 * 
 * Dialog is a panel component that is displayed as an overlay on top of other elements on the current page. Optionally,
 * the dialog may be modal and block the user from interacting with elements below the dialog.
 *
 * @typedef PrimeFaces.widget.Dialog.OnHideCallback Client-side callback to invoke when the dialog is closed, see
 * {@link DialogCfg.onHide}.
 * @this {PrimeFaces.widget.Dialog} PrimeFaces.widget.Dialog.OnHideCallback
 * 
 * @typedef PrimeFaces.widget.Dialog.OnShowCallback Client-side callback to invoke when the dialog is opened, see
 * {@link DialogCfg.onShow}
 * @this {PrimeFaces.widget.Dialog} PrimeFaces.widget.Dialog.OnShowCallback
 * 
 * @interface {PrimeFaces.widget.Dialog.ClientState} ClientState The client-side state of the dialog such as its width
 * and height. The client-side state can be preserved during AJAX updates by sending it to the server.
 * @prop {number} ClientState.contentHeight The total height in pixels of the content area of the dialog.
 * @prop {number} ClientState.contentWidth The total width in pixels of the content area of the dialog..
 * @prop {number} ClientState.height The total height of the dialog in pixels, including the header and its content.
 * @prop {JQuery.Coordinates} [ClientState.offset] Vertical and horizontal offset of the top-left corner of the dialog.
 * @prop {number} ClientState.width The total width of the dialog in pixels, including the header and its content.
 * @prop {number} ClientState.windowScrollLeft Horizontal scroll position of the window.
 * @prop {number} ClientState.windowScrollTop Vertical scroll position of the window.
 * 
 * @prop {JQuery} closeIcon DOM element of the icon for closing this dialog, when this dialog is closable (an `x` by
 * default).
 * @prop {JQuery} content DOM element of the container for the content of this dialog.
 * @prop {JQuery} [iframeFix] The DOM element of the overlay that is put over iframes during a resize.
 * @prop {JQuery} footer DOM element of the container with the footer of this dialog.
 * @prop {JQuery} icons DOM elements of the title bar icons of this dialog.
 * @prop {HTMLElement} jqEl The native DOM element instance of the container element of this widget (same element as the
 * `jq` property).
 * @prop {number} [lastScrollTop] The last known vertical scrolling position.
 * @prop {boolean} [loaded] Whether the dialog content was already loaded (when dynamic loading via AJAX is
 * enabled.)
 * @prop {boolean} [maximized] Whether the dialog is currently maximized.
 * @prop {JQuery} maximizeIcon DOM element of the icon for maximizing this dialog, when this dialog can be maximized.
 * @prop {boolean} [minimized] Whether the dialog is currently minimized.
 * @prop {JQuery} minimizeIcon DOM element of the icon for minimizing this dialog, when this dialog can be minimized.
 * @prop {JQuery} minimizeClone DOM element clone of the JQ to be used for minimizing.
 * @prop {JQuery} parent The DOM element of the parent that contains this dialog, i.e the element to which the dialog
 * was appended.
 * @prop {boolean} positionInitialized Whether the position of the dialog was already set. If not, it must be set the
 * next time the dialog is shown.
 * @prop {JQuery} [resizers] The DOM element of the resize icons for resizing the dialog, if resizing is
 * enabled.
 * @prop {PrimeFaces.widget.Dialog.ClientState} [state] The client-side state of the dialog such as its width
 * and height. The client-side state can be preserved during AJAX updates by sending it to the server.
 * @prop {JQuery} titlebar DOM element of the title bar container of this dialog.
 * @prop {HTMLElement} focusedElementBeforeDialogOpened Element that was focused before the dialog was opened.
 * 
 * @interface {PrimeFaces.widget.DialogCfg} cfg The configuration for the {@link  Dialog| Dialog widget}.
 * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this
 * configuration is usually meant to be read-only and should not be modified.
 * @extends {PrimeFaces.widget.DynamicOverlayWidgetCfg} cfg
 * @prop {string} cfg.appendTo A search expression for the element to which the dialog is appended. Defaults to the
 * body.
 * @prop {boolean} cfg.absolutePositioned Whether the dialog is positioned absolutely.
 * @prop {boolean} cfg.blockScroll Whether to prevent the document from scrolling when the dialog is visible.
 * @prop {boolean} cfg.cache Only relevant for dynamic="true": Defines if activating the dialog should load the contents from server again. For cache="true" (default) the dialog content is only loaded once.
 * @prop {boolean} cfg.closeOnEscape Whether the dialog is closed when the user presses the escape button.
 * @prop {boolean} cfg.closable Whether the dialog can be closed by the user.
 * @prop {boolean} cfg.draggable Whether the dialog is draggable.
 * @prop {boolean} cfg.dynamic Whether lazy loading of the content via AJAX is enabled.
 * @prop {boolean} cfg.fitViewport Dialog size might exceed the viewport if the content is taller than viewport in terms
 * of height. When this is set to `true`, automatically adjust the height to fit the dialog within the viewport.
 * @prop {number} cfg.height The height of the dialog in pixels.
 * @prop {string} cfg.hideEffect Effect to use when hiding the dialog.
 * @prop {string} cfg.iframeStyleClass One or more CSS classes for the iframe within the dialog.
 * @prop {string} cfg.iframeTitle The title of the iframe with the dialog.
 * @prop {boolean} cfg.maximizable Whether the dialog is maximizable.
 * @prop {number} cfg.minHeight The minimum height of the dialog in pixels.
 * @prop {boolean} cfg.minimizable Whether the dialog is minimizable.
 * @prop {number} cfg.minWidth The minimum width of the dialog in pixels.
 * @prop {boolean} cfg.modal Whether the dialog is modal and blocks the main content and other dialogs.
 * @prop {string} cfg.my Position of the dialog relative to the target.
 * @prop {PrimeFaces.widget.Dialog.OnHideCallback} cfg.onHide Client-side callback to invoke when the dialog is
 * closed.
 * @prop {PrimeFaces.widget.Dialog.OnShowCallback} cfg.onShow Client-side callback to invoke when the dialog is opened.
 * @prop {string} cfg.position Defines where the dialog should be displayed
 * @prop {boolean} cfg.resizable Whether the dialog can be resized by the user.
 * @prop {boolean} cfg.resizeObserver Use ResizeObserver to automatically adjust dialog-height after e.g. AJAX-updates. Resizeable must be set to false to use this option. (Known limitation: Dialog does not automatically resize yet when resizing the browser-window.)
 * @prop {boolean} cfg.resizeObserverCenter Can be used together with resizeObserver = true. Centers the dialog again after it was resized to ensure the whole dialog is visible onscreen.
 * @prop {boolean} cfg.responsive Whether the dialog is responsive. In responsive mode, the dialog adjusts itself based
 * on the screen width.
 * @prop {string} cfg.showEffect Effect to use when showing the dialog
 * @prop {string} cfg.styleClass One or more CSS classes for the dialog.
 * @prop {number} cfg.width The width of the dialog in pixels.
 */
PrimeFaces.widget.Dialog = class Dialog extends PrimeFaces.widget.DynamicOverlayWidget {

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
     */
    init(cfg) {
        super.init(cfg);

        this.content = this.jq.children('.ui-dialog-content');
        this.titlebar = this.jq.children('.ui-dialog-titlebar');
        this.footer = this.jq.find('.ui-dialog-footer');
        this.icons = this.titlebar.children('.ui-dialog-titlebar-icon');
        this.closeIcon = this.titlebar.children('.ui-dialog-titlebar-close');
        this.minimizeIcon = this.titlebar.children('.ui-dialog-titlebar-minimize');
        this.maximizeIcon = this.titlebar.children('.ui-dialog-titlebar-maximize');
        this.cfg.absolutePositioned = this.jq.hasClass('ui-dialog-absolute');
        this.jqEl = this.jq[0];

        this.positionInitialized = false;

        //configuration
        this.cfg.width = this.cfg.width||'auto';
        this.cfg.height = this.cfg.height||'auto';
        this.cfg.draggable = this.cfg.draggable !== false;
        this.cfg.resizable = this.cfg.resizable !== false;
        this.cfg.cache = this.cfg.cache !== false;
        this.cfg.responsive = this.cfg.responsive !== false;
        this.cfg.minWidth = this.cfg.minWidth||150;
        this.cfg.minHeight = this.cfg.minHeight||this.titlebar.outerHeight();
        this.cfg.my = this.cfg.my||'center';
        this.cfg.position = this.cfg.position||'center';
        this.parent = this.jq.parent();
        this.focusedElementBeforeDialogOpened = null;

        this.initSize();
        
        //events
        this.bindEvents();

        if(this.cfg.draggable) {
            this.setupDraggable();
        }

        if(this.cfg.resizable){
            this.setupResizable();
        }

        //docking zone
        if($(document.body).children('.ui-dialog-docking-zone').length === 0) {
            $(document.body).append('<div class="ui-dialog-docking-zone"></div>');
        }

        //aria
        this.applyARIA();

        if(this.cfg.visible){
            this.show();
        }

        if(this.cfg.responsive) {
            this.bindResizeListener();
        }
    }

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
     */
    refresh(cfg) {
        this.positionInitialized = false;
        this.loaded = false;

        $(document).off('keydown.dialog_' + cfg.id);

        if(this.minimized) {
            var dockingZone = $(document.body).children('.ui-dialog-docking-zone');
            if(dockingZone.length && dockingZone.children(this.jqId).length) {
                this.removeMinimize();
                dockingZone.children(this.jqId).remove();
            }
        }

        this.minimized = false;
        this.maximized = false;

        super.refresh(cfg);
    }

    /**
     * Computes and applies the correct size for this dialog, according to the current configuration.
     * @protected
     */
    initSize() {
        this.jq.css({
            'width': String(this.cfg.width),
            'height': 'auto'
        });

        this.content.height(this.cfg.height);

        if(this.cfg.fitViewport) {
            this.fitViewport();
        }
    }

    /**
     * Makes this dialog fit the current browser window, if the `fitViewport` option is enabled.
     * @protected
     */
    fitViewport() {
        var windowHeight = $(window).height();

        var margin = this.jq.outerHeight(true) - this.jq.outerHeight();
        var headerHeight = this.titlebar.outerHeight(true);
        var contentPadding = this.content.innerHeight() - this.content.height();
        var footerHeight = this.footer.outerHeight(true) || 0;

        var maxHeight = windowHeight - (margin + headerHeight + contentPadding + footerHeight);

        this.content.css('max-height', maxHeight + 'px');

        if(this.cfg.hasIframe) {
            this.content.children('iframe').css('max-height', maxHeight + 'px');
        }
    }


    /**
     * @override
     * @protected
     * @inheritdoc
     * @return {JQuery} The DOM elements which are allowed to be focused via tabbing.
     */
    getModalTabbables() {
        var tabbablesInIframe = this.cfg.getModalTabbables ? this.cfg.getModalTabbables() : undefined;
        
        return this.jq.find(':tabbable').add(tabbablesInIframe).add(this.footer.find(':tabbable'));
    }

    /**
     * Displays this dialog. In case the `dynamic` option is enabled and the content was not yet loaded, this may result
     * in an AJAX request to the sever to retrieve the content. Also triggers the show behaviors registered for this
     * dialog.
     * 
     * @param {number | string} [duration] Durations are given in milliseconds; higher values indicate slower
     * animations, not faster ones. The strings `fast` and `slow` can be supplied to indicate durations of 200 and 600
     * milliseconds, respectively.
     */
    show(duration) {
        if(this.isVisible()) {
            return;
        }
        
        // Remember the focused element before we opened the dialog
        // so we can return focus to it once we close the dialog.
        this.focusedElementBeforeDialogOpened = document.activeElement;

        if(!this.loaded && this.cfg.dynamic) {
            this.loadContents();
        }
        else {
            if (this.positionInitialized === false) {
                this.jqEl.style.visibility = "hidden";
                this.jqEl.style.display = "block";
                this.initPosition();
                this.jqEl.style.display = "none";
                this.jqEl.style.visibility = "visible";
            }

            this._show(duration);

            if(this.cfg.dynamic && !this.cfg.cache) {
                this.loaded = false;
            }
        }
    }

    /**
     * Performs the client-side actions needed to actually show this dialog. Compare to `show`, which loads the dialog
     * content from the server if required, then call this method.
     * 
     * @protected
     * 
     * @param {number | string} [duration] Durations are given in milliseconds; higher values indicate slower
     * animations, not faster ones. The strings `fast` and `slow` can be supplied to indicate durations of 200 and 600
     * milliseconds, respectively.
     */
    _show(duration) {
        this.moveToTop();

        //offset
        if(this.cfg.absolutePositioned) {
            var winScrollTop = $(window).scrollTop();
            this.jq.css('top', parseFloat(this.jq.css('top')) + (winScrollTop - this.lastScrollTop) + 'px');
            this.lastScrollTop = winScrollTop;
        }

        var animated = this.cfg.showEffect;
        if(animated) {
            var $this = this;

            this.jq.show(this.cfg.showEffect, duration, 'normal', function() {
                $this.postShow();
            });
        }
        else {
            //display dialog
            this.jq.show(duration);

            this.postShow();
        }

        if(this.cfg.modal) {
            this.enableModality();
        }
    }

    /**
     * Called after this dialog became visible. Triggers the behaviors and registered event listeners.
     * @protected
     */
    postShow() {
        if (this.cfg.fitViewport) {
            this.fitViewport();
        }
        
        this.callBehavior('open');

        PrimeFaces.invokeDeferredRenders(this.id);

        //execute user defined callback
        if(this.cfg.onShow) {
            this.cfg.onShow.call(this);
        }

        this.jq.attr({
            'aria-hidden': false
            ,'aria-live': 'polite'
        });

        this.applyFocus();
    }

    /**
     * Hide the dialog with an optional animation lasting for the given duration.
     * 
     * @param {number | string} [duration] Durations are given in milliseconds; higher values indicate slower
     * animations, not faster ones. The strings `fast` and `slow` can be supplied to indicate durations of 200 and 600
     * milliseconds, respectively.
     */
    hide(duration) {
        if(!this.isVisible()) {
            return;
        }

        var animated = this.cfg.hideEffect;
        if(animated) {
            var $this = this;

            this.jq.hide(this.cfg.hideEffect, duration, 'normal', function() {
                if($this.cfg.modal) {
                    $this.disableModality();
                }
                $this.onHide();
            });
        }
        else {
            this.jq.hide();
            if(this.cfg.modal) {
                this.disableModality();
            }
            this.onHide(duration);
        }
    }

    /**
     * Puts focus on the first element that can be focused.
     * @protected
     */
    applyFocus() {
        if (this.cfg.focus) {
            var $this = this;
            PrimeFaces.queueTask(function() {
                PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector($this.jq, $this.cfg.focus).trigger('focus')
            }, 100);
        }
        else
            PrimeFaces.focus(null, this.id);
    }
    
    /**
     * Puts focus on the element that opened this dialog.
     * @protected
     */
    returnFocus() {
        var el = this.focusedElementBeforeDialogOpened;
        if (el) {
            // #11860 do not return focus to caller if other dialogs are still open
            var otherDialogs = $(".ui-dialog:visible").length > 0;
            if (otherDialogs) {
                return;
            }
            // #11318 prevent scrolling in Chrome by using delayed execution
            PrimeFaces.queueTask(function() { el.focus({ preventScroll: true }) }, 100);
        }
    }

    /**
     * Sets up all event listeners required by this widget.
     * @protected
     */
    bindEvents() {
        var $this = this;

        //Move dialog to top if target is not a trigger for a PrimeFaces overlay
        this.jq.on("mousedown", function(e) {
            if(!$(e.target).data('primefaces-overlay-target')) {
                $this.moveToTop();
            }
        });

        this.icons.on('mouseover', function() {
            $(this).addClass('ui-state-hover');
        }).on('mouseout', function() {
            $(this).removeClass('ui-state-hover');
        }).on('focus', function() {
            $(this).addClass('ui-state-focus');
        }).on('blur', function() {
            $(this).removeClass('ui-state-focus');
        });

        PrimeFaces.skinCloseAction(this.closeIcon);
        this.closeIcon.on('click', function(e) {
            $this.hide();
            e.preventDefault();
        });

        this.maximizeIcon.on("click", function(e) {
            $this.toggleMaximize();
            e.preventDefault();
        });

        this.minimizeIcon.on("click", function(e) {
            $this.toggleMinimize();
            e.preventDefault();
        });

        if(this.cfg.hasIframe && !this.cfg.resizable && this.cfg.resizeObserver) {
            // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
            var resizeObserver = new ResizeObserver((entries) => {
                var iframe = this.content.children('iframe')[0];
                var frameHeight = $(iframe.contentWindow.document.body).outerHeight(true) + 8; // 8 because of weird p:messages - sizing issue
                $(iframe).height(frameHeight);

                if (this.cfg.resizeObserverCenter) {
                    // further improvement possible - maybe only center the dialog again if parts of the dialog are outside the window
                    this.initPosition();
                }
            });
            resizeObserver.observe(this.content.children('iframe')[0].contentWindow.document.body);
        }

        if(this.cfg.closeOnEscape) {
            $(document).on('keydown.dialog_' + this.id, function(e) {
                if(!e.isDefaultPrevented() && e.key === 'Escape' && $this.isVisible()) {
                    // GitHub #6677 if multiple dialogs check if this is the topmost active dialog to close
                    var currentZIndex = parseInt($this.jq.css('z-index'));
                    var highestZIndex = Math.max(...$('.ui-dialog:visible').map(function() {
                        return parseInt($(this).css('z-index')) || 0;
                    }).get());
                    if (currentZIndex === highestZIndex) {
                        $this.hide();
                        e.preventDefault();
                        e.stopPropagation();
                    }
                };
            });
            this.addDestroyListener(function() {
                $(document).off('keydown.dialog_' + this.id);
            });
        }
    }

    /**
     * Sets up all event listeners required to make this dialog draggable.
     * @protected
     */
    setupDraggable() {
        var $this = this;

        this.jq.draggable({
            cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
            handle: '.ui-dialog-titlebar',
            containment : $this.cfg.absolutePositioned ? 'document' : 'window',
            stop: function( event, ui ) {
                if($this.hasBehavior('move')) {
                    var ext = {
                        params: [
                            {name: $this.id + '_top', value: ui.offset.top},
                            {name: $this.id + '_left', value: ui.offset.left}
                        ]
                    };
                    $this.callBehavior('move', ext);
                }
            }
        });
    }

    /**
     * Sets up all event listeners required to make this dialog resizable.
     * @protected
     */
    setupResizable() {
        var $this = this;

        this.jq.resizable({
            handles : 'n,s,e,w,ne,nw,se,sw',
            minWidth : this.cfg.minWidth,
            minHeight : this.cfg.minHeight,
            alsoResize : this.content,
            containment: 'document',
            start: function(event, ui) {
                $this.jq.data('offset', $this.jq.offset());

                if($this.cfg.hasIframe) {
                    $this.iframeFix = $('<div style="position:absolute;background-color:transparent;width:100%;height:100%;top:0;left:0;"></div>').appendTo($this.content);
                }

                if ($this.hasBehavior('resizeStart')) {
                    var ext = {
                        params: [
                            {name: $this.id + '_width', value: ui.size.width},
                            {name: $this.id + '_height', value: ui.size.height}
                        ]
                    };
                    $this.callBehavior('resizeStart', ext);
                }
            },
            stop: function(event, ui) {
                $this.jq.css('position', 'fixed');

                if($this.cfg.hasIframe) {
                    $this.iframeFix.remove();
                }

                if ($this.hasBehavior('resizeStop')) {
                    var ext = {
                        params: [
                            {name: $this.id + '_width', value: ui.size.width},
                            {name: $this.id + '_height', value: ui.size.height}
                        ]
                    };
                    $this.callBehavior('resizeStop', ext);
                }
            }
        });

        this.resizers = this.jq.children('.ui-resizable-handle');
    }
    
    /**
     * Resets the dialog position as specified by the `position` property of this widget configuration.
     * @protected
     */
    resetPosition() {
       this.initPosition();
    }

    /**
     * Positions this dialog on the screen as specified by the widget configuration.
     * @protected
     */
    initPosition() {
        var $this = this;

        //reset
        this.jq.css({left:'0',top:'0'});

        if(/(center|left|top|right|bottom)/.test(this.cfg.position)) {
            this.cfg.position = this.cfg.position.replace(',', ' ');

            this.jq.position({
                        my: this.cfg.my
                        ,at: this.cfg.position
                        ,collision: 'fit'
                        ,of: window
                        //make sure dialog stays in viewport
                        ,using: function(pos) {
                            var l = pos.left < 0 ? 0 : pos.left,
                            t = pos.top < 0 ? 0 : pos.top,
                            scrollTop = $(window).scrollTop();

                            //offset
                            if($this.cfg.absolutePositioned) {
                                t += scrollTop;
                                $this.lastScrollTop = scrollTop;
                            }

                            $(this).css({
                                left: l + 'px'
                                ,top: t + 'px'
                            });
                        }
                    });
        }
        else {
            var coords = this.cfg.position.split(','),
            x = PrimeFaces.trim(coords[0]),
            y = PrimeFaces.trim(coords[1]);

            this.jq.offset({
                left: x
                ,top: y
            });
        }

        this.positionInitialized = true;
    }

    /**
     * Called when this dialog was closed. Invokes the appropriate behaviors and event listeners.
     * @protected
     * @param {unknown} [event] Unused.
     * @param {unknown} [ui] Unused. 
     */
    onHide(event, ui) {
        this.callBehavior('close');

        this.jq.attr({
            'aria-hidden': true
            ,'aria-live': 'off'
        });

        if(this.cfg.onHide) {
            this.cfg.onHide.call(this, event, ui);
        }
        
        // return focus to where it was before we opened the dialog
        this.returnFocus();
    }

    /**
     * Moves this dialog to the top so that it is positioned above other elements and overlays.
     */
    moveToTop() {
        PrimeFaces.nextZindex(this.jq);
    }

    /**
     * Toggle maxification, as if the user had clicked the maximize button. If this dialog is not yet maximized,
     * maximizes it. If this dialog is already maximized, reverts it back to its orignal size.
     */
    toggleMaximize() {
        if(this.minimized) {
            this.toggleMinimize();
        }

        if(this.maximized) {
            this.jq.removeClass('ui-dialog-maximized');
            this.restoreState();

            this.maximizeIcon.children('.ui-icon').removeClass('ui-icon-newwin').addClass('ui-icon-extlink');
            this.maximized = false;

            this.callBehavior('restoreMaximize');
        }
        else {
            this.saveState();

            this.jq.addClass('ui-dialog-maximized').css({
                'width': String($(window).width() - 6)
                ,'height': String($(window).height())
            }).offset({
                top: $(window).scrollTop()
                ,left: $(window).scrollLeft()
            });

            //maximize content
            var contentPadding = this.content.innerHeight() - this.content.height();
            this.content.css({
                width: 'auto',
                height: String(this.jq.height() - this.titlebar.outerHeight() - contentPadding)
            });

            this.maximizeIcon.removeClass('ui-state-hover').children('.ui-icon').removeClass('ui-icon-extlink').addClass('ui-icon-newwin');
            this.maximized = true;

            this.callBehavior('maximize');
        }
    }

    /**
     * Toggles minification, as if the user had clicked the minimize button. If this dialog is not yet minimized,
     * minimizes it.  If this dialog is already minimized, restores its original position.
     */
    toggleMinimize() {
        var animate = true,
        dockingZone = $(document.body).children('.ui-dialog-docking-zone');

        if(this.maximized) {
            this.toggleMaximize();
            animate = false;
        }

        var $this = this;

        if(this.minimized) {
            this.removeMinimize();

            this.callBehavior('restoreMinimize');
        }
        else {
            this.saveState();
            
            // create a minimize clone which is just the titlebar
            this.minimizeClone = this.jq.clone(true);
            this.minimizeClone.attr('id', this.jq.attr('id') + '_clone')
            this.minimizeClone.addClass('ui-dialog-minimized');
            this.minimizeClone.children('.ui-dialog-content').remove();
            this.minimizeClone.find('.ui-dialog-footer').remove();

            if (this.cfg.resizable) {
                this.minimizeClone.children('.ui-resizable-handle').remove();
            }

            if(animate) {
                this.jq.transfer({
                    to: dockingZone,
                    className: 'ui-dialog-minimizing',
                    duration: 500
                    }, function () {
                        $this.dock(dockingZone);
                    });
            }
            else {
                this.dock(dockingZone);
            }
        }
    }

    /**
     * Called when this dialog is minimized. Restores the original position of this dialog.
     * @protected
     */
    removeMinimize() {
        this.minimizeClone.remove();
        this.jq.show();
        this.restoreState();
        this.minimized = false;
    }

    /**
     * Docks this dialog to the given docking zone. The docking zone is usually at the bottom of the screen and displays
     * a list of minimized dialogs.
     * @protected
     * @param {JQuery} zone Zone to dock to.
     */
    dock(zone) {
        zone.css('z-index', this.jq.css('z-index'));
        this.jq.hide();
        this.minimizeClone.appendTo(zone).css({'position':'static', 'height':'auto', 'width':'auto', 'float': 'left'});
        var titlebar = this.minimizeClone.children('.ui-dialog-titlebar');
        var minimizeIcon = titlebar.children('.ui-dialog-titlebar-minimize');
        minimizeIcon.removeClass('ui-state-hover').children('.ui-icon').removeClass('ui-icon-minus').addClass('ui-icon-plus');
        this.minimized = true;
        this.callBehavior('minimize');
    }

    /**
     * Saves the current state of this dialog, such as its width and height. Used for example to preserve that state
     * during AJAX updates.
     * @protected
     */
    saveState() {
        this.state = {
            width: this.jq.width(),
            height: this.jq.height(),
            contentWidth: parseInt(this.content[0].style.width) || this.content.width(),
            contentHeight: this.content.height()
        };

        this.state.offset = this.jq.offset();
        this.state.windowScrollLeft = $(window).scrollLeft();
        this.state.windowScrollTop = $(window).scrollTop();
    }

    /**
     * Restores the state as saved by `saveState`, usually called after an AJAX update.
     * @protected
     */
    restoreState() {
        this.jq.width(this.state.width).height(this.state.height);
        this.content.width(this.state.contentWidth).height(this.state.contentHeight);

        this.jq.offset({
                top: this.state.offset.top + ($(window).scrollTop() - this.state.windowScrollTop)
                ,left: this.state.offset.left + ($(window).scrollLeft() - this.state.windowScrollLeft)
        });
    }

    /**
     * Loads the content of the dialog via AJAx, if this dialog is `dynamic` and the the content has not yet been
     * loaded.
     * @protected
     */
    loadContents() {
        var $this = this,
        options = {
            source: this.id,
            process: this.id,
            update: this.id,
            ignoreAutoUpdate: true,
            params: [
                {name: this.id + '_contentLoad', value: true}
            ],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            this.content.html(content);
                        }
                    });

                return true;
            },
            oncomplete: function() {
                $this.loaded = true;
                $this.show();
            }
        };

        if(this.hasBehavior('loadContent')) {
            this.callBehavior('loadContent', options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * Applies all `ARIA` attributes to the contents of this dialog.
     * @protected
     */
    applyARIA() {
        var role = this instanceof PrimeFaces.widget.ConfirmDialog ? 'alertdialog' : 'dialog';
        this.jq.attr({
            'role': role
            ,'aria-describedby': this.id + '_content'
            ,'aria-hidden': !this.cfg.visible
            ,'aria-modal': this.cfg.modal
        });
        
        // GitHub #4727
        var title = this.id + '_title';
        if ($(PrimeFaces.escapeClientId(title)).length) {
            this.jq.attr('aria-labelledby', title);
        }

        this.titlebar.children('a.ui-dialog-titlebar-icon').attr('role', 'button');
    }

    /**
     * Checks whether this dialog is opened and visible. This method returns `true` irrespective of whether this dialog 
     * is minimized, maximized, or shown normally. Returns `false` only when this dialog is closed. 
     * @return {boolean} `true` if this dialog is currently being shown, `false` otherwise.
     */
    isVisible() {
        return this.jq.is(':visible') || this.minimized === true;
    }

    /**
     * Sets up the event listeners for handling resize events.
     * @protected
     */
    bindResizeListener() {
        var $this = this;

        // internal function to handle resize or scrolling
        function handleResize() {
            if ($this.isVisible()) {
                if ($this.cfg.fitViewport) {
                    $this.fitViewport();
                }

                if (!$this.cfg.absolutePositioned) {
                    $this.initPosition();
                }
                else {
                    $this.positionInitialized = false;
                }
            }
        }

        PrimeFaces.utils.registerResizeHandler(this, 'resize.' + this.id + '_align', null, handleResize);
        PrimeFaces.utils.registerScrollHandler(this, 'scroll.' + this.id + '_align', handleResize);

        // #11578 if not using dialog framework (it has its own observer) then resize if the dialog is resized
        if (!this.cfg.hasIframe && !this.cfg.resizable) {
            const observer = new ResizeObserver(_entries => {
                handleResize();
            });
            observer.observe(this.jq[0]);
        }
    }

}

/**
 * __PrimeFaces ConfirmDialog Widget__
 * 
 * ConfirmDialog is a replacement to the legacy JavaScript confirmation box. Skinning, customization and avoiding popup
 * blockers are notable advantages over the classic JavaScript confirmation box.
 * 
 * @interface {PrimeFaces.widget.ConfirmDialog.ConfirmDialogMessage} ConfirmDialogMessage Interface for the message that
 * is shown in the confirm dialog.
 * @prop {string} ConfirmDialogMessage.header Header of the dialog message.
 * @prop {string} ConfirmDialogMessage.message Main content of the dialog message.
 * @prop {boolean} ConfirmDialogMessage.escape If `true`, the message is escaped for HTML. If `false`, the message is
 * interpreted as an HTML string.
 * @prop {string} [ConfirmDialogMessage.icon] Optional icon that is shown to the left of the confirm dialog. When not given, defaults to
 * `ui-icon-alert`. Must be a style class of some icon font.
 * @prop {string} [ConfirmDialogMessage.beforeShow] Optional code that is run before the message is shown. Must be valid JavaScript code.
 * It is evaluated via {@link PrimeFaces.csp.eval}.
 * 
 * @prop {JQuery} title DOM element of the title bar text.
 * @prop {JQuery} message DOM element of the confirmation message displayed in this confirm dialog.
 * @prop {JQuery} icon DOM element of the icon displayed next to the confirmation message.
 * @prop {JQuery} yesButton DOM element of the Yes button.
 * @prop {JQuery} noButton DOM element of the No button.
 * 
 * @interface {PrimeFaces.widget.ConfirmDialogCfg} cfg The configuration for the
 * {@link  ConfirmDialog| ConfirmDialog widget}. You can access this configuration via
 * {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this configuration is usually meant to be
 * read-only and should not be modified.
 * @extends {PrimeFaces.widget.DialogCfg} cfg
 */
PrimeFaces.widget.ConfirmDialog = class ConfirmDialog extends PrimeFaces.widget.Dialog {

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
     */
    init(cfg) {
        cfg.draggable = false;
        cfg.resizable = false;
        cfg.modal = true;

        if (!cfg.appendTo && cfg.global) {
        	cfg.appendTo = '@(body)';
        }

        super.init(cfg);

        this.title = this.titlebar.children('.ui-dialog-title');
        this.message = this.content.children('.ui-confirm-dialog-message');
        this.icon = this.content.children('.ui-confirm-dialog-severity');

        if(this.cfg.global) {
            PrimeFaces.confirmDialog = this;
            
            this.title.data('p-text', this.title.text());
            this.message.data('p-text', this.message.text());
            this.icon.data('p-icon', this.icon.removeClass('ui-icon ui-confirm-dialog-severity').attr('class'));
            this.yesButton = this.jq.find('.ui-confirmdialog-yes');
            this.noButton = this.jq.find('.ui-confirmdialog-no');
            this.yesButton.data('p-text', this.yesButton.children('.ui-button-text').text());
            this.noButton.data('p-text', this.noButton.children('.ui-button-text').text());
            this.yesButton.data('p-icon', this.yesButton.children('.ui-icon').attr('class'));
            this.noButton.data('p-icon', this.noButton.children('.ui-icon').attr('class'));

            this.jq.on('click.ui-confirmdialog', '.ui-confirmdialog-yes, .ui-confirmdialog-no', null, function(e) {
                var el = $(this);

                if(el.hasClass('ui-confirmdialog-yes') && PrimeFaces.confirmSource) {
                    var source = PrimeFaces.confirmSource;
                    var id = source.get(0);
                    var js = source.data('pfconfirmcommand');
                    var command = $(id);

                    if (PrimeFaces.ajax.Utils.isAjaxRequest(js) || command.is('a')) {
                        // command is ajax=true
                        var originalOnClick;

                        if (source[0]) {
                            var events = $._data(source[0], "events");
                            originalOnClick = source.prop('onclick') || (events && events.click ? events.click[0].handler : null);
                        }

                        // Temporarily remove the click handler and execute the new one
                        source.prop('onclick', null).off("click").on("click", function(event) {
                            PrimeFaces.csp.executeEvent(id, js, event);
                        }).click();

                        // Restore the original click handler if it exists
                        if (originalOnClick) {
                            source.off("click").on("click", originalOnClick);
                        }
                    } else {
                        // command is ajax=false
                        if (command.prop('onclick')) {
                            command.removeAttr("onclick");
                        } else {
                            command.off("click");
                        }
                        command.removeAttr("data-pfconfirmcommand").click();
                    }

                    PrimeFaces.confirmDialog.hide();
                    PrimeFaces.confirmSource = null;
                }
                else if(el.hasClass('ui-confirmdialog-no')) {
                    PrimeFaces.confirmDialog.hide();
                    PrimeFaces.confirmSource = null;
                }

                e.preventDefault();
            });
        }
    }

    /**
     * @override
     * @protected
     * @inheritdoc
     */
    applyFocus() {
        this.jq.find(':button,:submit').filter(':visible:enabled').eq(0).trigger('focus');
    }
    
    /**
     * @override
     * @protected
     * @inheritdoc
     * @param {unknown} [event] Unused.
     * @param {unknown} [ui] Unused. 
     */
    onHide(event, ui) {
        super.onHide(event, ui);

        // Remove added classes and reset button labels to their original values
        if (this.cfg.global) {
            if (this.title.data('p-text')) {
                this.title.text(this.title.data('p-text'));
            }
            if (this.message.data('p-text')) {
                this.message.text(this.message.data('p-text'));
            }
            if (this.icon.data('p-icon')) {
                this.icon.attr('class', 'ui-icon ui-confirm-dialog-severity ' + this.icon.data('p-icon'));
            }
            this.yesButton.removeClass(this.yesButton.data('p-class'));
            this.noButton.removeClass(this.noButton.data('p-class'));
            this.yesButton.children('.ui-button-text').text(this.yesButton.data('p-text'));
            this.noButton.children('.ui-button-text').text(this.noButton.data('p-text'));
            this.yesButton.children('.ui-icon').attr('class', this.yesButton.data('p-icon'));
            this.noButton.children('.ui-icon').attr('class', this.noButton.data('p-icon'));
        }
    }

    /**
     * Shows the given message in this confirmation dialog.
     * @param {Partial<PrimeFaces.widget.ConfirmDialog.ConfirmDialogMessage>} msg Message to show.
     */
    showMessage(msg) {
        // Execute any code specified to run before showing the message
        if (msg.beforeShow) {
            PrimeFaces.csp.eval(msg.beforeShow);
        }

        // Set icon if provided, or hide it otherwise
        var iconClass = msg.icon || this.icon.data('p-icon');
        if (iconClass) {
            this.icon.removeClass().addClass('ui-icon ui-confirm-dialog-severity ' + iconClass);
            this.icon.show();
        } else {
            this.icon.hide();
        }

        // Set labels and classes for yes and no buttons if provided
        if (msg.yesButtonLabel) {
            this.yesButton.children('.ui-button-text').text(msg.yesButtonLabel);
        }
        if (msg.yesButtonClass) {
            this.yesButton.addClass(msg.yesButtonClass).data('p-class', msg.yesButtonClass);
        }
        if (msg.yesButtonIcon) {
            PrimeFaces.utils.replaceIcon(this.yesButton.children('.ui-icon'), msg.yesButtonIcon);
        }
        if (msg.noButtonLabel) {
            this.noButton.children('.ui-button-text').text(msg.noButtonLabel);
        }
        if (msg.noButtonClass) {
            this.noButton.addClass(msg.noButtonClass).data('p-class', msg.noButtonClass);
        }
        if (msg.noButtonIcon) {
            PrimeFaces.utils.replaceIcon(this.noButton.children('.ui-icon'), msg.noButtonIcon);
        }

        // Set title, message content, and escape HTML if necessary
        if (msg.header) {
            this.title.text(msg.header);
        }
        if (msg.message) {
            if (msg.escape) {
                this.message.text(msg.message);
            } else {
                this.message.html(msg.message);
            }
        }

        // Reset position if specified in global configuration
        if (this.cfg.global) {
            this.positionInitialized = false;
        }

        this.show();
    }

}

/**
 * __PrimeFaces Dynamic Dialog Widget__ 
 * 
 * Used by the dialog framework for displaying other Faces views or external pages in a dialog on the current.
 * 
 * @interface {PrimeFaces.widget.DynamicDialogCfg} cfg The configuration for the {@link DynamicDialog| DynamicDialog widget}.
 * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this
 * configuration is usually meant to be read-only and should not be modified.
 * @extends {PrimeFaces.widget.DialogCfg} cfg
 */
PrimeFaces.widget.DynamicDialog = class DynamicDialog extends PrimeFaces.widget.Dialog {

    /**
     * @override
     * @inheritdoc
     */
    show() {
        if(this.jq.hasClass('ui-overlay-visible')) {
            return;
        }

        if(this.positionInitialized === false) {
            this.initPosition();
        }

        this._show();
    }


    /**
     * @override
     * @protected
     * @inheritdoc
     */
    _show() {
        //replace visibility hidden with display none for effect support, toggle marker class
        this.jq.removeClass('ui-overlay-hidden').addClass('ui-overlay-visible').css({
            'display':'none'
            ,'visibility':'visible'
        });

        this.moveToTop();

        this.jq.show();

        if(this.cfg.height != "auto") {
            this.content.height(this.jq.outerHeight() - this.titlebar.outerHeight(true));
        }

        this.postShow();

        if(this.cfg.modal) {
            this.enableModality();
        }
    }

    /**
     * @override
     * @protected
     * @inheritdoc
     */
    initSize() {
        this.jq.css({
            'width': String(this.cfg.width),
            'height': String(this.cfg.height)
        });

        if(this.cfg.fitViewport) {
            this.fitViewport();
        }
    }

}
