'use strict'

export default class Slider {
    constructor(options = {}) {
        this.backgroundColor = options.backgroundColor || '#dddddd88';
        this.stickColor = options.stickColor || '#4455aa';
        this.width = options.width || 10;
        this._scrollables = document.querySelectorAll('[scrollable="true"]');

        this._implement();
    }

    get backgroundColor() { return this._backgroundColor; }
    set backgroundColor(value) { this._backgroundColor = value; }

    get stickColor() { return this._stickColor; }
    set stickColor(value) { this._stickColor = value; }

    get width() { return this._width; }
    set width(value) { this._width = value; }

    get _scrollables() { return this.__scrollables; }
    set _scrollables(objects) { this.__scrollables = objects; }

    _implement() {
        for (let scrollable of this._scrollables) {
            let slider = this._createScrollbar();

            this._initProperties(scrollable);
            scrollable.appendChild(slider.scrollbar);

            slider.stick.onmousedown = e => {
                scrollable.style.userSelect = 'none';

                window.onmousemove = e2 => {
                    let stickScrollTo = e2.pageY - scrollable.offsetTop - e.layerY;
                    
                    if (stickScrollTo >= 0 && stickScrollTo <= scrollable.clientHeight - slider.stick.clientHeight) {
                        let stickPer = (100 * stickScrollTo) / scrollable.clientHeight;
                        let scrollableScrollTo = ((scrollable.scrollHeight - scrollable.clientHeight) / 100) * stickPer;
                        
                        slider.scrollbar.style.top = scrollableScrollTo + 'px';
                        slider.stick.style.top = stickScrollTo + 'px';
                        scrollable.scrollTop = scrollableScrollTo;
                    }
                };
            };

            window.onmouseup = e => {
                scrollable.style.userSelect = 'initial';
                window.onmousemove = null
            };

            slider.stick.onmouseenter = e => slider.stick.style.opacity = 0.8;
            slider.stick.onmouseleave = e => slider.stick.style.opacity = 1;
        }
    }

    _initProperties(scrollable) {
        if (scrollable.style.position === '')
            scrollable.style.position = 'relative';

        scrollable.style.overflow = 'hidden';
        scrollable.style.paddingRight = (Number(scrollable.style.paddingRight) + this.width * 2) + 'px';
    }

    _createScrollbar() {
        let scrollbar = document.createElement('div');
        let stick = document.createElement('div');
        
        scrollbar.style.position = 'absolute';
        scrollbar.style.top = '0px';
        scrollbar.style.right = this.width + 'px';
        scrollbar.style.width = '1px';
        scrollbar.style.height = '100%';
        scrollbar.style.backgroundColor = this.backgroundColor;

        stick.style.position = 'absolute';
        stick.style.top = '0px'; 
        stick.style.left = -(this.width / 2) + 'px';
        stick.style.width = this.width + 'px';
        stick.style.height = (this.width * 2) + 'px';
        stick.style.backgroundColor = this.stickColor;
        stick.style.boxShadow = '1px 1px 5px #00000055';
        stick.style.borderRadius = this.width + 'px';
        stick.style.cursor = 'pointer';
        // stick.style.transition = '0.05s';

        scrollbar.appendChild(stick);

        return {
            scrollbar: scrollbar,
            stick: stick
        };
    }
}