# Barcode

Barcode component is used to display various barcode formats.

## Info

| Name | Value |
| --- | --- |
| Tag | barcode
| Component Class | org.primefaces.component.barcode.Barcode
| Component Type | org.primefaces.component.Barcode
| Component Family | org.primefaces.component |
| Renderer Type | org.primefaces.component.BarcodeRenderer
| Renderer Class | org.primefaces.component.barcode.BarcodeRenderer

## Attributes

| Name | Default | Type | Description |
| --- | --- | --- | --- |
| id | null | String | Unique identifier of the component
| rendered | true | Boolean | Boolean value to specify the rendering of the component, when set to false component will not be rendered.
| binding | null | Object | An el expression that maps to a server side UIComponent instance in a backing bean
| alt | null | String | Alternate text for the image
| cache | true | Boolean | Controls browser caching mode of the resources.
| dir | null | String | Direction of the text displayed
| format | svg | String | Format of the generated barcode, valid values are "svg" (default) and "png".
| height | null | String | Height of the image
| hrp | bottom | String | The barcode human readable placement of text either "none", "top", or "bottom".
| ismap | false | Boolean | Specifies to use a server-side image map
| lang | null | String | Language code
| magnification | 2.0 | Double | The magnification factor of the barcode.
| onclick | null | String | onclick DOM event handler
| ondblclick | null | String | ondblclick DOM event handler
| onkeydown | null | String | onkeydown DOM event handler
| onkeypress | null | String | onkeypress DOM event handler
| onkeyup | null | String | onkeyup DOM event handler
| onmousedown | null | String | onmousedown DOM event handler
| onmousemove | null | String | onmousemove DOM event handler
| onmouseout | null | String | onmouseout DOM event handler
| onmouseover | null | String | onmouseover DOM event handler
| onmouseup | null | String | onmouseup DOM event handler
| orientation | 0 | Integer | Orientation in terms of angle. (0, 90, 180, 270)
| qrErrorConnection | L | String | The QR Code error correction level. L (default) - up to 7% damage. M - up to 15% damage. Q - up to 25% damage. H - up to 30% damage
| quietZoneHorizontal | 10 | Integer | The horizontal quiet zone of the barcode in pixels.
| quietZoneVertical | 1 | Integer | The vertical quiet zone of the barcode in pixels.
| style | null | String | Style of the image
| styleClass | null | String | Style class of the image
| title | null | String | Title of the image
| type | null | String | Type of the barcode.
| url | null | String | Alias to value attribute
| usemap | null | String | Name of the client side map
| value | null | Object | Binary data to stream or context relative path.
| width | null | String | Width of the image

## Getting started with Barcode
Barcode type should be provided along with the value to display. Supported formats are;

- int2of5
- codabar
- code39
- code128
- ean8
- ean13
- upca
- postnet
- pdf417
- datamatrix
- qr

```xhtml
<p:barcode value="0123456789" type="int2of5" />
```

Value can also be retrieved from a backend value.

```xhtml
<p:barcode value="#{bean.barcodeValue}" type="int2of5" />
```
## Format
Default display format is _svg_ and other possible option is _png_. In case the client browser does not
support svg e.g. IE8, barcode automatically chooses png format.

```xhtml
<p:barcode value="#{bean.barcodeValue}" type="int2of5" format="png" />
```
## Orientation
In order to change the orientation, choose the angle from the 4 pre-defined values.

```xhtml
<p:barcode value="#{bean.barcodeValue}" type="int2of5" orientation="90"/>
```
## Dependencies
Barcode component uses **Okapi** library underneath to generate barcodes. The following version is supported officially.

```xml
<dependency>
    <groupId>uk.org.okapibarcode</groupId>
    <artifactId>okapibarcode</artifactId>
    <version>0.5.0</version>
</dependency>
```