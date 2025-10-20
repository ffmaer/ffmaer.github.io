class CanvasXY {
    static xy() {
        let point = {
            x: 0,
            y: 0
        };
        let matrix = turtle_tree.canvas.getContext('2d').getTransform()
        let transformedPoint = {
            x: matrix.a * point.x + matrix.c * point.y + matrix.e,
            y: matrix.b * point.x + matrix.d * point.y + matrix.f,
        }
        return transformedPoint
    }
    static get x() {

        return this.xy().x
    }

    static get y() {
        return this.xy().y
    }
};