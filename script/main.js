const navbar = document.querySelector("#nav-bar")
const footer = document.querySelector("#footer")
const footerBackground = footer.querySelector(".bg")
const bgPhoto1 = document.querySelector("#bg-photo-1 div")
const bgPhoto2 = document.querySelector("#bg-photo-2 div")
const bgPhoto3 = document.querySelector("#bg-photo-3 div")
let vh = 0
let scrollLimit = 0
const parallaxForce = 40

let photoFooterActivated = false
let currentPhoto = 0
let photoStep = 0

// https://css-tricks.com/styling-based-on-scroll-position/
;(function () {
    const debounce = (fn) => {
        let frame
        return (...params) => {
            if (frame) {
                cancelAnimationFrame(frame)
            }
            frame = requestAnimationFrame(() => {
                fn(...params)
            });

        }
    };
    const storeScroll = () => {
        onScroll(window.scrollY)
    }
    document.addEventListener('scroll', debounce(storeScroll), {
        passive: true
    });
    storeScroll()
})();

// ----------------------------

function onScroll(scrollY) {
    if(scrollY > 420) {
        navbar.classList.add("with-title")
    } else {
        navbar.classList.remove("with-title")
    }
    if((window.innerHeight + scrollY) >= document.body.offsetHeight) {
        navbar.classList.add("without-background")
        footer.classList.add("with-photo")
        photoReset(true)
        photoFooterActivated = true
    } else {
        navbar.classList.remove("without-background")
        footer.classList.remove("with-photo")
        footerBackground.classList.remove("forced-background")
        photoFooterActivated = false
        photoReset(false)
    }

    vh = document.documentElement.clientHeight
    scrollLimit = document.documentElement.offsetHeight - vh

    parallaxSlider(scrollY, parallaxForce, bgPhoto1)
    parallaxSlider(scrollY, parallaxForce, bgPhoto2)
    parallaxSlider(scrollY, parallaxForce, bgPhoto3)
}

function parallaxSlider(scrollY, marge, element) {
    let progress = scrollY * 100 / scrollLimit
    let diff = vh * marge / 100
    let y = (progress * diff / 100)
    element.setAttribute("style", "background-position-y: " + Math.round(-y) + "px")
}

// ----------------------------

let photoList = [
    ["/static/img11.jpg", true],
    ["/static/img5.jpg", false],
    ["/static/img9.jpg", true],
    ["/static/img10.jpg", true],
    ["/static/img6.jpg", true],
    ["/static/img1.jpg", false]
]
function photoDefilement() {
    if(photoFooterActivated) {
        if(photoStep == 0) {           // Retirer le background noir et laisser afficher la photo
            photoStep = 1
            footer.classList.remove("forced-background")
            setTimeout(photoDefilement, 5000)
        } else if(photoStep == 1) {    // afficher le background noir
            photoStep = 2
            footer.classList.add("forced-background")
            setTimeout(photoDefilement, 1200)
        } else if(photoStep == 2) {    // Changer la photo
            photoStep =  0
            currentPhoto++
            currentPhoto = photoList[currentPhoto] ? currentPhoto : 0
            footerBackground.setAttribute("style", "background-image: url(" + photoList[currentPhoto][0] + ")" + (photoList[currentPhoto][1] ? ";background-position: center" : ""))
            setTimeout(photoDefilement, 1200)
        }
    } else {
        photoReset()
        setTimeout(photoDefilement, 3000)
    }
}

function photoReset(bg = true) {
    currentPhoto = 0
    photoStep = 0
    if(bg) {
        footerBackground.removeAttribute("style")
    }
}

photoDefilement()

// ----------------------------

// document.querySelectorAll("#contact input, #contact textarea").forEach(element => {
//     element.addEventListener("focus", function (e) {
//         document.location.hash = "#contact"
//         return true
//     }, true)
// })