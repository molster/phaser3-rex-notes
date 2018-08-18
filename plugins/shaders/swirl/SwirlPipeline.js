import frag from './swirl-frag.js';

const TextureTintPipeline = Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;
const GetValue = Phaser.Utils.Objects.GetValue;

class SwirlPipeline extends TextureTintPipeline {
    constructor(scene, key, config) {
        var game = scene.game;
        super({
            game: game,
            renderer: game.renderer,
            fragShader: frag // GLSL shader
        });
        this._width = 0; // width wo resolution
        this._height = 0; // height wo resolution
        this._centerX = 0; // position wo resolution
        this._centerY = 0; // position wo resolution
        this._radius = 0;
        this._rotation = 0;

        game.renderer.addPipeline(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.radius = GetValue(o, 'radius', 0);
        var rotation = GetValue(o, 'rotation', undefined);
        if (rotation === undefined) {
            this.angle = GetValue(o, 'angle', 0);
        } else {
            this.rotation = rotation;
        }
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        return this;
    }

    // radius
    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
        this.setFloat1('radius', value);
    }

    setRadius(value) {
        this.radius = value;
        return this;
    }

    // rotation
    get rotation() {
        return this._rotation;
    }

    set rotation(value) {
        this._rotation = value;
        this.setFloat1('angle', value);
    }

    setRotation(value) {
        this.rotation = value;
        return this;
    }

    get angle() {
        return RadToDeg(this.rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(value) {
        this.angle = value;
        return this;
    }

    // center
    get centerX() {
        return this._centerX;
    }

    set centerX(x) {
        this._centerX = x;
        this.setFloat1('center_x', x * this.resolution);
    }

    get centerY() {
        return this._centerY;
    }

    set centerY(y) {
        this._centerY = y;
        this.setFloat1('center_y', y * this.resolution);
    }

    setCenter(x, y) {
        if (x === undefined) {
            x = this._width / 2;
            y = this._height / 2;
        }
        this.centerX = x;
        this.centerY = y;
        return this;
    }

    // size
    resize(width, height, resolution) {
        this._width = width;
        this._height = height;
        super.resize(width, height, resolution);
        this.setFloat1('rt_w', this.width);
        this.setFloat1('rt_h', this.height);
        return this;
    }
}

export default SwirlPipeline;