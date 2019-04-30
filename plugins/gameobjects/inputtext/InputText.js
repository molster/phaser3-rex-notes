const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class InputText extends DOMElement {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        }
        if (config === undefined) {
            config = {};
        }
        var autoRound = scene.scale.autoRound;
        if (width !== undefined) {
            if (autoRound) {
                width = Math.floor(width);
            }
            config.width = width + 'px';
        }
        if (height !== undefined) {
            if (autoRound) {
                height = Math.floor(height);
            }
            config.height = height + 'px';
        }

        var element;
        var textType = GetValue(config, 'type', 'text');
        if (textType === 'textarea') {
            element = document.createElement("textarea");
            element.style.resize = 'none';
        } else {
            element = document.createElement("input");
            element.type = textType;
        }

        // Apply registed style properties
        var elemProp, elemPropValue;
        for (var key in ElementProperties) {
            elemProp = ElementProperties[key];
            elemPropValue = GetValue(config, key, elemProp[1]);
            if (elemPropValue !== undefined) {
                element[elemProp[0]] = elemPropValue;
            }
        }

        var style = GetValue(config, 'style', undefined);
        if (style === undefined) {
            style = {};
        }
        // Apply registed style properties
        var styleProp, stylePropValue;
        for (var key in StyleProperties) {
            styleProp = StyleProperties[key];
            stylePropValue = GetValue(config, key, styleProp[1]);
            if (stylePropValue !== undefined) {
                style[styleProp[0]] = stylePropValue;
            }
        }
        // Apply other style properties
        var elementStyle = element.style;
        for (var key in config) {
            if ((key in ElementProperties) || (key in StyleProperties)) {
                continue;
            } else if (key in elementStyle) {
                style[key] = config[key];
            }
        }
        style['box-sizing'] = 'border-box';
        super(scene, x, y, element, style);
        this.type = 'rexInputText';
    }

    get text() {
        return this.node.value;
    }

    set text(value) {
        this.node.value = value;
    }

    setText(value) { // Override
        this.text = value;
        return this;
    }

    get placeholder() {
        return this.node.placeholder;
    }

    set placeholder(value) {
        this.node.placeholder = value;
    }

    setPlaceholder(value) {
        this.placeholder = value;
        return this;
    }

    get tooltip() {
        return this.node.title;
    }

    set tooltip(value) {
        this.node.title = value;
    }

    setTooltip(value) {
        this.tooltip = value;
        return this;
    }

    get readOnly() {
        return this.node.readOnly;
    }

    set readOnly(value) {
        this.node.readOnly = value;
    }

    setReadOnly(value) {
        if (value === undefined) {
            value = true;
        }
        this.readOnly = value;
        return this;
    }

    setStyle(key, value) {
        this.node.style[key] = value;
        return this;
    }

    scrollToBottom() {
        this.node.scrollTop = this.node.scrollHeight;
        return this;
    }
}

const ElementProperties = {
    text: ['value', undefined],
    placeholder: ['placeholder', undefined],
    tooltip: ['title', undefined],
    readOnly: ['readOnly', false],
    onTextChanged: ['oninput', undefined],
};

const StyleProperties = {
    width: ['width', undefined],
    height: ['height', undefined],
    fontSize: ['font-size', undefined],
    color: ['color', '#ffffff'],
    backgroundColor: ['backgroundColor', 'transparent'],
    borderColor: ['borderColor', 'transparent']
};
export default InputText;