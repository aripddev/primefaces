/*
 * The MIT License
 *
 * Copyright (c) 2009-2025 PrimeTek Informatics
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package org.primefaces.component.columntoggler;

import org.primefaces.component.api.UIColumn;
import org.primefaces.component.api.UITable;
import org.primefaces.event.ColumnToggleEvent;
import org.primefaces.event.ToggleCloseEvent;
import org.primefaces.event.ToggleEvent;
import org.primefaces.expression.SearchExpressionUtils;
import org.primefaces.model.Visibility;
import org.primefaces.util.Constants;
import org.primefaces.util.MapBuilder;

import java.util.Arrays;
import java.util.Collection;
import java.util.Map;

import jakarta.faces.application.ResourceDependency;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.event.AjaxBehaviorEvent;
import jakarta.faces.event.BehaviorEvent;
import jakarta.faces.event.FacesEvent;

@ResourceDependency(library = "primefaces", name = "components.css")
@ResourceDependency(library = "primefaces", name = "jquery/jquery.js")
@ResourceDependency(library = "primefaces", name = "jquery/jquery-plugins.js")
@ResourceDependency(library = "primefaces", name = "core.js")
@ResourceDependency(library = "primefaces", name = "components.js")
public class ColumnToggler extends ColumnTogglerBase {

    public static final String COMPONENT_TYPE = "org.primefaces.component.ColumnToggler";

    private static final String DEFAULT_EVENT = "toggle";

    private static final Map<String, Class<? extends BehaviorEvent>> BEHAVIOR_EVENT_MAPPING = MapBuilder.<String, Class<? extends BehaviorEvent>>builder()
            .put("toggle", ToggleEvent.class)
            .put("close", ToggleCloseEvent.class)
            .build();

    private static final Collection<String> EVENT_NAMES = BEHAVIOR_EVENT_MAPPING.keySet();

    private UIComponent dataSourceComponent;

    @Override
    public Map<String, Class<? extends BehaviorEvent>> getBehaviorEventMapping() {
        return BEHAVIOR_EVENT_MAPPING;
    }

    @Override
    public Collection<String> getEventNames() {
        return EVENT_NAMES;
    }

    @Override
    public String getDefaultEventName() {
        return DEFAULT_EVENT;
    }

    @Override
    public void queueEvent(FacesEvent event) {
        FacesContext context = getFacesContext();
        Map<String, String> params = context.getExternalContext().getRequestParameterMap();
        String eventName = params.get(Constants.RequestParams.PARTIAL_BEHAVIOR_EVENT_PARAM);

        if (event instanceof AjaxBehaviorEvent && "toggle".equals(eventName)) {
            String clientId = getClientId(context);
            Visibility visibility = Visibility.valueOf(params.get(clientId + "_visibility"));
            int index = Integer.parseInt(params.get(clientId + "_index"));

            UIColumn column = ((UITable) getDataSourceComponent()).getColumns().get(index);
            super.queueEvent(new ColumnToggleEvent(this, ((AjaxBehaviorEvent) event).getBehavior(), column, visibility, index));
        }
        else if (event instanceof AjaxBehaviorEvent && "close".equals(eventName)) {
            String clientId = this.getClientId(context);

            String visibleColumnIds = params.get(clientId + "_visibleColumnIds");
            if (visibleColumnIds != null) {
                String[] visibleColumns = visibleColumnIds.split(",");

                super.queueEvent(new ToggleCloseEvent(this, ((AjaxBehaviorEvent) event).getBehavior(), Arrays.asList(visibleColumns)));
            }
        }
        else {
            super.queueEvent(event);
        }
    }

    public UIComponent getDataSourceComponent() {
        if (dataSourceComponent == null) {
            dataSourceComponent = SearchExpressionUtils.contextlessResolveComponent(getFacesContext(), this, getDatasource());
        }

        return dataSourceComponent;
    }

    @Override
    public Object saveState(FacesContext context) {
        // reset component for MyFaces view pooling
        dataSourceComponent = null;

        return super.saveState(context);
    }
}