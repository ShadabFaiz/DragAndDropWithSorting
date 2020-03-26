// ts-check
window.addEventListener('DOMContentLoaded', () => {
    const draggableElements = document.querySelectorAll('[draggable=true]');
    for (var i = 0; i < draggableElements.length; i++) {
        const element = draggableElements.item(i);
        element.addEventListener('dragstart', dragstart_handler);
        element.addEventListener('dragend', dragEndHandler);
        element.addEventListener('dragover', dragOverDraggable);
    }
});

/**
 *
 * @param {DragEvent} event
 */
function dragstart_handler(event) {
    event.dataTransfer.setData(
        'text/plain',
        `{ "x": ${event.offsetX}, "y": ${event.offsetY}, "id": "${event.target.id}" }`
    );

    setTimeout(() => {
        event.srcElement.class;
        event.srcElement.style.zIndex = -1;
        event.srcElement.style.opacity = 0.5;
    }, 0);
    event.dataTransfer.dropEffect = 'move';
}

function dragEnterHandler(event, dropzone) {
    event.stopPropagation();
    event.preventDefault();
    console.log(dropzone.dataset);
    if (dropzone.dataset.resizeable === 'true') {
        dropzone.classList.add('dropzone-hovered-resizeable');
    } else dropzone.classList.add('dropzone-hovered');
}

/**
 *
 * @param { DragEvent } event
 */
function dropHandler(event, dropzone, position) {
    const droppZoneCurrentHeight = dropzone.offsetHeight;
    event.preventDefault();

    if (isDropElementFile(event)) {
        var dt = event.dataTransfer;
        var files = dt.files;

        var count = files.length;
        console.log(dt, files, count);
        return;
    }

    this.removeDroppableIndicatorLayer(dropzone);
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));

    let element;
    if (position === 'absolute') {
        element = setDroppableToAbsolute(event);
    } else {
        element = document.getElementById(data.id);
        element.style.position = 'relative';
    }
    try {
        event.target.appendChild(element);
    } catch (error) {}
}

function setDroppableToAbsolute(event) {
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    const element = document.getElementById(data.id);
    element.style.position = 'absolute';
    element.style.top = event.offsetY + 'px';
    element.style.left = event.offsetX + 'px';
    element.style.transform = `translate(-${data.x + 6}px, -${data.y + 6}px)`;
    return element;
}

function removeDroppableIndicatorLayer(dropzone) {
    if (dropzone.dataset.resizeable === 'true')
        dropzone.classList.remove('dropzone-hovered-resizeable');
    else dropzone.classList.remove('dropzone-hovered');
}

function isDropElementFile(event) {
    return event.dataTransfer.types.includes('Files');
}

/**
 *
 * @param {*} event
 * @param {HTMLElement} element
 */

function dragoverHandler(event, element) {
    const backgroundColor = element.style.background;
    event.preventDefault();
    event.stopPropagation();
    return false;
}

function dragOverDraggable(event) {
    console.log(`dragging over draggable`);
    console.log(event);
}

var droppableElement;
function createDropIndictorLayer() {
    if (droppableElement) {
        return droppableElement;
    }
    droppableElement = document.createElement('div');
    droppableElement.id = 'droppableLayer';
    droppableElement.style.background = '#a9a9a963';
    droppableElement.style.position = 'absolute';
    droppableElement.style.left = 0;
    droppableElement.style.right = 0;
    droppableElement.style.top = 0;
    droppableElement.style.bottom = 0;

    return droppableElement;
}

function dragEndHandler(event) {
    event.srcElement.style.opacity = 1;
    event.srcElement.style.zIndex = 1;
}
