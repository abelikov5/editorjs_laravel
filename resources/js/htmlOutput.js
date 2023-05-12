import { convertToHex, make } from '@/Pages/utilities/editorUtility.js';
// import {copyClipboard, makePassword} from '@/Pages/utilities/helpers.js'
// import lessonPool from '@/lesson/lessonPool.vue';
// import lessonPoolQuiz from '@/lesson/lessonPoolQuiz.vue';

// base classes for school content container
const schoolDefault = ['w-full', 'mx-auto',]

const code_decoration = ['rounded','dark:bg-gray-100','bg-gray-200','text-[#7b4c4c]', 'shadow'];
// const schoolDefault = ['xl:w-2/3', 'w-full', 'mx-auto',]

function getClasses(obj) {
    let classArray = [];
    if (typeof obj.class === 'undefined') {
        return null;
    } else {
        if (obj.stretched !== undefined && obj.stretched === true) {
            classArray = obj.class.join(' ');
        } else {
            classArray = schoolDefault.concat(obj.class.filter((item) => schoolDefault.indexOf(item) < 0)).join(' ');
        }
        return classArray;
    }
}

function convertCamelStylesToString(obj, objKey = 'style') {
    // console.log('obj styles: ', obj);

    if (typeof obj[objKey] == 'undefined') {
        // console.log('no style: ', typeof obj[objKey]);
        return null;
    } else {
        let str = '';
        if (Object.keys(obj[objKey]).length !== 0) {
            for (let key in obj[objKey]) {

                str += `${key.replace(/[A-Z]/g, "-$&").toLowerCase()}: ${obj[objKey][key].replace(/[A-Z]/g, "-$&").toLowerCase()}; `;
            }
        }
        return str;
    }
}

function makeHeader(obj) {
    let output = '';
    switch (obj.data.level) {
        case 1 :
            return output = `<h${obj.data.level} class="${getClasses(obj.data)} text_accent" style="${convertCamelStylesToString(obj.data)}">${obj.data.text}</h${obj.data.level}>`
            break;
        case 2 :
            return output = `<h${obj.data.level} class="${getClasses(obj.data)} text_accent" style="${convertCamelStylesToString(obj.data)}">${obj.data.text}</h${obj.data.level}>`
            break;
        case 3 :
            return output = `<h${obj.data.level} class="${getClasses(obj.data)} text_accent" style="${convertCamelStylesToString(obj.data)}">${obj.data.text}</h${obj.data.level}>`
            break;
        case 4 :
            return output = `<h${obj.data.level} class="${getClasses(obj.data)} text_accent" style="${convertCamelStylesToString(obj.data)}">${obj.data.text}</h${obj.data.level}>`
            break;
        case 5 :
            return output = `<h${obj.data.level} class="${getClasses(obj.data)} text_accent" style="${convertCamelStylesToString(obj.data)}">${obj.data.text}</h${obj.data.level}>`
            break;
        case 6 :
            return output = `<h${obj.data.level} class="${getClasses(obj.data)}" style="${convertCamelStylesToString(obj.data)}">${obj.data.text}</h${obj.data.level}>`
            break;
    }
};


function makeImage(obj) {
    // console.log('IMG 70 13/01', obj)

    const caption = obj.data.captionBlock ? obj.data.captionBlock.text : '';
    if (obj.data.container.parentId && obj.data.container.parentId.length == 5) {
        return `<div class="d_none ${getClasses(obj.data.container)}" style="${convertCamelStylesToString(obj.data.container)}" data-parentId="${obj.data.container.parentId}">
        <img src="${obj.data.file.url}" alt="image" class="${obj.data.imageBlock.class.join(' ')}" style="${convertCamelStylesToString(obj.data.imageBlock)}" />
        <p class="${obj.data.captionBlock.class.join(' ')} " style="${convertCamelStylesToString(obj.data.captionBlock)}">${caption}</p>
      </div>`

    }
    return `<div class="${getClasses(obj.data.container)}" style="${convertCamelStylesToString(obj.data.container)}" data-parentId="${obj.data.container.parentId}">
            <img src="${obj.data.file.url}" alt="image" class="${obj.data.imageBlock.class.join(' ')}" style="${convertCamelStylesToString(obj.data.imageBlock)}" />
            <p class="${obj.data.captionBlock.class.join(' ')} " style="${convertCamelStylesToString(obj.data.captionBlock)}">${caption}</p>
          </div>`
};

