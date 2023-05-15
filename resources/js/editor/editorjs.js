import EditorJS from '@editorjs/editorjs';
import {uuidv4, xhr_request} from "./helpers";
import {editorConfig} from './editorConfig';

const saveButton = document.getElementById('saveButton');
const previewBtn = document.getElementById('previewBtn');

if(pageId == '') {
    pageId = uuidv4();
}
if(editorData !== '') {
    editorConfig.data.blocks = JSON.parse(editorData);
}
const editor = new EditorJS(editorConfig);


saveButton.addEventListener('click', function () {
    editor.save()
        .then((savedData) => {
            let data = JSON.stringify([savedData, pageId]);
            xhr_request('/preview', data, 'POST');
        })
        .catch((error) => {
            console.error('Saving error', error);
        });
});

previewBtn.addEventListener('click', function () {
    if(pageId) {
        window.open('/preview?page_id=' + pageId);
    }

    console.log(previewBtn, pageId);
})

// console.log("lastPage 42", pageId, editorData);

