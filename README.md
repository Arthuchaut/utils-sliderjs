# SliderJs

SliderJs is a small utility that allows you to customize scrollbars, compatible with most recent browsers.

## Getting started

The implementation of this utility is done in 2 steps.

### 1. In the HTML code

First, you have to declare the elements you want "scrollable" with the XML attribute "scrollable="true".

Example :

```html
<section scrollable="true">
    <div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>

    <div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
</section>
```

### 2. In the JS code

Import the utility into your JS script (previously declared in the desired HTML file).

```javascript
import Slider from <PATH_TO_THE_LIB>
```

Then, instanciate Slider.

```javascript
let slider = new Slider();
```

That's all ! :)

## Documentation

### Personalization

You can customize the scrollbar design.

Here are the properties concerned:

`backgroundColor`: The color of the background bar
`stickColor`: The color of the `stick`
`width`: The width of the `stick`

**NB:** It is possible to initialize `Slider` with the 3 properties presented.

```javascript
let options = {
    backgroundColor: '#8822aa22',
    stickColor: '#8822aa',
    width: 10
};

let slider = new Slider(options);
```