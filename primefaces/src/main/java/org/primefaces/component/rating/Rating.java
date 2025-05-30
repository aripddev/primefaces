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
package org.primefaces.component.rating;

import org.primefaces.event.RateEvent;
import org.primefaces.util.Constants;
import org.primefaces.util.MapBuilder;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import jakarta.faces.application.ResourceDependency;
import jakarta.faces.context.FacesContext;
import jakarta.faces.event.AjaxBehaviorEvent;
import jakarta.faces.event.BehaviorEvent;
import jakarta.faces.event.FacesEvent;

@ResourceDependency(library = "primefaces", name = "components.css")
@ResourceDependency(library = "primefaces", name = "jquery/jquery.js")
@ResourceDependency(library = "primefaces", name = "core.js")
@ResourceDependency(library = "primefaces", name = "components.js")
public class Rating extends RatingBase {

    public static final String COMPONENT_TYPE = "org.primefaces.component.Rating";

    public static final String CONTAINER_CLASS = "ui-rating";
    public static final String CANCEL_CLASS = "ui-rating-cancel";
    public static final String STAR_CLASS = "ui-rating-star";
    public static final String STAR_ON_CLASS = "ui-rating-star ui-rating-star-on";

    private static final String DEFAULT_EVENT = "rate";
    private static final Map<String, Class<? extends BehaviorEvent>> BEHAVIOR_EVENT_MAPPING = MapBuilder.<String, Class<? extends BehaviorEvent>>builder()
            .put("rate", RateEvent.class)
            .put("cancel", RateEvent.class)
            .build();
    private static final Collection<String> EVENT_NAMES = BEHAVIOR_EVENT_MAPPING.keySet();

    private Map<String, AjaxBehaviorEvent> customEvents = new HashMap<>(1);

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

        if (event instanceof AjaxBehaviorEvent) {
            String eventName = context.getExternalContext().getRequestParameterMap().get(Constants.RequestParams.PARTIAL_BEHAVIOR_EVENT_PARAM);

            if ("rate".equals(eventName) || "cancel".equals(eventName)) {
                customEvents.put(eventName, (AjaxBehaviorEvent) event);
            }
        }
        else {
            super.queueEvent(event);
        }
    }

    @Override
    public void validate(FacesContext context) {
        super.validate(context);

        if (isValid() && customEvents != null) {
            for (Map.Entry<String, AjaxBehaviorEvent> event : customEvents.entrySet()) {
                String eventName = event.getKey();
                AjaxBehaviorEvent behaviorEvent = event.getValue();
                Object value = "cancel".equals(eventName) ? null : getValue();
                setValue(value);
                RateEvent<?> rateEvent = new RateEvent<>(this, behaviorEvent.getBehavior(), value);

                rateEvent.setPhaseId(behaviorEvent.getPhaseId());

                super.queueEvent(rateEvent);
            }
        }
    }

    @Override
    public Object saveState(FacesContext context) {
        // reset component for MyFaces view pooling
        if (customEvents != null) {
            customEvents.clear();
        }

        return super.saveState(context);
    }
}