function makeParagraph(obj) {
    // console.log("OBJ DATA UNDEFINED", obj.data );
    if (obj.data.parentId && obj.data.parentId.length == 5) {
        return `<p class="${getClasses(obj.data)} my-3 d_none" style="${convertCamelStylesToString(obj.data)}" data-parentId="${obj.data.parentId}">${obj.data.text}</p>`
    }
    if (obj.data.class.includes('font-mono')) {
        return `<p class="${getClasses(obj.data)} my-3 rounded dark:bg-gray-100 bg-gray-200 text-[#7b4c4c] shadow" data-parentId="${obj.data.parentId}">${obj.data.text}</p>`
    } else {
        return `<p class="${getClasses(obj.data)} my-3" style="${convertCamelStylesToString(obj.data)}" data-parentId="${obj.data.parentId}">${obj.data.text}</p>`
    }
};

function makeList(obj) {
    // console.log("LISTMake", obj.data.parentId, obj.data.parentId.length)
    let icon_decoration = obj.data.side_icon === 'Camera_intro' ? 'mr-[8px] w-6 h-6' : 'mr-6';

    let list = obj.data.items.map(item => `<li style="padding-bottom: ${obj.data.lineSpace}px;">${item}</li>`);
    // если есть ParentId добавляем d-none
    if(obj.data.parentId && obj.data.parentId.length == 5) {
        if (obj.data.side_icon !== null) {
            return `
        <div class="${getClasses(obj.data)} my-5 d_none"  data-parentId="${obj.data.parentId}" style="${convertCamelStylesToString(obj.data, 'styles')}">
          <div class="${icon_decoration}" style="margin-top: 2px">
            ${obj.data.title_icon}
          </div>
          <div>
            <p class="my-2">${obj.data.title}</p>
            <ul class="${obj.data.wrapper_class.join(' ')}" style="${convertCamelStylesToString(obj.data, 'style')} list-style-position: ${obj.data.position}">${list.join('')} </ul>
          </div>
        </div>`

        } else {
            let classes = getClasses(obj.data).replaceAll('flex', '');
            return `
      <div class="${classes} my-5 d_none" data-parentId="${obj.data.parentId}" style="${convertCamelStylesToString(obj.data, 'styles')}">
        <ul class="${obj.data.wrapper_class.join(' ')}" style="${convertCamelStylesToString(obj.data, 'style')} list-style-position: ${obj.data.position}">${list.join('')} </ul>
      </div>`
        }
    } else {
        if (obj.data.side_icon !== null) {
            let icon = obj.data.side_icon === 'Camera_intro' ? obj.data.title_icon.replace('width="20" height="20"', 'viewBox="0 0 20 20" class="w-6 h-6"') : obj.data.title_icon;
            return `
    <div class="${getClasses(obj.data)} my-5" style="${convertCamelStylesToString(obj.data, 'styles')}">
      <div class="${icon_decoration}" style="margin-top: 2px">
        ${icon}
      </div>
      <div>
        <p class="my-2">${obj.data.title}</p>
        <ul class="${obj.data.wrapper_class.join(' ')}" style="${convertCamelStylesToString(obj.data, 'style')} list-style-position: ${obj.data.position}">${list.join('')} </ul>
      </div>
    </div>`
        } else {
            let classes = getClasses(obj.data).replaceAll('flex', '');
            return `
      <div class="${classes} my-5" style="${convertCamelStylesToString(obj.data, 'styles')}">
        <ul class="${obj.data.wrapper_class.join(' ')}" style="${convertCamelStylesToString(obj.data, 'style')} list-style-position: ${obj.data.position}">${list.join('')} </ul>
      </div>`
        }
    }
};


