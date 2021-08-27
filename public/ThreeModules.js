var threeLoaded = false;

var THREE = null;

if (!threeLoaded) {
    THREE = await import ('https://cdn.skypack.dev/three@latest');
    threeLoaded = true;
}

export { THREE }