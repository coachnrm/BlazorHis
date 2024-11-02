// window.initializeThreeJS = () => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     // Change the background color to white
//     renderer.setClearColor(0xffffff, 1); // 0xffffff is white, 1 is the alpha (opacity)
//     document.getElementById('threejs-container').appendChild(renderer.domElement).style.cursor = 'none';

//     const points = []; // Array to hold the points for drawing
//     const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
//     let line; // Variable to hold the current line object

//     const createLine = () => {
//         const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//         line = new THREE.Line(lineGeometry, lineMaterial);
//         scene.add(line);
//     };

//     camera.position.z = 5;

//     // Create a cursor (a small sphere)
//     const cursorGeometry = new THREE.SphereGeometry(0.05, 16, 16);
//     const cursorMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//     const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
//     scene.add(cursor);

//     // Function to update the line geometry
//     const updateLine = () => {
//         if (line) {
//             line.geometry.setFromPoints(points);
//             line.geometry.needsUpdate = true; // Notify Three.js that geometry has changed
//         }
//     };

//     // Mouse event handlers
//     const onMouseMove = (event) => {
//         // Calculate mouse position in normalized device coordinates (-1 to +1)
//         const mouse = new THREE.Vector2(
//             (event.clientX / window.innerWidth) * 2 - 1,
//             -(event.clientY / window.innerHeight) * 2 + 1
//         );

//         // Convert mouse position to 3D space
//         const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
//         vector.unproject(camera);
//         vector.sub(camera.position).normalize();

//         const distance = 5; // Set distance from the camera
//         const point = camera.position.clone().add(vector.multiplyScalar(distance)); // Calculate the point

//         // Update the cursor's position
//         cursor.position.copy(point);
        
//         // Add the point to the array and update the line only if drawing
//         if (drawing) {
//             points.push(point);
//             updateLine();
//         }
//     };

//     // Start a new drawing on mouse down and stop on mouse up
//     let drawing = false;

//     document.addEventListener('mousedown', () => {
//         if (!drawing) {
//             // If starting a new drawing session, reset points and create a new line
//             points.length = 0; // Clear previous points
//             createLine(); // Create a new line
//         }
//         drawing = true; // Start drawing
//     });

//     document.addEventListener('mouseup', () => {
//         drawing = false; // Stop drawing
//     });

//     document.addEventListener('mousemove', onMouseMove);

//     const animate = function () {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//     };
//     animate();


// };

// window.captureImage = async () => {
//     // Render the scene to a canvas
//     const canvas = document.createElement('canvas');
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(200, 200); // Set the size for the image
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000);
//     camera.position.z = 5;

//     // Create a line
//     const points = [];
//     points.push(new THREE.Vector3(-1, 0, 0));
//     points.push(new THREE.Vector3(1, 0, 0));

//     const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//     const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
//     const line = new THREE.Line(lineGeometry, lineMaterial);
//     scene.add(line);

//     // Render the scene
//     renderer.render(scene, camera);

//     // Convert the canvas to a data URL and return it
//     // return canvas.toDataURL('image/jpeg'); // return 
    
//     // Convert the canvas to a data URL
//     const dataUrl = canvas.toDataURL('image/jpeg');

//     // Create a link element to download the image
//     const link = document.createElement('a');
//     link.href = dataUrl;
//     link.download = 'captured-image.jpg'; // Set the filename for the download
//     document.body.appendChild(link); // Append the link to the document
//     link.click(); // Programmatically click the link to trigger the download
//     document.body.removeChild(link); // Remove the link after the download

//     return dataUrl; // Optionally return the data URL
// };

let points = []; // Global array to hold the points for drawing

window.initializeThreeJS = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Change the background color to white
    renderer.setClearColor(0xffffff, 1); // 0xffffff is white, 1 is the alpha (opacity)
    document.getElementById('threejs-container').appendChild(renderer.domElement).style.cursor = 'none';

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    let line; // Variable to hold the current line object

    const createLine = () => {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
    };

    camera.position.z = 5;

    // Create a cursor (a small sphere)
    const cursorGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const cursorMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
    scene.add(cursor);

    const updateLine = () => {
        if (line) {
            line.geometry.setFromPoints(points);
            line.geometry.needsUpdate = true; // Notify Three.js that geometry has changed
        }
    };

    const onMouseMove = (event) => {
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        vector.sub(camera.position).normalize();

        const distance = 5;
        const point = camera.position.clone().add(vector.multiplyScalar(distance));

        cursor.position.copy(point);
        
        if (drawing) {
            points.push(point);
            updateLine();
        }
    };

    let drawing = false;

    document.addEventListener('mousedown', () => {
        if (!drawing) {
            points.length = 0; // Clear previous points
            createLine(); // Create a new line
        }
        drawing = true; // Start drawing
    });

    document.addEventListener('mouseup', () => {
        drawing = false; // Stop drawing
    });

    document.addEventListener('mousemove', onMouseMove);

    const animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();
};

window.captureImage = async () => {
    // Create a new canvas
    const canvas = document.createElement('canvas');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Set the clear color to white
    renderer.setClearColor(0xffffff, 1); // 0xffffff is white, 1 is the alpha (opacity)

    // Create a new scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Copy the current lines from the main scene
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    // Render the scene
    renderer.render(scene, camera);

    // Convert the canvas to a data URL
    const dataUrl = canvas.toDataURL('image/jpeg');

    // Create a link element to download the image
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'captured-image.jpg'; // Set the filename for the download
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(link); // Remove the link after the download

    return dataUrl; // Optionally return the data URL
};