function makePersonality(obj) {
    // console.log('obj', obj);

    const name = obj.data.name.text ? obj.data.name.text : '';
    const company = obj.data.company.text ? obj.data.company.text : '';
    const description = obj.data.description.text ? obj.data.description.text : '';
    const uid = obj.data.uid.text ? obj.data.uid.text : '';
    const photo = obj.data.photo.url ? obj.data.photo.url : 'https://nord.test/img/avatar2.svg';
    const wrapperClass = obj.data.stretched ? obj.data.wrapper.class.join(' ') : schoolDefault.concat(obj.data.wrapper.class.filter((item) => schoolDefault.indexOf(item) < 0)).join(' ');
    return `
    <div class="${wrapperClass}" style="${convertCamelStylesToString(obj.data.wrapper)}">
      <div class="${obj.data.imageWrapper.class.join(' ')}" style="${convertCamelStylesToString(obj.data.imageWrapper)}">
        <img src="${photo}" alt="userImage" class="${obj.data.photo.class.join(' ')}" style="${convertCamelStylesToString(obj.data.photo)}"/>
      </div>
      <section class="${obj.data.text.class.join(' ')}">
        <div class="${obj.data.company.class.join(' ')}" style="${convertCamelStylesToString(obj.data.company)}">${company}</div>
        <div class="${obj.data.name.class.join(' ')}" style="${convertCamelStylesToString(obj.data.name)}">${name}</div>
        <div class="${obj.data.description.class.join(' ')}" style="${convertCamelStylesToString(obj.data.description)}">${description}</div>
        <div class="${obj.data.uid.class.join(' ')}" style="${convertCamelStylesToString(obj.data.uid)}">${uid}</div>
      </section>
    </div>
  `
};

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
};

function makeCode(obj) {
    const code = escapeHtml(obj.data.code);
    let id = makePassword(22);

    return `
<div class="w-full mx-auto my-4 relative">
<svg xmlns="http://www.w3.org/2000/svg" id="copy_${id}" onclick="copyContent('${id}')" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-2 right-2 cursor-pointer dark:text-[#e7d9bf] text-[#41314e] opacity-80 hover:opacity-100"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"/></svg>
<svg xmlns="http://www.w3.org/2000/svg" id="copy_done_${id}" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4 absolute top-2 right-2 cursor-pointer dark:text-[#e7d9bf] text-[#41314e] opacity-80 hover:opacity-100 hidden" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
<section class="dark:bg-[#333333] bg-[#f8f7fa] text-[12px] dark:text-[#e7d9bf] text-[#41314e] px-4 font-mono leading-6 whitespace-pre rounded resize-y border dark:border-[#808080] border-[#f1f1f4] shadow-none max-h-[250px] overflow-auto">
<pre class="w-32 mx-2" id="${id}">
${code}
</pre>
</section>
</div>`
};

function makeQuote(obj) {
    return `<div class="w-2/3 block my-4 bg-green-100 p-6 rounded">
              <blockquote>
                <p class="text-lg font-serif mb-4">
                  ${obj.data.text}
                </p>
              </blockquote>
              <p class="my-2 text-xs">- ${obj.data.caption}</p>
            </div>`
};

function makeDelimiter(obj) {

};

function makeWarning(obj) {
    return `<section class="bg-red-100 w-full text-center py-12 rounded">
              <div class="">
                <h3><span><i class="fas fa-exclamation"></i></span>${obj.data.title}</h3>
                <p>${obj.data.message}</p>
              </div>
            </section>`
};

