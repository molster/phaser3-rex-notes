import OverlapSizer from '../overlapsizer/OverlapSizer.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Sides extends OverlapSizer {
    constructor(scene, x, y, minWidth, minHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        }
        super(scene, x, y, minWidth, minHeight, config);
        this.type = 'rexSides';

        // Add elements        
        var background = GetValue(config, 'background', undefined);
        var panel = GetValue(config, 'panel', undefined);
        var leftSide = GetValue(config, 'left', undefined);
        var rightSide = GetValue(config, 'right', undefined);
        var topSide = GetValue(config, 'top', undefined);
        var bottomSide = GetValue(config, 'bottom', undefined);
        // Mask all children
        var maskEnable = GetValue(config, 'mask', false);

        if (background) {
            this.addBackground(background);
        }
        if (panel) {
            this.add(panel, 'panel', 'center', 0, true);
        }
        if (leftSide) {
            var expand = GetValue(config, 'expand.left', true);
            this.add(leftSide, 'leftSide', 'left-top', 0, { height: expand });
        }
        if (rightSide) {
            var expand = GetValue(config, 'expand.right', true);
            this.add(rightSide, 'rightSide', 'right-top', 0, { height: expand });
        }
        if (topSide) {
            var expand = GetValue(config, 'expand.top', true);
            this.add(topSide, 'topSide', 'left-top', 0, { width: expand });
        }
        if (bottomSide) {
            var expand = GetValue(config, 'expand.bottom', true);
            this.add(bottomSide, 'bottomSide', 'left-bottom', 0, { width: expand });
        }

        // Create mask of text object
        if (maskEnable) {
            this.childrenMask = new DefaultMask(this);
            var mask = this.childrenMask.createGeometryMask();
            if (panel) {
                panel.setMask(mask);
            }
            if (leftSide) {
                leftSide.setMask(mask);
            }
            if (rightSide) {
                rightSide.setMask(mask);
            }
            if (topSide) {
                topSide.setMask(mask);
            }
            if (bottomSide) {
                bottomSide.setMask(mask);
            }
            this.pin(this.childrenMask);
        }
    }

    get panel() {
        return this.sizerChildren.panel;
    }

    get leftSide() {
        return this.sizerChildren.leftSide;
    }

    get rightSide() {
        return this.sizerChildren.rightSide;
    }

    get topSide() {
        return this.sizerChildren.topSide;
    }

    get bottomSide() {
        return this.sizerChildren.bottomSide;
    }
}

export default Sides;