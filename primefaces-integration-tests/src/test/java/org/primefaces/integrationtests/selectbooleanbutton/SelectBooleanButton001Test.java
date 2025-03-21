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
package org.primefaces.integrationtests.selectbooleanbutton;

import org.primefaces.selenium.AbstractPrimePage;
import org.primefaces.selenium.AbstractPrimePageTest;
import org.primefaces.selenium.component.CommandButton;
import org.primefaces.selenium.component.Messages;
import org.primefaces.selenium.component.SelectBooleanButton;
import org.primefaces.selenium.component.model.Msg;

import org.json.JSONObject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.support.FindBy;

import static org.junit.jupiter.api.Assertions.*;

class SelectBooleanButton001Test extends AbstractPrimePageTest {

    @Test
    @Order(1)
    @DisplayName("SelectBooleanButton: Basic test clicking on switch and using Submit button")
    void submit(Page page) {
        // Arrange
        SelectBooleanButton selectBooleanButton = page.selectBooleanButton;
        assertFalse(selectBooleanButton.isSelected());

        // Act
        selectBooleanButton.click();
        page.submit.click();

        // Assert
        assertChecked(page, true);
    }

    @Test
    @Order(2)
    @DisplayName("SelectBooleanButton: Use toggle() widget API to select switch")
    void toggleTrue(Page page) {
        // Arrange
        SelectBooleanButton selectBooleanButton = page.selectBooleanButton;
        assertFalse(selectBooleanButton.isSelected());

        // Act
        selectBooleanButton.toggle();

        // Assert
        assertChecked(page, true);
    }

    @Test
    @Order(3)
    @DisplayName("SelectBooleanButton: Use toggle() widget API to de-select switch")
    void toggleFalse(Page page) {
        // Arrange
        SelectBooleanButton selectBooleanButton = page.selectBooleanButton;
        selectBooleanButton.setValue(true);
        assertTrue(selectBooleanButton.isSelected());

        // Act
        selectBooleanButton.toggle();

        // Assert
        assertChecked(page, false);
    }

    @Test
    @Order(4)
    @DisplayName("SelectBooleanButton: Use uncheck() widget API to de-select switch")
    void uncheck(Page page) {
        // Arrange
        SelectBooleanButton selectBooleanButton = page.selectBooleanButton;
        selectBooleanButton.setValue(true);
        assertTrue(selectBooleanButton.isSelected());

        // Act
        selectBooleanButton.uncheck();

        // Assert
        assertChecked(page, false);
    }

    @Test
    @Order(5)
    @DisplayName("SelectBooleanButton: Use check() widget API to select switch")
    void check(Page page) {
        // Arrange
        SelectBooleanButton selectBooleanButton = page.selectBooleanButton;
        selectBooleanButton.setValue(false);
        assertFalse(selectBooleanButton.isSelected());

        // Act
        selectBooleanButton.check();

        // Assert
        assertChecked(page, true);
    }

    @Test
    @Order(5)
    @DisplayName("SelectBooleanButton: GitHub #7963 icon only should have no default labels")
    void iconOnly(Page page) {
        // Arrange
        SelectBooleanButton selectBooleanButton = page.iconOnly;
        selectBooleanButton.setValue(false);
        assertFalse(selectBooleanButton.isSelected());
        assertEquals("Off", selectBooleanButton.getLabel());

        // Act
        selectBooleanButton.check();

        // Assert
        assertEquals("On", selectBooleanButton.getLabel());
        assertTrue(selectBooleanButton.isSelected());
    }

    @Test
    @Order(5)
    @DisplayName("SelectBooleanButton: GitHub #722 should have default labels")
    void defaultLabels(Page page) {
        // Arrange
        SelectBooleanButton selectBooleanButton = page.defaultLabels;
        selectBooleanButton.setValue(false);
        assertFalse(selectBooleanButton.isSelected());
        assertEquals("Off", selectBooleanButton.getLabel());

        // Act
        selectBooleanButton.check();

        // Assert
        assertEquals("On", selectBooleanButton.getLabel());
        assertTrue(selectBooleanButton.isSelected());
    }

    private void assertConfiguration(JSONObject cfg) {
        assertNoJavascriptErrors();
        System.out.println("SelectBooleanButton Config = " + cfg);
        assertEquals("Yes", cfg.getString("onLabel"));
        assertEquals("No", cfg.getString("offLabel"));
        assertEquals("pi pi-check", cfg.getString("onIcon"));
        assertEquals("pi pi-times", cfg.getString("offIcon"));
    }

    private void assertChecked(Page page, boolean checked) {
        SelectBooleanButton selectBooleanButton = page.selectBooleanButton;
        assertEquals(checked, selectBooleanButton.isSelected());
        Msg message = page.messages.getMessage(0);
        assertEquals(checked ? "Checked" : "Unchecked", message.getDetail());
        assertEquals(checked ? "Yes" : "No", selectBooleanButton.getLabel());
        assertConfiguration(selectBooleanButton.getWidgetConfiguration());
    }

    public static class Page extends AbstractPrimePage {

        @FindBy(id = "form:selectBooleanButton")
        SelectBooleanButton selectBooleanButton;

        @FindBy(id = "form:iconOnly")
        SelectBooleanButton iconOnly;

        @FindBy(id = "form:defaultLabels")
        SelectBooleanButton defaultLabels;

        @FindBy(id = "form:msgs")
        Messages messages;

        @FindBy(id = "form:submit")
        CommandButton submit;

        @Override
        public String getLocation() {
            return "selectbooleanbutton/selectBooleanButton001.xhtml";
        }
    }
}
