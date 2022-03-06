
export function brokeNodes(nodes) {
    nodes.forEach( (button, index) => {
        fallDown(button, {  
            y: 180 * Math.random(),
            x: 60 * Math.random(),
            angle: 400 * Math.random(),
            speed: 2 + 2 * Math.random(),
            side: index % 2,
            height: 600,
            rotation: 20 * (Math.random() - 0.5),
        });
    });
}

function fallDown(element, options) {
    const begins = {
        x: element.offsetLeft,
        y: element.offsetTop
    }

    let rotate = options.rotation;

    element.style.position = 'fixed';

    element.style.left = begins.x + 'px';
    element.style.top = begins.y + 'px';
    element.style.transition = 'none';

    function timeLap() {    
        if(element.offsetTop > begins.y + options.height) {
            element.style.visibility = 'hidden';
            return;
        }
    
        element.style.left = element.offsetLeft + (options.side ? 1 : -1) * options.speed + 'px';
        element.style.top = begins.y + getY((options.side ? 1 : -1) * (element.offsetLeft - begins.x), options)  + 'px';
    
        element.style.transform = `rotate(${ rotate }deg)`;
        rotate += options.rotation;

        setTimeout( () => {
            timeLap();
        }, options.speed );
    }
    
    timeLap();
}

function getY(x, options) {
    return Math.pow(( x - options.x), 2) / options.angle - options.y;
}