function makeChecklist(obj) {
    const list = obj.data.items.map(item => {
        return `
        <div class="_1checkbox">
          <span class="_1checkbox_round"></span>
          ${item.text}
        </div>`;
    });
    return `
      <section class="">
        <div class="">
          <div class="">
            <div class="">
              ${list.join('')}
            </div>
          </div>
        </div>
      </section>`
};

function makeEmbed(obj) {
    const caption = obj.data.caption ? `
      <div class="">
        <p class=""> ${obj.data.caption}</p>
      </div>` : '';
    return `
      <section class="">
        <div class="">
          <div style="position: relative; overflow: hidden; width: 100%; padding-top: 56.25%;">
            <iframe style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%;" src="${obj.data.embed}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          ${caption}
        </div>
      </section>`
};
// function makeEmbed(obj) {
//     const caption = obj.data.caption ? `
//       <div class="">
//         <p class=""> ${obj.data.caption}</p>
//       </div>` : '';
//     return `
//       <section class="">
//         <div class="">
//           <div class="">
//             <iframe width="730" height="415" src="${obj.data.embed}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//           </div>
//           ${caption}
//         </div>
//       </section>`
//   };

function makeQuiz(obj) {
    // console.log(obj);
    // let quiz = make('div', ['bg-red-100', 'p-4'], {id: 'quiz'});
    //     quiz.innerHTML = obj.data.intro;
    // // return quiz;
    // return `
    //   <span>${obj.data.intro}</span>
    //   <img src="/img/uploads/${obj.data.img}" />
    //   <span>${obj.data.comments[0].text}</span>
    //   <span>${obj.data.options[0].text}</span>
    // `
    // console.log('lessonPoll', newComponent);

    // return lessonPool.render ;

    // this.simple_Question.input = obj;
    // this.simple_Question.show = true;
    // return `
    // <div class="w-4/5 mx-auto p-3 my-4" >

    //   <img src="/img/uploads/+${obj.data.img}" class="max-h-40 mx-auto mb-10">

    //   <h1 class="mt-4 mb-8 mx-2 text-center text-gray-100" >${obj.data.intro}</h1>
// return obj.data.intro;

    // </div>

    // `;
};

function makeSurvey(obj) {
    console.log(obj);
    // this.simple_Question.input = obj;
    // this.simple_Question.show = true;
    return '';
};

function makeVideo(obj) {
    if (obj.data.url.includes('kinescope')) {
        if (obj.data.parentId && obj.data.parentId.length == 5) {
            return `
            <style>
              .kin-player-embed-container {
                position: relative;
                padding-bottom: 56.25%;
                height: 0;
                max-width: 100%;
                overflow: hidden;
              }
              .kin-player-embed-container iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
              .kinescope_margin {
                margin-top: 50px;
                margin-bottom: 50px;
              }
            </style>
            <div class="d_none kinescope_margin" data-parentId="${obj.data.parentId}">

            <div class="kin-player-embed-container">
              <iframe
                src="${obj.data.url}"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media;"
              ></iframe>
            </div>
            </div>
            `;

        } else {
            return `
<style>
  .kin-player-embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    max-width: 100%;
    overflow: hidden;
  }
  .kin-player-embed-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .kinescope_margin {
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>
<div class="kinescope_margin">
<div class="kin-player-embed-container">
  <iframe
    src="${obj.data.url}"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture; encrypted-media;"
  ></iframe>
</div>
</div>
`;
        }

    }
    if (obj.data.url) {
        if (obj.data.parentId && obj.data.parentId.length == 5) {
            return `<div class="d_none my-6 shadow rounded overflow-hidden"  data-parentId="${obj.data.parentId}">
                <video src="${obj.data.url}" controls controlsList="nodownload" oncontextmenu="return false" poster="${obj.data.cover_url}" style="object-fit:  cover;" onclick="this.removeAttribute('style')" onplay="this.removeAttribute('style')"/>
              </div>`
        } else {
            return `<div class="my-6 shadow rounded overflow-hidden">
            <video src="${obj.data.url}" controls controlsList="nodownload" oncontextmenu="return false" poster="${obj.data.cover_url}" style="object-fit:  cover;" onclick="this.removeAttribute('style')" onplay="this.removeAttribute('style')"/>
          </div>`
        }
    }
    return '';
};

