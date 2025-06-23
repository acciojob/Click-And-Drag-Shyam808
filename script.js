const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selected = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  // Make each cube position absolute within container
  const rect = cube.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();

  cube.style.position = 'absolute';
  cube.style.left = rect.left - parentRect.left + container.scrollLeft + 'px';
  cube.style.top = rect.top - parentRect.top + 'px';

  cube.addEventListener('mousedown', (e) => {
    selected = cube;

    const cubeRect = cube.getBoundingClientRect();
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    // Bring to front
    cube.style.zIndex = 1000;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});

function onMouseMove(e) {
  if (!selected) return;

  const parentRect = container.getBoundingClientRect();

  let newLeft = e.clientX - parentRect.left - offsetX + container.scrollLeft;
  let newTop = e.clientY - parentRect.top - offsetY;

  // Constrain inside container
  const cubeWidth = selected.offsetWidth;
  const cubeHeight = selected.offsetHeight;
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  newLeft = Math.max(0, Math.min(container.scrollWidth - cubeWidth, newLeft));
  newTop = Math.max(0, Math.min(containerHeight - cubeHeight, newTop));

  selected.style.left = newLeft + 'px';
  selected.style.top = newTop + 'px';
}

function onMouseUp() {
  if (selected) {
    selected.style.zIndex = '';
  }
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  selected = null;
}
