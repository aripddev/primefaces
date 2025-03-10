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
package org.primefaces.component.captcha;

import org.primefaces.renderkit.CoreRenderer;
import org.primefaces.util.Constants;
import org.primefaces.util.LangUtils;
import org.primefaces.util.WidgetBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import jakarta.el.ELException;
import jakarta.faces.FacesException;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.context.ResponseWriter;

public class CaptchaRenderer extends CoreRenderer {

    private static final Logger LOGGER = Logger.getLogger(CaptchaRenderer.class.getName());

    @Override
    public void decode(FacesContext context, UIComponent component) {
        Captcha captcha = (Captcha) component;
        Map<String, String> params = context.getExternalContext().getRequestParameterMap();

        String answer = params.get(String.format("%s-response", captcha.getType()));

        if (answer != null) {
            captcha.setSubmittedValue(answer);
        }
        else {
            captcha.setSubmittedValue(Constants.EMPTY_STRING);
        }
    }

    @Override
    public void encodeEnd(FacesContext context, UIComponent component) throws IOException {
        Captcha captcha = (Captcha) component;
        String publicKey = getPublicKey(context, captcha);

        if (publicKey == null) {
            throw new FacesException("Cannot find public key for catpcha, use " + Captcha.PUBLIC_KEY + " context-param to define one");
        }

        switch (captcha.getType()) {
            case Captcha.RECAPTCHA:
                if (LangUtils.isBlank(captcha.getSourceUrl())) {
                    captcha.setSourceUrl("https://www.google.com/recaptcha/api.js");
                }
                if (LangUtils.isBlank(captcha.getVerifyUrl())) {
                    captcha.setVerifyUrl("https://www.google.com/recaptcha/api/siteverify");
                }
                if (LangUtils.isBlank(captcha.getExecutor())) {
                    captcha.setExecutor("grecaptcha");
                }
                break;
            case Captcha.HCAPTCHA:
                if (LangUtils.isBlank(captcha.getSourceUrl())) {
                    captcha.setSourceUrl("https://js.hcaptcha.com/1/api.js");
                }
                if (LangUtils.isBlank(captcha.getVerifyUrl())) {
                    captcha.setVerifyUrl("https://api.hcaptcha.com/siteverify");
                }
                if (LangUtils.isBlank(captcha.getExecutor())) {
                    captcha.setExecutor("hcaptcha");
                }
                break;
            default:
                throw new FacesException(String.format("Captcha type must be one of %s", List.of(Captcha.RECAPTCHA, Captcha.HCAPTCHA)));
        }

        encodeMarkup(context, captcha, publicKey);
        encodeScript(context, captcha, publicKey);
    }

    protected void encodeMarkup(FacesContext context, Captcha captcha, String publicKey) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        String clientId = captcha.getClientId(context);
        captcha.setRequired(true);
        writer.startElement("div", null);
        writer.writeAttribute("id", clientId, "id");

        if (captcha.getSize() != null && "invisible".equals(captcha.getSize())) {
            writer.writeAttribute("class", captcha.getType(), null);
            writer.writeAttribute("data-sitekey", publicKey, null);
            writer.writeAttribute("data-size", "invisible", null);
        }

        renderDynamicPassThruAttributes(context, captcha);

        writer.endElement("div");
    }

    protected void encodeScript(FacesContext context, Captcha captcha, String publicKey) throws IOException {
        WidgetBuilder wb = getWidgetBuilder(context);
        wb.init("Captcha", captcha);

        wb.attr("sitekey", publicKey)
                .attr("theme", captcha.getTheme(), "auto")
                .attr("language", captcha.getLanguage(), "en")
                .attr("tabindex", captcha.getTabindex(), 0)
                .attr("callback", captcha.getCallback(), null)
                .attr("expired", captcha.getExpired(), null)
                .attr("size", captcha.getSize(), null)
                .attr("executor", captcha.getExecutor(), null)
                .attr("sourceUrl", captcha.getSourceUrl(), null);

        wb.finish();
    }

    protected String getPublicKey(FacesContext context, Captcha captcha) {
        String publicKey = context.getExternalContext().getInitParameter(Captcha.PUBLIC_KEY);
        try {
            if (publicKey != null) {
                publicKey = context.getApplication().evaluateExpressionGet(context, publicKey, String.class);
            }
        }
        catch (ELException e) {
            LOGGER.fine(() -> "Error processing context parameter " + Captcha.PUBLIC_KEY + " as EL-expression: " + e.getMessage());
        }
        return publicKey;
    }
}
