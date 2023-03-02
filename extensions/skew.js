(function (ext) {
  // Define block and its behavior for skewing the sprite
  ext.skew = function (angleX, angleY) {
    // Skew the sprite by the specified angles
    var skewX = Math.tan(angleX * Math.PI / 180);
    var skewY = Math.tan(angleY * Math.PI / 180);
    var style = "skew(" + skewX + "rad," + skewY + "rad)";
    ScratchExtensions.runtime._sprite.style.transform = style;
  };

  // Block and descriptor for skewing the sprite
  var descriptor = {
    blocks: [
      [' ', 'Skew the sprite by X: %n Y: %n', 'skew', 0, 0],
    ],
  };

  // Register the extension
  ScratchExtensions.register('skew', descriptor, ext);
})({});
