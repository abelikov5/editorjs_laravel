import EditorJS         from '@editorjs/editorjs';
import {uuidv4}         from "./helpers";
import {editorConfig}   from './editorConfig';

const saveButton = document.getElementById('saveButton');

if(window.location.pathname === '/editor') {

    if(!window.location.search.includes('pageId=')) {
        pageId = uuidv4();
    }

    const editor = new EditorJS(editorConfig);

    if(editorData !== '') {
        editorConfig.data.blocks = JSON.parse(editorData);
    }

    saveButton.addEventListener('click', function () {
        let csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        editor.save()
            .then((savedData) => {
                axios
                    .post('safe?pageId=' + pageId + '&data=' + JSON.stringify(savedData.blocks) + '&csrf=' + csrf)
                    .then(res => {
                        console.log("safe_data", res);
                    });
            })
            .catch((error) => {
                console.error('Saving ERROR', error);
            });
    });
}









