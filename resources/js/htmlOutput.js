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
        }
    });
    return html_code;
};
