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
package org.primefaces.component.gmap;

import org.primefaces.PrimeFaces;
import org.primefaces.event.map.GeocodeEvent;
import org.primefaces.event.map.MarkerDragEvent;
import org.primefaces.event.map.OverlaySelectEvent;
import org.primefaces.event.map.PointSelectEvent;
import org.primefaces.event.map.ReverseGeocodeEvent;
import org.primefaces.event.map.StateChangeEvent;
import org.primefaces.model.map.GeocodeResult;
import org.primefaces.model.map.LatLng;
import org.primefaces.model.map.LatLngBounds;
import org.primefaces.model.map.Marker;
import org.primefaces.util.ComponentTraversalUtils;
import org.primefaces.util.ComponentUtils;
import org.primefaces.util.Constants;
import org.primefaces.util.MapBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import jakarta.faces.FacesException;
import jakarta.faces.application.ResourceDependency;
import jakarta.faces.context.FacesContext;
import jakarta.faces.event.AjaxBehaviorEvent;
import jakarta.faces.event.BehaviorEvent;
import jakarta.faces.event.FacesEvent;

@ResourceDependency(library = "primefaces", name = "jquery/jquery.js")
@ResourceDependency(library = "primefaces", name = "core.js")
@ResourceDependency(library = "primefaces", name = "components.js")
@ResourceDependency(library = "primefaces", name = "gmap/gmap.js")
public class GMap extends GMapBase {

    public static final String COMPONENT_TYPE = "org.primefaces.component.GMap";

    private static final Map<String, Class<? extends BehaviorEvent>> BEHAVIOR_EVENT_MAPPING = MapBuilder.<String, Class<? extends BehaviorEvent>>builder()
            .put("overlaySelect", OverlaySelectEvent.class)
            .put("overlayDblSelect", OverlaySelectEvent.class)
            .put("stateChange", StateChangeEvent.class)
            .put("pointSelect", PointSelectEvent.class)
            .put("pointDblSelect", PointSelectEvent.class)
            .put("markerDrag", MarkerDragEvent.class)
            .put("geocode", GeocodeEvent.class)
            .put("reverseGeocode", ReverseGeocodeEvent.class)
            .build();

    private static final Collection<String> EVENT_NAMES = BEHAVIOR_EVENT_MAPPING.keySet();

    @Override
    public Map<String, Class<? extends BehaviorEvent>> getBehaviorEventMapping() {
        return BEHAVIOR_EVENT_MAPPING;
    }

    @Override
    public Collection<String> getEventNames() {
        return EVENT_NAMES;
    }

    @Override
    public void queueEvent(FacesEvent event) {
        FacesContext context = event.getFacesContext();
        Map<String, String> params = context.getExternalContext().getRequestParameterMap();
        String eventName = params.get(Constants.RequestParams.PARTIAL_BEHAVIOR_EVENT_PARAM);
        String clientId = getClientId(context);

        if (ComponentUtils.isRequestSource(this, context)) {

            AjaxBehaviorEvent behaviorEvent = (AjaxBehaviorEvent) event;
            FacesEvent wrapperEvent = null;

            if ("overlaySelect".equals(eventName) || "overlayDblSelect".equals(eventName)) {
                wrapperEvent = new OverlaySelectEvent<>(this, behaviorEvent.getBehavior(), getModel().findOverlay(params.get(clientId + "_overlayId")));

                //if there is info window, update and show it
                GMapInfoWindow infoWindow = getInfoWindow();
                if (infoWindow != null) {
                    PrimeFaces.current().ajax().update(infoWindow.getClientId(context));
                }
            }
            else if ("stateChange".equals(eventName)) {
                String[] centerLoc = params.get(clientId + "_center").split(",");
                String[] northeastLoc = params.get(clientId + "_northeast").split(",");
                String[] southwestLoc = params.get(clientId + "_southwest").split(",");
                int zoomLevel = Integer.parseInt(params.get(clientId + "_zoom"));

                LatLng center = new LatLng(Double.valueOf(centerLoc[0]), Double.valueOf(centerLoc[1]));
                LatLng northeast = new LatLng(Double.valueOf(northeastLoc[0]), Double.valueOf(northeastLoc[1]));
                LatLng southwest = new LatLng(Double.valueOf(southwestLoc[0]), Double.valueOf(southwestLoc[1]));

                wrapperEvent = new StateChangeEvent(this, behaviorEvent.getBehavior(), new LatLngBounds(northeast, southwest), zoomLevel, center);
            }
            else if ("pointSelect".equals(eventName) || "pointDblSelect".equals(eventName)) {
                String[] latlng = params.get(clientId + "_pointLatLng").split(",");
                LatLng position = new LatLng(Double.valueOf(latlng[0]), Double.valueOf(latlng[1]));

                wrapperEvent = new PointSelectEvent(this, behaviorEvent.getBehavior(), position);
            }
            else if ("markerDrag".equals(eventName)) {
                Marker<?> marker = (Marker<?>) getModel().findOverlay(params.get(clientId + "_markerId"));
                double lat = Double.parseDouble(params.get(clientId + "_lat"));
                double lng = Double.parseDouble(params.get(clientId + "_lng"));
                marker.setLatlng(new LatLng(lat, lng));

                wrapperEvent = new MarkerDragEvent<>(this, behaviorEvent.getBehavior(), marker);
            }
            else if ("geocode".equals(eventName)) {
                List<GeocodeResult> results = new ArrayList<>();
                String query = params.get(clientId + "_query");
                String[] addresses = params.get(clientId + "_addresses").split("_primefaces_");
                String[] lats = params.get(clientId + "_lat").split(",");
                String[] lngs = params.get(clientId + "_lng").split(",");

                for (int i = 0; i < addresses.length; i++) {
                    results.add(new GeocodeResult(addresses[i], new LatLng(Double.valueOf(lats[i]), Double.valueOf(lngs[i]))));
                }

                wrapperEvent = new GeocodeEvent(this, behaviorEvent.getBehavior(), query, results);
            }
            else if ("reverseGeocode".equals(eventName)) {
                String[] results = params.get(clientId + "_address").split("_primefaces_");
                List<String> addresses = Arrays.asList(results);

                double lat = Double.parseDouble(params.get(clientId + "_lat"));
                double lng = Double.parseDouble(params.get(clientId + "_lng"));
                LatLng coord = new LatLng(lat, lng);

                wrapperEvent = new ReverseGeocodeEvent(this, behaviorEvent.getBehavior(), coord, addresses);
            }

            if (wrapperEvent == null) {
                throw new FacesException("Component " + getClass().getName() + " does not support event " + eventName + "!");
            }

            wrapperEvent.setPhaseId(behaviorEvent.getPhaseId());

            super.queueEvent(wrapperEvent);
        }
        else {
            super.queueEvent(event);
        }
    }

    public GMapInfoWindow getInfoWindow() {
        return ComponentTraversalUtils.firstChildRendered(GMapInfoWindow.class, this);
    }
}
