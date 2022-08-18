import barba from "https://unpkg.com/@barba/core@2.9.7/dist/barba.mjs";
import barbaCss from "https://unpkg.com/@barba/css@2.1.15/dist/barba-css.mjs";
//Run animation

const tlLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});
const tlEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

//Fonctions pour les timelines
const leaveAnimation = (current, done, gradient) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");

  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    tlLeave.fromTo(
      product,
      { y: 0, opacity: 1 },
      { y: 100, opacity: 0, onComplete: done },
      "<"
    ),
    tlLeave.fromTo(text, { y: 0, opacity: 1 }, { opacity: 0, y: 100 }, "<"),
    tlLeave.fromTo(
      circles,
      { y: 0, opacity: 1 },
      {
        y: -200,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};
const enterAnimation = (current, done, gradient) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");

  return (
    tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
    tlEnter.to("body", { background: gradient }, "<"),
    tlEnter.fromTo(
      product,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, onComplete: done },
      "<"
    ),
    tlEnter.fromTo(text, { y: -100, opacity: 0 }, { opacity: 1, y: 0 }, "<"),
    tlEnter.fromTo(
      circles,
      { y: -200, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, ease: "back.out(1.7)", duration: 1 },
      "<"
    )
  );
};

barba.init({
  preventRunning: true,
  transitions: [
    {
      name: "default",
      once(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        gsap.set("body", { background: gradient });
        enterAnimation(next, done, gradient);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        leaveAnimation(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        enterAnimation(next, done, gradient);
      },
    },
    //Product page animation
    {
        name: 'product-transition',
        sync: true,
        from: {namespace: ['chair', 'product']},
        to: {namespace: ['product', 'chair']},
        enter(data) {
             const done = this.async();
             let next = data.next.container;
             productEnterAnimation(next, done)
        },
        leave(data) {
            const done = this.async
            let current = data.current.container;
            productLeaveAnimation(current, done)
        }
    },
    {
        name: 'product-transition',
        sync: true,
        from: {namespace: ['sofa', 'product']},
        to: {namespace: ['product', 'sofa']},
        enter(data) {
             const done = this.async();
             let next = data.next.container;
             productEnterAnimation(next, done)
        },
        leave(data) {
            const done = this.async
            let current = data.current.container;
            productLeaveAnimation(current, done)
        }
    },
    {
        name: 'product-transition',
        sync: true,
        from: {namespace: ['lamp', 'product']},
        to: {namespace: ['product', 'lamp']},
        enter(data) {
             const done = this.async();
             let next = data.next.container;
             productEnterAnimation(next, done)
        },
        leave(data) {
            const done = this.async
            let current = data.current.container;
            productLeaveAnimation(current, done)
        }
    },
  ],
});

//Changing gradient on showcase

function getGradient(name) {
  switch (name) {
    case "sofa":
      return "linear-gradient(260deg, #a9f076, #ac430e)";
    case "lamp":
      return "linear-gradient(260deg, #a3beb9, #010101)";
    case "chair":
      return "linear-gradient(260deg,  #ffdd7e, #b6b6b6)";
  }
}


//Product enter
const productEnterAnimation = (next, done) => {
    tlEnter.fromTo(next, {y: '100%'}, {y:'0%'})
    tlEnter.fromTo('.card', {opacity: 0, y:50}, {opacity:1, y:0, stagger: 0.1, onComplete: done})
}

//Product leave
const productLeaveAnimation = (current, done) => {
    tlLeave.fromTo(current, {y: '0%'}, {y: '100%', onComplete: done})
}