function makeFile(obj) {
    // console.log('file render', obj);
    if (obj.data.url) {
        return `<a href="${obj.data.url}" target="_blank"> <div class="fileEditor m_bottom xl:w-2/3">
                <div class="wrap_icon">
                    <svg version="1.0" height="70px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452.000000 452.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,452.000000) scale(0.100000,-0.100000)"> <path d="M1041 4120 c-148 -53 -258 -186 -282 -340 -6 -42 -9 -603 -7 -1565 l3 -1500 26 -63 c48 -113 135 -203 239 -245 l55 -22 1170 -3 c1164 -2 1169 -2 1232 19 116 38 216 135 265 257 l23 57 3 1028 c2 727 -1 1040 -8 1070 -10 37 -83 113 -638 670 -345 346 -639 635 -654 643 -23 12 -135 14 -700 14 -642 -1 -675 -2 -727 -20z m1219 -683 c0 -468 3 -495 63 -596 42 -69 106 -126 187 -165 l65 -31 453 -3 452 -3 0 -942 c0 -927 0 -943 -20 -975 -40 -65 23 -62 -1200 -62 -1223 0 -1160 -3 -1200 62 -20 33 -20 46 -20 1538 0 1491 0 1505 20 1538 38 62 29 61 643 62 l557 0 0 -423z m704 -515 c-349 -3 -351 -2 -398 61 -20 27 -21 41 -24 355 l-3 327 371 -370 370 -370 -316 -3z"/> <path d="M2192 2430 c-18 -11 -41 -34 -52 -52 -19 -31 -20 -51 -20 -353 l0 -320 -78 78 c-86 86 -132 109 -189 97 -48 -11 -78 -33 -97 -73 -20 -43 -20 -78 -2 -120 16 -37 407 -427 451 -451 28 -14 7 -15 -285 -16 -294 0 -317 -1 -347 -20 -45 -27 -65 -62 -65 -114 0 -59 26 -102 77 -126 40 -19 64 -20 673 -20 556 0 636 2 672 16 51 21 82 69 82 130 0 52 -20 87 -65 114 -30 19 -53 20 -347 20 -292 1 -313 2 -285 16 44 24 435 414 451 451 49 113 -55 227 -171 187 -24 -8 -68 -42 -117 -91 l-78 -78 0 320 c0 302 -1 322 -20 353 -42 68 -124 91 -188 52z"/> </g> </svg>
                </div>
                <div class="wrap_input">
                    ${obj.data.des}
                </div>
          </div></a>`
    }
    return '';
};

function makeModal(obj) {
// console.log('MakeModal fsd', obj.data.modal_title);
    let script = document.createElement('script');

    script.text = `
function openModal(url, width, height) {
  this.window.Event.emit('open_content_modal', {url, width, height});
}
`
    document.body.appendChild(script);
    return `<div class="${obj.data.class_wrapper.join(' ')} mb-4">
          <button class="${obj.data.class_btn.join(' ')}" style="${convertCamelStylesToString(obj.data)}"
                  data-url="${obj.data.url}"
                  data-width="${obj.data.width}"
                  data-height="${obj.data.height}"
                  onclick="openModal(this.dataset.url, this.dataset.width, this.dataset.height)">
            ${obj.data.modal_title}
          </button>
        </div>`;

};

// function openModal(modal) {
//   console.log('modal', modal);
//   console.log('App', App);
//   localStorage.modal = true;
//   return `<teleport to="body">
//       <!-- Full Screen Dropdown Overlay -->
//       <div v-show="open" class="fixed inset-0 z-40 backdrop-blur-sm" @click="localStorage.modal = false">
//       </div>

