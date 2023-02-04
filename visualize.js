(function(ext) {
    var scene, camera, renderer, mesh;

// Cleanup function when the extension is unloaded
ext._shutdown = function() {
    renderer.domElement.remove();
    scene = camera = renderer = mesh = null;
};

// Status reporting code
// Use this to report missing hardware, plugin or unsupported browser
ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
};

// Block and block menu descriptions
var descriptor = {
    blocks: [
        // Block type, block name, function name, param1 default value
        [' ', 'visualize sound', 'visualizeSound']
    ],
    url: 'http://scratchx.org/'
};

// Register the extension
ScratchExtensions.register('Sound Visualizer', descriptor, ext);

// Block functions
ext.visualizeSound = function() {
    // Create a scene
    scene = new THREE.Scene();

    // Create a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a mesh
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animate the mesh
    var animate = function() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    animate();
};
})({});
