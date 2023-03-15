(function(ext) {
    // define the camera object
    var camera = {
        x: 0,
        y: 0,
        z: 0,
        pitch: 0,
        yaw: 0,
        fov: 60
    };

    // define the cube object
    var cube = {
        vertices: [
            [-1, -1, -1],
            [1, -1, -1],
            [1, 1, -1],
            [-1, 1, -1],
            [-1, -1, 1],
            [1, -1, 1],
            [1, 1, 1],
            [-1, 1, 1]
        ],
        faces: [
            [0, 1, 2, 3],
            [1, 5, 6, 2],
            [5, 4, 7, 6],
            [4, 0, 3, 7],
            [3, 2, 6, 7],
            [4, 5, 1, 0]
        ]
    };

    // define the triangle object
    var triangle = {
        vertices: [
            [0, 1, 0],
            [-1, -1, 0],
            [1, -1, 0]
        ],
        faces: [
            [0, 1, 2]
        ]
    };

    // define a function to add custom 3D models
    ext.addModel = function(name, vertices, faces) {
        ext[name] = { vertices: vertices, faces: faces, x: 0, y: 0, z: 0 };
    };

    // define a function to draw a 3D model
    ext.drawModel = function(model) {
        var vertices = model.vertices;
        var faces = model.faces;

        // translate the model to its position
        var x = model.x;
        var y = model.y;
        var z = model.z;
        for (var i = 0; i < vertices.length; i++) {
            vertices[i][0] += x;
            vertices[i][1] += y;
            vertices[i][2] += z;
        }

        for (var i = 0; i < faces.length; i++) {
            var face = faces[i];
            var point1 = vertices[face[0]];
            var point2 = vertices[face[1]];
            var point3 = vertices[face[2]];

            // apply perspective projection
            var scale = Math.tan(camera.fov / 2 * Math.PI / 180);
            var x1 = point1[0] - camera.x;
            var y1 = point1[1] - camera.y;
            var z1 = point1[2] - camera.z;
            var x2 = point2[0] - camera.x;
            var y2 = point2[1] - camera.y;
            var z2 = point2[2] - camera.z;
            var x3 = point3[0] - camera.x;
            var y3 = point3[1] - camera.y;
            var z3 = point3[2] - camera.z;
            var sx1 = x1 / z1 * scale;
            var sy1 = y1 / z1 * scale;
            var sx2 = x2 / z2 * scale;
            var sy2 = y2 / z2 * scale;
            var sx3 = x3 / z3 * scale;
            var sy3 = y3 / z3 * scale;
            // rotate the points around the camera
            var pitch = camera.pitch * Math.PI / 180;
            var yaw = camera.yaw * Math.PI / 180;
            var cos_pitch = Math.cos(pitch);
            var sin_pitch = Math.sin(pitch);
            var cos_yaw = Math.cos(yaw);
            var sin_yaw = Math.sin(yaw);
            var sx1p = sx1 * cos_yaw - sy1 * sin_yaw;
            var sy1p = sx1 * sin_yaw + sy1 * cos_yaw;
            var sx2p = sx2 * cos_yaw - sy2 * sin_yaw;
            var sy2p = sx2 * sin_yaw + sy2 * cos_yaw;
            var sx3p = sx3 * cos_yaw - sy3 * sin_yaw;
            var sy3p = sx3 * sin_yaw + sy3 * cos_yaw;
            var sx1pp = sx1p * cos_pitch + sz1 * sin_pitch;
            var sz1p = -sx1p * sin_pitch + sz1 * cos_pitch;
            var sx2pp = sx2p * cos_pitch + sz2 * sin_pitch;
            var sz2p = -sx2p * sin_pitch + sz2 * cos_pitch;
            var sx3pp = sx3p * cos_pitch + sz3 * sin_pitch;
            var sz3p = -sx3p * sin_pitch + sz3 * cos_pitch;

            // scale and translate the points to the canvas
            var canvas_x = (sx1pp + 1) * canvas.width / 2;
            var canvas_y = (-sy1p + 1) * canvas.height / 2;
            context.moveTo(canvas_x, canvas_y);
            canvas_x = (sx2pp + 1) * canvas.width / 2;
            canvas_y = (-sy2p + 1) * canvas.height / 2;
            context.lineTo(canvas_x, canvas_y);
            canvas_x = (sx3pp + 1) * canvas.width / 2;
            canvas_y = (-sy3p + 1) * canvas.height / 2;
            context.lineTo(canvas_x, canvas_y);
            context.closePath();
            context.stroke();
        }
    };

    // define a function to change the position of a model
    ext.setModelPosition = function(name, x, y, z) {
        ext[name].x = x;
        ext[name].y = y;
        ext[name].z = z;
    };

    // define a function to set the camera position and orientation
    ext.setCameraPosition = function(x, y, z, pitch, yaw, fov) {
        camera.x = x;
        camera.y = y;
        camera.z = z;
        camera.pitch = pitch;
        camera.yaw = yaw;
        camera.fov = fov;
    };

    // define the block types
    var descriptor = {
        blocks: [
            [' ', 'add model %s with vertices %s and faces %s', 'addModel', 'myModel', '[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]]', '[[0,1,2,3],[1,5,6,2],[5,4,7,6],[4,0,3,7],[3,2,6,7],[            ['4,5,6,7]]'],
            [' ', 'set model %s position x: %n y: %n z: %n', 'setModelPosition', 'myModel', 0, 0, 0],
            [' ', 'set camera position x: %n y: %n z: %n pitch: %n yaw: %n fov: %n', 'setCameraPosition', 0, 0, 0, 0, 0, 90],
        ]
    };

    // register the extension
    ScratchExtensions.register('3D Blocks', descriptor, ext);
})();