//       <transition
//           enter-active-class="transition ease-out duration-200"
//           enter-from-class="transform opacity-0 scale-95"
//           enter-to-class="transform opacity-100 scale-100"
//           leave-active-class="transition ease-in duration-75"
//           leave-from-class="transform opacity-100 scale-100"
//           leave-to-class="transform opacity-0 scale-95">
//           <div v-show="open"
//                   class="fixed scroll top-[50%] left-[50%] max-h-[85vh] w-11/12 overflow-y-auto translate-x-[-50%] translate-y-[-50%] z-50 mt-2 rounded-md"
//                   style="display: none;">
//               <div class="rounded-md ring-1 ring-black ring-opacity-5" :class="contentClasses">
//                   <Rtewefwbverk></Rtewefwbverk></slot>
//               </div>
//           </div>
//       </transition>
//   </teleport>`
// }

function open_content(el, parentId) {
    // console.log(el, parentId, "ELEMENT ");
    let tmp = document.querySelectorAll('[data-parentid="' + parentId + '"');
    tmp.forEach(el => {
        console.log('el from nowhere', el);

        el.classList.remove("d_none");
    })
    el.classList.add('d_none');
}

function makeBtnNew(obj) {
    // console.log('MakeBTNNew', obj);
    let js = document.createElement("script");
    js.text = `
function open_content(el, parentId) {
    let tmp = document.querySelectorAll('[data-parentid="' + parentId + '"');
    console.log('function start',el, parentId, "ELEMENT ", tmp);
    tmp.forEach(el => {
        el.classList.remove("d_none");
    })
    el.classList.add('d_none');
}
`;
    document.body.appendChild(js);
    if (obj.data.parentId) {
        return `<div class="${obj.data.class_wrapper.join(' ')}">
                        <div class="${obj.data.class_next_btn.join(' ')} d_none" style="cursor: pointer; ${convertCamelStylesToString(obj.data)}" data-elId="${obj.data.elId}" data-parentId="${obj.data.parentId}" onclick="open_content(this, this.dataset.elid)">
                            ${obj.data.des}
                        </div>
            </div>`
    }
    return `<div class="${obj.data.class_wrapper.join(' ')}">
                        <div class="${obj.data.class_next_btn.join(' ')}" style="cursor: pointer; ${convertCamelStylesToString(obj.data)}" data-elId="${obj.data.elId}" onclick="open_content(this, this.dataset.elid)">
                            ${obj.data.des}
                        </div>
            </div>`;
};

function makeBtn(obj) {
    let arr_url = ['/', 'http://127.0.0.1:8000/', 'http://127.0.0.1:8000', 'http://localhost:8000/', 'http://localhost:8000', ''];

    let js = document.createElement("script");
    js.text = `
function open_content(el, parentId) {
    let tmp = document.querySelectorAll('[data-parentid="' + parentId + '"');
    console.log('function start old',el, parentId, "ELEMENT ", tmp);
    tmp.forEach(el => {
      console.log('el', el.classList);
        if (Array.from(el.classList).includes('font-mono')) {
          el.classList.add('rounded','dark:bg-gray-100','bg-gray-200','text-[#7b4c4c]', 'shadow');
          el.style = '';
        }
        el.classList.remove("d_none");
    })
    el.classList.add('d_none');
}
`;
    if (!arr_url.includes(obj.data.url)) {
        return `<div class="btnEditor m_bottom xl:w-2/3 w-full mx-auto" ">
                    <a href="${obj.data.url}">
                        <div class="next_btn" style="${obj.data.style}">
                            ${obj.data.des}
                        </div>
                     </a>
            </div>`;

    }
    document.body.appendChild(js);
    // console.log(obj.data, obj.data.parentId == undefined, "OBJ DATA");
    if (obj.data.parentId) {
        return `<div class="btnEditor m_bottom xl:w-2/3 w-full mx-auto" ">
                        <div class="next_btn d_none" style="${obj.data.style}" data-elId="${obj.data.elId}" data-parentId="${obj.data.parentId}" onclick="open_content(this, this.dataset.elid)">
                            ${obj.data.des}
                        </div>
            </div>`
    }
    return `<div class="btnEditor m_bottom xl:w-2/3 w-full mx-auto" ">
                        <div class="next_btn" style="${obj.data.style}" data-elId="${obj.data.elId}" onclick="open_content(this, this.dataset.elid)">
                            ${obj.data.des}
                        </div>
            </div>`;

};

