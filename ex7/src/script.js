import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'

/**
 * Debug
 */
const gui = new dat.GUI({
    width: 300,      // Taille du menu
    title: 'First dbug UI',
    closeFolders: true      // Ferme tout les dossiers par defaut
})

const debugObject = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#ff0000'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)    

const cubeTweaks_position = gui.addFolder('Position')      // Créer un dossier
const cubeTweaks_other = gui.addFolder('Other')

/**
 * GUI
 */
// Range
cubeTweaks_position.add(mesh.position, 'x', -3, 3, 0.01).name("rename(x)")
cubeTweaks_position.add(mesh.position, 'y', -3, 3, 0.01)
cubeTweaks_position.add(mesh.position, 'z', -3, 3, 0.01)

// CheckBox
cubeTweaks_other.add(mesh, 'visible').name('rename(x)')

// WireFrame
cubeTweaks_other.add(material, 'wireframe')

// Colors
cubeTweaks_other.addColor(debugObject, 'color').onChange((value) => {
    //console.log(value.getHexString())       // Valeur hexadecimal
    material.color.set(debugObject.color)       // Obtenir meme code hexadecimal
})

// Faire tourner objets
debugObject.spin = () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI *2 })
}
 
cubeTweaks_other.add(debugObject, 'spin')        // Ajouter un bouton qui appelle la fonction 'spin'
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()