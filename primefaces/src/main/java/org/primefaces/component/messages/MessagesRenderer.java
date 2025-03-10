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
package org.primefaces.component.messages;

import org.primefaces.context.PrimeApplicationContext;
import org.primefaces.renderkit.UINotificationRenderer;
import org.primefaces.util.HTML;
import org.primefaces.util.WidgetBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.context.ResponseWriter;

public class MessagesRenderer extends UINotificationRenderer {

    @Override
    public void encodeEnd(FacesContext context, UIComponent component) throws IOException {
        Messages uiMessages = (Messages) component;

        encodeMarkup(context, uiMessages);
        encodeScript(context, uiMessages);
    }

    protected void encodeMarkup(FacesContext context, Messages uiMessages) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        String clientId = uiMessages.getClientId(context);
        boolean globalOnly = uiMessages.isGlobalOnly();
        String containerClass = uiMessages.isShowIcon() ? Messages.CONTAINER_CLASS : Messages.ICONLESS_CONTAINER_CLASS;
        String style = uiMessages.getStyle();
        String styleClass = uiMessages.getStyleClass();
        styleClass = (styleClass == null) ? containerClass : containerClass + " " + styleClass;

        Map<String, List<FacesMessage>> messagesBySeverity = null;
        List<FacesMessage> messages = collectFacesMessages(uiMessages, context);
        if (messages != null && !messages.isEmpty()) {
            messagesBySeverity = new HashMap<>(4);

            for (int i = 0; i < messages.size(); i++) {
                FacesMessage message = messages.get(i);
                FacesMessage.Severity severity = message.getSeverity();

                if (severity.equals(FacesMessage.SEVERITY_INFO)) {
                    addMessage(uiMessages, message, messagesBySeverity, "info");
                }
                else if (severity.equals(FacesMessage.SEVERITY_WARN)) {
                    addMessage(uiMessages, message, messagesBySeverity, "warn");
                }
                else if (severity.equals(FacesMessage.SEVERITY_ERROR)) {
                    addMessage(uiMessages, message, messagesBySeverity, "error");
                }
                else if (severity.equals(FacesMessage.SEVERITY_FATAL)) {
                    addMessage(uiMessages, message, messagesBySeverity, "fatal");
                }
            }
        }

        writer.startElement("div", uiMessages);
        writer.writeAttribute("id", clientId, "id");
        writer.writeAttribute("class", styleClass, null);

        if (style != null) {
            writer.writeAttribute("style", style, null);
        }

        writer.writeAttribute(HTML.ARIA_LIVE, "polite", null);

        if (PrimeApplicationContext.getCurrentInstance(context).getConfig().isClientSideValidationEnabled()) {
            writer.writeAttribute("data-global", String.valueOf(globalOnly), null);
            writer.writeAttribute("data-summary", uiMessages.isShowSummary(), null);
            writer.writeAttribute("data-detail", uiMessages.isShowDetail(), null);
            writer.writeAttribute("data-severity", getClientSideSeverity(uiMessages.getSeverity()), null);
            writer.writeAttribute("data-redisplay", String.valueOf(uiMessages.isRedisplay()), null);
        }

        if (messagesBySeverity != null) {
            for (Map.Entry<String, List<FacesMessage>> entry : messagesBySeverity.entrySet()) {
                encodeMessages(context, uiMessages, entry.getKey(), entry.getValue());
            }
        }

        writer.endElement("div");
    }

    protected void encodeScript(FacesContext context, Messages uiMessages) throws IOException {
        WidgetBuilder wb = getWidgetBuilder(context);
        wb.init("Messages", uiMessages)
                .finish();
    }

    protected void addMessage(Messages uiMessages, FacesMessage message, Map<String, List<FacesMessage>> messagesBySeverity, String severity) {
        if (shouldRender(uiMessages, message, severity)) {
            List<FacesMessage> severityMessages = messagesBySeverity.computeIfAbsent(severity, k -> new ArrayList<>());
            severityMessages.add(message);
        }
    }

    protected void encodeMessages(FacesContext context, Messages uiMessages, String severity, List<FacesMessage> messages) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        String styleClassPrefix = Messages.SEVERITY_PREFIX_CLASS + severity;
        boolean escape = uiMessages.isEscape();

        writer.startElement("div", null);
        writer.writeAttribute("class", styleClassPrefix, null);

        if (uiMessages.isClosable()) {
            encodeCloseIcon(context, uiMessages);
        }

        if (uiMessages.isShowIcon()) {
            writer.startElement("span", null);
            writer.writeAttribute("class", styleClassPrefix + "-icon", null);
            writer.endElement("span");
        }

        writer.startElement("ul", null);

        for (int i = 0; i < messages.size(); i++) {
            FacesMessage message = messages.get(i);
            encodeMessage(writer, uiMessages, message, styleClassPrefix, escape);
            message.rendered();
        }

        writer.endElement("ul");

        writer.endElement("div");
    }

    protected void encodeMessage(ResponseWriter writer, Messages uiMessages, FacesMessage message, String styleClassPrefix, boolean escape)
            throws IOException {

        writer.startElement("li", null);

        writer.writeAttribute("role", "alert", null);
        writer.writeAttribute(HTML.ARIA_ATOMIC, "true", null);

        String summary = message.getSummary() != null ? message.getSummary() : "";
        String detail = message.getDetail() != null ? message.getDetail() : summary;
        if (uiMessages.isSkipDetailIfEqualsSummary() && Objects.equals(summary, detail)) {
            detail = "";
        }

        if (uiMessages.isShowSummary()) {
            writer.startElement("span", null);
            writer.writeAttribute("class", styleClassPrefix + "-summary", null);

            if (escape) {
                writer.writeText(summary, null);
            }
            else {
                writer.write(summary);
            }

            writer.endElement("span");
        }

        if (uiMessages.isShowDetail()) {
            writer.startElement("span", null);
            writer.writeAttribute("class", styleClassPrefix + "-detail", null);

            if (escape) {
                writer.writeText(detail, null);
            }
            else {
                writer.write(detail);
            }

            writer.endElement("span");
        }

        writer.endElement("li");
    }

    protected void encodeCloseIcon(FacesContext context, Messages uiMessages) throws IOException {
        ResponseWriter writer = context.getResponseWriter();

        writer.startElement("a", null);
        writer.writeAttribute("href", "#", null);
        writer.writeAttribute("class", Messages.CLOSE_LINK_CLASS, null);
        writer.writeAttribute("onclick", "$(this).parent().slideUp();return false;", null);

        writer.startElement("span", null);
        writer.writeAttribute("class", Messages.CLOSE_ICON_CLASS, null);
        writer.endElement("span");

        writer.endElement("a");
    }
}