function makeHomework(obj) {
    console.log('HOMEWORK RENDER ', obj);

    return '';
};

function makeHTML(obj) {
    if (obj.data.js) {
        let js = document.createElement("script");
        js.text = obj.data.js;
        document.body.appendChild(js);
    }
    if (obj.data.html) {
        if (obj.data.parentId && obj.data.parentId.length == 5) {
            return `<div class="d_none"  data-parentId="${obj.data.parentId}"`
                + obj.data.html + `</div>`;
        } else {
            return obj.data.html;
        }

    }
    return '';
};

function uniq_num(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function makeInput(obj) {
    let uniq = uniq_num(5);
    let js = document.createElement("script");
    js.text = `
function result_inform (el, result) {
    el.innerHTML = result;
}
function check_answ_${uniq}(el, input) {
    if (!input.trim()) {
        return ;
    }
    let rightAnsw = "${obj.data.rightAnsw}";
    let tmp = el.querySelector('.reply_answer');
    let result = 'Не верно, попробуй еще раз!';
    tmp.innerHTML = "Сейчас проверим ...";
    if(rightAnsw == input.trim()) {
        result = "Отлично!) все правильно!";
    }
    setTimeout(result_inform, 1000, tmp, result)
}
`;
    document.body.appendChild(js);

    if (obj.data.parentId) {
        return `
    <div class="auto_check d_none" data-parentId="${obj.data.parentId}">
        <div>
            <div class="auto_check_wrap_input">
                <input type="text" class="mt-1">
                <div class="inp_btn" onclick="check_answ_${uniq}(this.parentNode.parentNode, this.parentNode.querySelector('input').value)">Отправить</div>
            </div>
            <div class="wrap_reply_answ">
                <div class="reply_answer"></div>
            </div>
        </div>
    </div>`;
    }

    return `
    <div class="auto_check">
        <div>
            <div class="auto_check_wrap_input">
                <input type="text" class="mt-1">
                <div class="inp_btn" onclick="check_answ_${uniq}(this.parentNode.parentNode, this.parentNode.querySelector('input').value)">Отправить</div>
            </div>
            <div class="wrap_reply_answ">
                <div class="reply_answer"></div>
            </div>
        </div>
    </div>`;

};

function makeTable(obj) {
    let out = '<div class="wrap_table">';
    let row = 1;
    obj.data.content.forEach(el_row => {
        out += '<div class="table_row">';
        el_row.forEach(el_column => {
            out += '<div class="table_item">' + el_column + '</div>'
        })
        row = el_row.length;
        out += '</div>';
    })
    row = 100 / row;
    out += `
<style>
.wrap_table{overflow: hidden; border: solid 1px #e0e0e0;}
.table_row {width: 100%; min-height: 20px; display: flex;}
.table_item {width:` + row +`%;  border: solid 1px #e0e0e0; padding: 5px; word-wrap: break-word;}
</style>
`;
    return '<div class="wrap_table">' + out + '</div></div>';
}

function makeAction(obj) {
    let buttonBlock = document.createElement('div');
    let out = `
    <div class="${getClasses(obj.data.output)}" style="${styleString(obj.data.output.style)}">
      <span class="${classString(obj.data.title.class)}" style="${styleString(obj.data.title.style)}">${obj.data.title.text}</span>
      <span class="${classString(obj.data.subtitle.class)}" style="${styleString(obj.data.subtitle.style)}">${obj.data.subtitle.text}</span>
      <span class="${classString(obj.data.description.class)}" style="${styleString(obj.data.description.style)}">${obj.data.description.text}</span>
      <div>`;
    for (let btn in obj.data.buttonBlock) {
// console.log(obj.data.buttonBlock[btn]);
        let textColor = obj.data.buttonBlock[btn].style.color ? obj.data.buttonBlock[btn].style.color : '';
        let fonColor = obj.data.buttonBlock[btn].style.backgroundColor ? obj.data.buttonBlock[btn].style.backgroundColor : '';

        out += `<span class="${classString(obj.data.buttonBlock[btn].class)}" style="${styleString(obj.data.buttonBlock[btn].style)}" onMouseOver="this.style.color = '${fonColor}', this.style.backgroundColor = '${textColor}'" onMouseOut="this.style.color = '${textColor}', this.style.backgroundColor = '${fonColor}'">${obj.data.buttonBlock[btn].text}</span> `
    }
    out += `</div></div>`

    // out.appendChild(buttonBlock);
    return out;
};

function classString(arr) {
    // let str = '';
    // for (var i = arr.length - 1; i >= 0; i--) {
    //   str+= arr[i]+' ';
    // }
    return arr.join(' '); // make it inline
}

function styleString(ob) {
    let str = '';
    for (let key in ob) {
        let value = ob[key];
        if (key.split('C').length > 1) {
            let segments = key.split('C')
            str += `${segments[0]}-c${segments[1]}: ${value}; `;
        } else {
            str += `${key}: ${value}; `;
        }
    }


    // console.log(str);

    return str;

}


export function htmlOutput(data) {
    if (data.length == 0) {
        return; // empty schema, no object with blocks inside so return
    }
    let html_code = '';
    // console.log("hrmlOutput 690", data);
    data.blocks.map(obj => {
        switch (obj.type) {
            case 'paragraph':
                html_code += makeParagraph(obj);
                break;
            case 'action':
                html_code += makeAction(obj);
                break;
            case 'image':
                // console.log(obj.data.file.url);
                html_code += makeImage(obj);
                break;
            case 'header':
                html_code += makeHeader(obj);
                break;
            case 'list':
                html_code += makeList(obj);
                break;
            case 'personality':
                html_code += makePersonality(obj);
                break;
            case 'code':
                html_code += makeCode(obj);
                break;
            case 'embed':
                html_code += makeEmbed(obj);
                break;
            case 'quote':
                html_code += makeQuote(obj);
                break;
            case 'delimiter':
                html_code += makeDelimiter(obj);
                break;
            case 'warning':
                html_code += makeWarning(obj);
                break;
            case 'checklist':
                html_code += makeChecklist(obj);
                break;
            case 'quiz':
                // return obj.data;
                // console.log('rververvw');

                // this.simple_Question.input = obj;
                // this.simple_Question.show = true;
                html_code += makeQuiz(obj);
                // html_code += makeQuiz(obj);
                break;
            case 'survey':
                html_code += makeSurvey(obj);
                break;
            case 'video':
                html_code += makeVideo(obj);
                break;
            case 'file':
                html_code += makeFile(obj);
                break;
            case 'button':
                html_code += makeBtn(obj);
                break;
            case 'buttonNew':
                html_code += makeBtnNew(obj);
                break;
            case 'html':
                html_code += makeHTML(obj);
                break;
            case 'homework':
                html_code += makeHomework(obj);
                break;
            case 'input':
                html_code += makeInput(obj);
                break;
            case 'modal':
                html_code += makeModal(obj);
                break;
            case 'table':
                html_code += makeTable(obj);
                break;
        }
    });
    return html_code;
};
